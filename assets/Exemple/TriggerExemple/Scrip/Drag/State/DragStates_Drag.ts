
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";

import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import {eDragState} from "../Const_State_Drag";

export class InitialState_drag_Game extends StateBase{

    public Enter(param?: any)
    {
        super.Enter(param);
        
        this.mObjCtrl.changeState(eDragState.eLoading);
    }
}

export class LoadingState_drag_Game extends StateBase{
    
    public Enter(param?: any)
    {
        super.Enter(param);

        this.mObjCtrl.changeState(eDragState.ePlaying);
    }
}

export class PlayingState_drag_Game extends StateBase{
    
    public Enter(param)
    {
        super.Enter(param);
    }
}

