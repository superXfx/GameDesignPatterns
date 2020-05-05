
import Goal_Composite from "../Goal_Composite";
import { eAIState, eNodeType } from "../Const_BehaviorTree";

export default class Goal_FindEmptySlot extends Goal_Composite
{
    public constructor(param)
    {
        super(param, eNodeType.eGoal_findEmptySolt);
    }

    public Enter()
    {
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
    }

    public Process(dt)
    {
        this.ActivateIfInactive();

        return this.mState;
    }
}
