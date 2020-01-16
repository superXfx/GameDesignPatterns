
import Goal_Composite from "./Goal_Composite";
import { eAIState, eGoalType } from "../../../../Script/Const_All";
import {eTriggerType} from "../../../../Script/DesignPatterns/Trigger/Const_Trigger";

import Goal_CheckTriggerState from "./Goal_CheckTriggerState";
import Goal_FindEmptySlot from "./Goal_FindEmptySlot";
import Goal_PutTrigger from "./Goal_PutTrigger";
export default class Goal_SpeedDown extends Goal_Composite {

    private mTargetTriggerType: eTriggerType = eTriggerType.eSpeedDown;

    public constructor(owner)
    {
        super(owner, eGoalType.eGoal_speedDown);
    }

    public Enter()
    {
        this.mState = eAIState.eActive
        this.RemoveAllSubgoals();

        this.AddSubgoal(new Goal_CheckTriggerState({options: this.mParam.options
                                                    , triggerType: eTriggerType.eSpeedDown}));
        
        this.AddSubgoal(new Goal_FindEmptySlot({answers: this.mParam.answers}));

        this.AddSubgoal(new Goal_PutTrigger({options: this.mParam.options
                                            , answers: this.mParam.answers
                                            , triggerType: eTriggerType.eSpeedDown}));
    }

    public Process(dt)
    {
        this.ActivateIfInactive();
        this.mState = this.ProcessSubgoals(dt);

        return this.mState;
    }
}
