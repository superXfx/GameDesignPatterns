
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";

import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import {eDragState, eAnswerState, eOptionState} from "../Const_State_Drag";

export class InitialState_drag_Option extends StateBase{

    public Enter(param?: any)
    {
        super.Enter(param);
        
        this.mObjCtrl.toInit()
    }
}

export class MoveState_drag_Option extends StateBase{

    public Enter(param?: any)
    {
        super.Enter(param);
        
        this.mObjCtrl.moveOption(param);
    }
}

export class BackState_drag_Option extends StateBase{

    public Enter(param?: any)
    {
        super.Enter(param);

        this.mObjCtrl.backToOri();
    }
}

export class LockState_drag_Option extends StateBase{

    public Enter(param?: any)
    {
        super.Enter(param);
    }
}
