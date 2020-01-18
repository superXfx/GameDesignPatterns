import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import eAnswerState, eDragState, eOptionState, } from "../Const_State_Drag";

export class eInit_eDragState_Drag extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);
		this.mObjCtrl.changeState(eGameState.eLoading);

	}
}

export class eLoading_eDragState_Drag extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);
		this.mObjCtrl.changeState(eGameState.ePlaying);

	}
}

export class ePlaying_eDragState_Drag extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);

	}
}

