
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";

import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import {eDragState, eAnswerState, eOptionState} from "../Const_State_Drag";

export class InitialState_drag_Answer extends StateBase{

    public Enter(param?: any)
    {
        super.Enter(param);
    }
}

export class ShowAnswerState_drag_Answer extends StateBase{

    public Enter(param?: any)
    {   
        super.Enter(param);
        this.mObjCtrl.fillTrigger(param.type);

        this.setCountDwon(function()
        {
            this.mObjCtrl.changeState(eAnswerState.eInit);
        }, 0.0001);
    }
}

