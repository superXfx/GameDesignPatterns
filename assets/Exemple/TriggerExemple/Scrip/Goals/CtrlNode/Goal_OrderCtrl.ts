
import Goal_Composite from "./../Goal_Composite";
import { eAIState, eNodeType } from "../Const_BehaviorTree";

import GoalFactory from "../GoalFactory";

export default class Goal_OrderCtrl extends Goal_Composite {

    public constructor(param)
    {
        super(param, eNodeType.eOrder);
    }

    public Enter()
    {
        this.mState = eAIState.eActive
        
        this.passCfg(this.mParam.aiCfg);
    }

    public passCfg(aiCfg)
    {
        this.RemoveAllSubgoals();

        for(let i = 0; i < aiCfg.length; i++)
        {
            let cfg = aiCfg[i];
            let tmpParam = this.mParam;
            for(let key in cfg.param)
            {
                tmpParam[key] = cfg.param[key];
            }

            let goal = GoalFactory.getInstance().createGoal(cfg.nodeType, tmpParam);
            this.AddSubgoal(goal);
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
