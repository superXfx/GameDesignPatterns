
import {eNodeType} from "./Const_BehaviorTree";

import Goal from "./Goal";
import Goal_OrderCtrl from "./CtrlNode/Goal_OrderCtrl";
// import Goal_LoopCtrl from "./CtrlNode/Goal_LoopCtrl";
import Goal_ParallelCtrl from "./CtrlNode/Goal_ParallelCtrl";
import Goal_SelectCtrl from "./CtrlNode/Goal_SelectCtrl";
import Goal_CheckTriggerState from "./ActionNode/Goal_CheckTriggerState";
import Goal_FindEmptySlot from "./ActionNode/Goal_FindEmptySlot";
import Goal_PutTrigger from "./ActionNode/Goal_PutTrigger";

export default class GoalFactory{

    static mInstance: GoalFactory = null;
    static getInstance()
    {
        if(this.mInstance === null)
        {
            this.mInstance = new GoalFactory();
        }

        return this.mInstance;
    }

    public createGoal(stateType: eNodeType, param?: {}): Goal
    {
        let instance: Goal = null;

        switch(stateType)
        {
            case eNodeType.eOrder:
                instance = new Goal_OrderCtrl(param);
            break;
            // case eNodeType.eLoop:
            //     instance = new Goal_OrderCtrl(param);
            // break;
            case eNodeType.eParallel:
                instance = new Goal_ParallelCtrl(param);
            break;
            case eNodeType.eSelect:
                instance = new Goal_SelectCtrl(param);
            break;
            case eNodeType.eGoal_checkTriggerState:
                instance = new Goal_CheckTriggerState(param);
            break;
            case eNodeType.eGoal_findEmptySolt:
                instance = new Goal_FindEmptySlot(param);
            break;
            case eNodeType.eGoal_putTrigger:
                instance = new Goal_PutTrigger(param);
            break;
        }

        return instance
    }
}
