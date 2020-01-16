import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import eGameState, } from "../Const_State_Global";

export class eInitialState_eGameState_Global extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);
		this.mObjCtrl.changeState(eGameState.eLoading);

	}
}

export class eLoading_eGameState_Global extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);
		this.mObjCtrl.changeState(eGameState.ePlaying);

	}
}

export class ePlaying_eGameState_Global extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);

	}
}

export class eEnding_eGameState_Global extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);
		this.mObjCtrl.changeState(eGameState.eEnd);

	}
}

export class eEnd_eGameState_Global extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);

	}
}

