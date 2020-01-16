
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";

import { InitialState_drag_Game
    , LoadingState_drag_Game
    , PlayingState_drag_Game}
    
from "../State/DragStates_Drag";

import {eDragState} from "../Const_State_Drag";

export default class StateFactory_Drag_Drag{

    public createState(stateType: eDragState, objCtrl): StateBase
    {
        let stateInstance = null;
        switch(stateType)
        {
            case eDragState.eInit:
                stateInstance = new InitialState_drag_Game(stateType, objCtrl);
            break;
            case eDragState.eLoading:
                stateInstance = new LoadingState_drag_Game(stateType, objCtrl);
            break;
            case eDragState.ePlaying:
                stateInstance = new PlayingState_drag_Game(stateType, objCtrl);
            break;
        }

        return stateInstance;
    }
}
