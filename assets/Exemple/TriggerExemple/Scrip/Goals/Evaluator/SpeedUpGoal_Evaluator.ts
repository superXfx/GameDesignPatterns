
import Goal_Evaluator from "./Goal_Evaluator";
import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";
import { eGoalType } from "../../../../../Script/Const_All";

export default class SpeedUpGoal_Evaluator extends Goal_Evaluator{

    public SetGoal()
    {
        CocosMessageMgr.getInstance().sendMsg(Const_Msg_Monitor.MSG_ADD_SUBGOAL, {goalType: eGoalType.eGoal_speedUp});
    }
}
