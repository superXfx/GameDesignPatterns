
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import {eGameState, } from "../Const_State_Global";
import {
 	eInitialState_eGameState_Global,
	eLoading_eGameState_Global,
	ePlaying_eGameState_Global,
	eEnding_eGameState_Global,
	eEnd_eGameState_Global,
} 
from "../GameState/eGameState_Global";

export default class StateFactory_eGameState_Global{
	
	public createState(stateType: eGameState, objCtrl): StateBase
	{
		let stateInstance = null;
        switch(stateType)
        {
			case eGameState.eInit:
                stateInstance = new eInitialState_eGameState_Global(stateType, objCtrl);
            break;
			case eGameState.eLoading:
                stateInstance = new eLoading_eGameState_Global(stateType, objCtrl);
            break;
			case eGameState.ePlaying:
                stateInstance = new ePlaying_eGameState_Global(stateType, objCtrl);
            break;
			case eGameState.eEnding:
                stateInstance = new eEnding_eGameState_Global(stateType, objCtrl);
            break;
			case eGameState.eEnd:
                stateInstance = new eEnd_eGameState_Global(stateType, objCtrl);
            break;
		}
		
        return stateInstance;
	}
}
