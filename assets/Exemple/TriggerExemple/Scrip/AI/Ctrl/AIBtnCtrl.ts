
import StateMachine from "../../../../../Script/DesignPatterns/FSM/StateMachine";
import CtrlBase from "../../../../../Script/DesignPatterns/FSM/CtrlBase";
import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";
import {eAIBtnState, } from "../../../../../Script/Const_All";
import StateFactory from "../StateFactory/StateFactory_eAIBtnState";

import Goal_Think from "../../Goals/Goal_Think";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AIBtnCtrl extends CtrlBase{

    private mBtn: cc.Node;
    private mLabelStart: cc.Node;
    private mLabelStop: cc.Node;

    private mBrain: Goal_Think;
    
    start()
    {
        this.changeState(eAIBtnState.eInit);
    }

    update(dt)
    {
        if(this.getNowStateType() !== eAIBtnState.eThink) return;
        
        this.mBrain.Process(dt);
    }

    protected init()
    {
        if(!this.mIsInit)
        {
            this.mBtn = this.node.getChildByName("BtnAI");
            this.mLabelStart = this.mBtn.getChildByName("LabelStart");
            this.mLabelStop = this.mBtn.getChildByName("LabelStop");

            this.mBrain = new Goal_Think({gameNode: this.node.parent});

            this.setFSM( new StateMachine(this, new StateFactory()) );
            this.mIsInit = true;
        }
    }

    public clearState()
    {
        this.changeState(eAIBtnState.eInit);
    }

    public registerMsg()
    {
        super.registerMsg();
        this.mBtn.on("click", this.onBtnClick, this)
    }

    public unResgiterMsg()
    {
        super.unResgiterMsg();
    }

    //-----------------------------------
    private onBtnClick()
    {
        if(this.getNowStateType() === eAIBtnState.eInit)
        {
            this.changeState(eAIBtnState.eThink);
        }
        else
        {
            this.changeState(eAIBtnState.eInit);
        }
        this.refreshBtnLable();
    }

    private refreshBtnLable()
    {
        if(this.getNowStateType() === eAIBtnState.eInit)
        {
            this.mLabelStart.active = true;
            this.mLabelStop.active = false;
        }
        else
        {
            this.mLabelStart.active = false;
            this.mLabelStop.active = true;
        }
    }

    //-----------------------------------
    public getBrain()
    {
        return this.mBrain;
    }
}
