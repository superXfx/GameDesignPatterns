
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import eAnswerState, eDragState, eOptionState, } from "../Const_State_Drag";
import {
 import {
 	eInit_eAnswerState_Drag,
	eShowAnswer_eAnswerState_Drag,
} 
from "../GameState/eAnswerState_Drag";

export default class StateFactory_eAnswerState_Drag {
	
	private static mInstance: StateFactory_eAnswerState_Drag = null;
	
	static getInstance()
	{
		if(!this.mInstance)
		{
			this.mInstance = new StateFactory_eAnswerState_Drag();
		}

		return this.mInstance;
	}
	
	public createState(stateType: eAnswerState, objCtrl): StateBase
	{
		let stateInstance = null;
		switch(stateType)
		{
			case eAnswerState.eInit:
				stateInstance = new eInit_eAnswerState_Drag(stateType, objCtrl);
			break;
			case eAnswerState.eShowAnswer:
				stateInstance = new eShowAnswer_eAnswerState_Drag(stateType, objCtrl);
			break;
		}
		
		stateInstance.init();
		return stateInstance;
	}
}
