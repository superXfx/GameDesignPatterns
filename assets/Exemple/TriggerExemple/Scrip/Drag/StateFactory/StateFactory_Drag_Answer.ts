
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";

import { InitialState_drag_Answer
        ,ShowAnswerState_drag_Answer}
    
from "../State/AnswerStates_Drag";

import {eAnswerState} from "../Const_State_Drag";

export default class StateFactory_Drag_Answer{

    public createState(stateType: eAnswerState, objCtrl): StateBase
    {
        let stateInstance = null;
        switch(stateType)
        {
            case eAnswerState.eInit:
                stateInstance = new InitialState_drag_Answer(stateType, objCtrl);
            break;
            case eAnswerState.eShowAnswer:
                stateInstance = new ShowAnswerState_drag_Answer(stateType, objCtrl);
            break;
        }
        
        return stateInstance;
    }
}
