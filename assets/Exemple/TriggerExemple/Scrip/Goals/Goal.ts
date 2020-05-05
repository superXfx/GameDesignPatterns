
import { eAIState } from "./Const_BehaviorTree";

export default class Goal
{
    protected mGoalType;
    protected mParam;
    protected mState;

    public constructor(param, goalType)
    {
        this.mParam = param;
        this.mGoalType = goalType;
        this.mState = eAIState.eInactive;
    }

    protected ActivateIfInactive()
    {
        if(this.isInactive())
        {
            this.Enter();
        }
    }

    protected ReactivateInFailed()
    {
        if(this.isFailed())
        {
            this.mState = eAIState.eInactive;
        }
    }

    public Enter()
    {

    }

    public Exit()
    {

    }

    public Process(dt)
    {
        return eAIState.eActive;
    }

    protected AddSubgoal(goal)
    {
        cc.log("------------error, only goal_composite can add subgoal------------");
    }

    public isComplete()
    {
        return this.mState === eAIState.eCompleted;
    }

    public isActive()
    {
        return this.mState === eAIState.eActive;
    }

    public isInactive()
    {
        return this.mState === eAIState.eInactive;
    }

    public isFailed()
    {
        return this.mState === eAIState.eFailed;
    }

    public getType()
    {
        return this.mGoalType;
    }
}
