
import StateMachine from "../../../../../Script/DesignPatterns/FSM/StateMachine";
import CtrlBase from "../../../../../Script/DesignPatterns/FSM/CtrlBase";
import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";
import eGameState, } from "../Const_State_Global";
import StateFactory from "../StateFactory/StateFactory_eGameState_Global";


const { ccclass, property } = cc._decorator;
		
@ccclass
export default class GameCtrl_Global extends CtrlBase{

	onLoad() {
	
		super.onLoad();
	}
	
	start()
	{
		if(this.mIsChangedState === false)
		{
			this.changeState(eGameState.eInit, null, true);
		}
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
		cc.systemEvent.on(Const_Msg_Monitor.MSG_CHANGE_GAME_STATE, this.onCocosMessage, this);
	}

	public unResgiterMsg()
	{
		super.unResgiterMsg();
		cc.systemEvent.off(Const_Msg_Monitor.MSG_CHANGE_GAME_STATE, this.onCocosMessage, this);
	}

	public reset(imm: boolean = false)
	{
		this.clearState();
	}

	public clearState()
	{
		this.changeState(eGameState.eInit);
	}
//-----------------------------

	protected onCocosMessage(data): void
	{
		switch(data.msgId)
		{
			case Const_Msg_Monitor.MSG_CHANGE_GAME_STATE:
				this.changeState(data.msgData.state);
			break;
		}
	}
}
