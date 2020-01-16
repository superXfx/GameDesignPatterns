
import Goal from "./Goal";
import { eAIState } from "../../../../Script/Const_All";
export default class Goal_Composite extends Goal
{
    protected mSubGoals: Array<Goal>;
    
    public constructor(param, goalType)
    {
        super(param, goalType);
        this.mSubGoals = new Array<Goal>();
    }

    public AddSubgoal(goal)
    {
        this.mSubGoals.push(goal);
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

    public RemoveAllSubgoals()
    {
        for(let i = 0; i < this.mSubGoals.length;)
        {
            this.mSubGoals[i].Exit();
            this.mSubGoals.splice(i, 1);
        }
    }
}
