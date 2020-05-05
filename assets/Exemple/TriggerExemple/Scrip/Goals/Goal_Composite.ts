
import Goal from "./Goal";
import { eAIState } from "./Const_BehaviorTree";

export default class Goal_Composite extends Goal
{
    protected mSubGoals: Array<Goal_Composite>;

    public constructor(param, goalType)
    {
        super(param, goalType);
        this.mSubGoals = new Array<Goal_Composite>();
    }

    public AddSubgoal(goal)
    {
        this.mSubGoals.push(goal);
    }

    protected ProcessSubgoals(dt)
    {
        return eAIState.eFailed;
    }

    public RemoveAllSubgoals()
    {
        for(let i = 0; i < this.mSubGoals.length;)
        {
            this.mSubGoals[i].RemoveAllSubgoals();
            this.mSubGoals[i].Exit();
            this.mSubGoals.splice(i, 1);
        }
    }
}
