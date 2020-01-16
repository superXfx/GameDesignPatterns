
import Goal from "./Goal";
import { eAIState, eGoalType } from "../../../../Script/Const_All";

export default class Goal_FindEmptySlot extends Goal
{
    public constructor(owner)
    {
        super(owner, eGoalType.eGoal_findEmptySolt);
    }

    public Enter()
    {
        this.mState = eAIState.eActive;
    }

    public Process(dt)
    {
        this.ActivateIfInactive();

        let state = eAIState.eFailed;
        for(let i = 0; i < this.mParam.answers.length; i++)
        {
            let ctrl = this.mParam.answers[i];
            if(ctrl.isfilled() === false)
            {
                state = eAIState.eCompleted;
                break;
            }
        }

        this.mState = state;
        return this.mState;
    }
}
