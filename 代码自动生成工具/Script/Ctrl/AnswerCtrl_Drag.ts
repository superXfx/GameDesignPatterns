
import StateMachine from "../../../../../Script/DesignPatterns/FSM/StateMachine";
import CtrlBase from "../../../../../Script/DesignPatterns/FSM/CtrlBase";
import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";
import eAnswerState, eDragState, eOptionState, } from "../Const_State_Drag";
import StateFactory from "../StateFactory/StateFactory_eAnswerState_Drag";


const { ccclass, property } = cc._decorator;
		
@ccclass
export default class AnswerCtrl_Drag extends CtrlBase{

	onLoad() {
		
		super.onLoad();
		this.clearState();
	}

	protected init()
	{
		if(!this.mIsInit)
		{
			this.mFSM = new StateMachine(this, StateFactory);
			this.mIsInit = true;
		}
	}

		public registerMsg()
		{
			super.registerMsg();
		}

		public unResgiterMsg()
		{
			super.unResgiterMsg();
		}

	public clearState()
	{
		this.changeState(eAnswerState.eInit);
	}
//-----------------------------
}
