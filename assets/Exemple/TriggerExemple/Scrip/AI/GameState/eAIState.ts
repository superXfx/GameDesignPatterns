import StateBase from "../../../../../Script/DesignPatterns/FSM/StateBase";
import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";
import {eAIBtnState, } from "../../../../../Script/Const_All";

export class eInit_eAIBtnState extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);
		this.mObjCtrl.refreshBtnLable();
		this.mObjCtrl.getBrain().RemoveAllSubgoals();
	}
}

export class eThink_eAIBtnState extends StateBase{
	public Enter(param?: any)
	{
		super.Enter(param);
		this.mObjCtrl.refreshBtnLable();
		this.mObjCtrl.getBrain().RemoveAllSubgoals();
		this.mObjCtrl.getBrain().Arbitrate();
	}
}