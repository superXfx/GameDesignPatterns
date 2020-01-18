
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import eAnswerState, eDragState, eOptionState, } from "../Const_State_Drag";
import {
 import {
 	eInit_eOptionState_Drag,
	eMove_eOptionState_Drag,
	eBack_eOptionState_Drag,
	eLock_eOptionState_Drag,
} 
from "../GameState/eOptionState_Drag";

export default class StateFactory_eOptionState_Drag {
	
	private static mInstance: StateFactory_eOptionState_Drag = null;
	
	static getInstance()
	{
		if(!this.mInstance)
		{
			this.mInstance = new StateFactory_eOptionState_Drag();
		}

		return this.mInstance;
	}
	
	public createState(stateType: eOptionState, objCtrl): StateBase
	{
		let stateInstance = null;
		switch(stateType)
		{
			case eOptionState.eInit:
				stateInstance = new eInit_eOptionState_Drag(stateType, objCtrl);
			break;
			case eOptionState.eMove:
				stateInstance = new eMove_eOptionState_Drag(stateType, objCtrl);
			break;
			case eOptionState.eBack:
				stateInstance = new eBack_eOptionState_Drag(stateType, objCtrl);
			break;
			case eOptionState.eLock:
				stateInstance = new eLock_eOptionState_Drag(stateType, objCtrl);
			break;
		}
		
		stateInstance.init();
		return stateInstance;
	}
}
