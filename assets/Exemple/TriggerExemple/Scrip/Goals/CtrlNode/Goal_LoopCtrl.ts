
import Goal_Composite from "./../Goal_Composite";
import { eAIState, eNodeType } from "../Const_BehaviorTree";

import GoalFactory from "../GoalFactory";

export default class Goal_LoopCtrl extends Goal_Composite {

    private mNowGoalIndex = 0;

    public constructor(param)
    {
        super(param, eNodeType.eLoop);
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
        let stateOfSubgoals = this.mSubGoals[ this.mNowGoalIndex ].Process(dt);
        if(stateOfSubgoals === eAIState.eCompleted)
        {
            this.mSubGoals[ this.mNowGoalIndex ].Exit();
            if(this.mNowGoalIndex === this.mSubGoals.length - 1)
            {
                this.mNowGoalIndex = 0;
            }   
            else
            {
                this.mNowGoalIndex + 1;
            }            
        }
        else if(stateOfSubgoals === eAIState.eFailed)
        {
            return eAIState.eFailed;
        }

        return eAIState.eActive;
    }
}
