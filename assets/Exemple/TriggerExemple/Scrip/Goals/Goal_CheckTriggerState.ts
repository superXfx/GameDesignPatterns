
import Goal from "./Goal";
import { eAIState, eGoalType} from "../../../../Script/Const_All";
import {eOptionState} from "../Drag/Const_State_Drag"

export default class Goal_CheckTriggerState extends Goal
{
    public constructor(owner)
    {
        super(owner, eGoalType.eGoal_checkTriggerState);
    }

    public Enter()
    {
        this.mState = eAIState.eActive;
    }

    public Process(dt)
    {
        this.ActivateIfInactive();

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
        return this.mState;
    }
}
