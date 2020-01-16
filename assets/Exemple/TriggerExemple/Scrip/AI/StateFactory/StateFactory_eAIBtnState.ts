
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import {eAIBtnState, } from "../../../../../Script/Const_All";
import {
 	eInit_eAIBtnState,
	eThink_eAIBtnState,
} 
from "../GameState/eAIBtnState";

export default class StateFactory_eAIState{
	
	public createState(stateType: eAIBtnState, objCtrl): StateBase
	{
		let stateInstance = null;
        switch(stateType)
        {
			case eAIBtnState.eInit:
                stateInstance = new eInit_eAIBtnState(stateType, objCtrl);
            break;
			case eAIBtnState.eThink:
                stateInstance = new eThink_eAIBtnState(stateType, objCtrl);
            break;
		}
		
        return stateInstance;
	}
}
