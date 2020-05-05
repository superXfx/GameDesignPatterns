
import Goal_Composite from "./../Goal_Composite";
import { eAIState, eNodeType } from "../Const_BehaviorTree";

import Goal_Evaluator from "../Goal_Evaluator"
import GoalFactory from "../GoalFactory";

export default class Goal_SelectCtrl extends Goal_Composite {

    public constructor(param)
    {
        super(param, eNodeType.eSelect);
    }

    public Enter()
    {
        this.mState = eAIState.eActive
        
        this.passCfg(this.mParam.aiCfg);
    }

    public passCfg(aiCfg)
    {
        if(aiCfg.thinkType === "quanzhong")
        {
            let best = 0;
            let cfg = null;

            let ctrlNodes = aiCfg.ctrlNodes;
            for(let i = 0; i < ctrlNodes.length; i++)
            {
                let desirabilty = Goal_Evaluator.getInstance().getDesirability(ctrlNodes[i].condition);
                
                if( desirabilty >= best)
                {
                    best = desirabilty;
                    cfg = ctrlNodes[i];
                }
            }

            let tmpParam = this.mParam;
            tmpParam.aiCfg = cfg.childNodes;
            
            let goal_Ctrl = GoalFactory.getInstance().createGoal(cfg.nodeType, tmpParam);;
            
            this.RemoveAllSubgoals();
            this.AddSubgoal(goal_Ctrl);
        }
    }

    public Process(dt)
    {
        this.ActivateIfInactive();
        this.mState = this.ProcessSubgoals(dt);
        
        return this.mState;
    }

    protected ProcessSubgoals(dt)
    {
        for(let i = 0; i < this.mSubGoals.length;)
        {
            let goal = this.mSubGoals[i];
            if(goal.isComplete() || goal.isFailed())
            {
                this.mSubGoals[i].Exit();
                this.mSubGoals.splice(i, 1);
            }
            else
            {
                i++;
            }
        }

        if(this.mSubGoals.length > 0)
        {
            let stateOfSubgoals = this.mSubGoals[0].Process(dt);
            if(stateOfSubgoals === eAIState.eCompleted && this.mSubGoals.length > 1)
            {
                return eAIState.eActive;
            }

            return stateOfSubgoals;
        }
        else
        {
            return eAIState.eCompleted;
        }
    }
}
