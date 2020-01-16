
import StateMachine from "../../../../../Script/DesignPatterns/FSM/StateMachine";
import CtrlBase from "../../../../../Script/DesignPatterns/FSM/CtrlBase";
import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";
import {eGameState, } from "../Const_State_Global";
import StateFactory from "../StateFactory/StateFactory_eGameState_Global";

import UIMgr from "../../../../../Script/UI/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl_Global extends CtrlBase{

    start()
    {
        this.changeState(eGameState.eInit);
    }

    protected init()
    {
        if(!this.mIsInit)
        {
            UIMgr.getInstance().setUINodesByParent( this.node.getChildByName("UINodeParent") );
            
            this.setFSM( new StateMachine(this, new StateFactory()) );
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
                this.changeState(data.msgData.stateType);
            break;
        }
    }
}
