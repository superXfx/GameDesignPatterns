
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";

import { InitialState_drag_Option
    , MoveState_drag_Option
    , BackState_drag_Option
    , LockState_drag_Option}
    
from "../State/OptionStates_Drag";

import {eOptionState} from "../Const_State_Drag";

export default class StateFactory_Drag_Option{

    public createState(stateType: eOptionState, objCtrl): StateBase
    {
        let stateInstance = null;
        switch(stateType)
        {
            case eOptionState.eInit:
                stateInstance = new InitialState_drag_Option(stateType, objCtrl);
            break;
            case eOptionState.eMove:
            stateInstance = new MoveState_drag_Option(stateType, objCtrl);
            break;
            case eOptionState.eBack:
                stateInstance = new BackState_drag_Option(stateType, objCtrl);
            break;
            case eOptionState.eLock:
                stateInstance = new LockState_drag_Option(stateType, objCtrl);
            break;
        }

        return stateInstance;
    }
}
