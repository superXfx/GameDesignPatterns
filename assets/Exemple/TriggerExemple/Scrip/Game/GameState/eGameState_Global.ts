import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import {eGameState, } from "../Const_State_Global";
import * as Const_All from "../../../../../Script/Const_All";

import UIMgr from "../../../../../Script/UI/UIMgr";

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
		UIMgr.getInstance().open(Const_All.pageNameToPath.StartScene);
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

