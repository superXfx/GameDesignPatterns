
import Goal_Composite from "../Goal_Composite";
import { eAIState, eNodeType} from "../Const_BehaviorTree";
import {eOptionState} from "../../Drag/Const_State_Drag"

export default class Goal_CheckTriggerState extends Goal_Composite
{
    public constructor(param)
    {
        super(param, eNodeType.eGoal_checkTriggerState);
    }

    public Enter()
    {
        let state = eAIState.eFailed;
        for(let i = 0; i < this.mParam.options.length; i++)
        {
            let ctrl = this.mParam.options[i];
            if(ctrl.mTriggerType === this.mParam.triggerType
                && ctrl.getNowStateType() === eOptionState.eInit)
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
