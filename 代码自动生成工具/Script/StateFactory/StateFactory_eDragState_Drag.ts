
import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import eAnswerState, eDragState, eOptionState, } from "../Const_State_Drag";
import {
 import {
 	eInit_eDragState_Drag,
	eLoading_eDragState_Drag,
	ePlaying_eDragState_Drag,
} 
from "../GameState/eDragState_Drag";

export default class StateFactory_eDragState_Drag {
	
	private static mInstance: StateFactory_eDragState_Drag = null;
	
	static getInstance()
	{
		if(!this.mInstance)
		{
			this.mInstance = new StateFactory_eDragState_Drag();
		}

		return this.mInstance;
	}
	
	public createState(stateType: eDragState, objCtrl): StateBase
	{
		let stateInstance = null;
		switch(stateType)
		{
			case eDragState.eInit:
				stateInstance = new eInit_eDragState_Drag(stateType, objCtrl);
			break;
			case eDragState.eLoading:
				stateInstance = new eLoading_eDragState_Drag(stateType, objCtrl);
			break;
			case eDragState.ePlaying:
				stateInstance = new ePlaying_eDragState_Drag(stateType, objCtrl);
			break;
		}
		
		stateInstance.init();
		return stateInstance;
	}
}
