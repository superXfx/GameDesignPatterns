
import CtrlBase from "../../../../../Script/DesignPatterns/FSM/CtrlBase";
import StateMachine from "../../../../../Script/DesignPatterns/FSM/StateMachine";
import StateFactory from "../StateFactory/StateFactory_Drag_Drag";

import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import {eDragState, eAnswerState, eOptionState} from "../Const_State_Drag";

import OptionCtrl from "./OptionCtrl_Drag";
import AnswerCtrl from "./AnswerCtrl_Drag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DragCtrl_Drag extends CtrlBase{

    @property({type: Number})
    mOptionCount: number = 0;

    @property({type: Number})
    mAnswerCount: number = 0;

    private mOptionCtrlArray: Array<OptionCtrl> = null;
    private mAnswerCtrlArray: Array<AnswerCtrl> = null;
    private mMovingCtrl: OptionCtrl = null;

    start()
    {
        this.changeState(eDragState.eInit);
    }

    protected init()
    {
        if(!this.mIsInit)
        {
            this.mAnswerCtrlArray = new Array<AnswerCtrl>();
            let AnswerParent = this.node.getChildByName("GameNode").getChildByName("TriggerDragNode").getChildByName("AnswerParent");
            let answerChildren = AnswerParent.children
            for(let i = 0; i < AnswerParent.childrenCount; i++)
            {
                if( answerChildren[i].getComponent(AnswerCtrl) )
                {
                    this.mAnswerCtrlArray.push( answerChildren[i].getComponent(AnswerCtrl) );
                }
            }
            
            this.mOptionCtrlArray = new Array<OptionCtrl>();
            let optionParent = this.node.getChildByName("GameNode").getChildByName("TriggerDragNode").getChildByName("OptionParent");
            let optionChildren = optionParent.children
            for(let i = 0; i < optionParent.childrenCount; i++)
            {
                if( optionChildren[i].getComponent(OptionCtrl) )
                {
                    this.mOptionCtrlArray.push( optionChildren[i].getComponent(OptionCtrl) );
                }
            }

            this.setFSM( new StateMachine( this, new StateFactory()) );
            this.mIsInit = true;
        }
    }

    public registerMsg()
    {
        super.registerMsg();

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this, false);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this, false);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this, false);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this, false);
        CocosMessageMgr.getInstance().registerMsg(Const_Msg.MSG_CHANGE_GAME_STATE, this.onCocosMessage, this);
    }

    public unResgiterMsg()
    {
        super.unResgiterMsg();

        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this, false);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this, false);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this, false);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this, false);
        CocosMessageMgr.getInstance().unRegisterMsg(Const_Msg.MSG_CHANGE_GAME_STATE, this.onCocosMessage, this);
    }

    public update(dt)
    {
        super.update(dt);
    }

    public clearState()
    {
        this.changeState(eDragState.eInit);
    }

    //----------------------------------------------------------------------------
    private touchStart(event: cc.Event.EventTouch)
    {
        if(this.mMovingCtrl) return;
        
        if(this.getNowStateType() != eDragState.ePlaying) return;

        let localPos = event.getLocation();
        let worldPos = this.node.convertToWorldSpace(localPos);
        
        for(let i = 0; i < this.mOptionCtrlArray.length; i++)
        {
            let ctrl = this.mOptionCtrlArray[i];
            if(ctrl.node.getBoundingBoxToWorld().contains(worldPos)
                && ctrl.getNowStateType() === eOptionState.eInit )
            {
                this.mMovingCtrl = ctrl;
                let pos = this.node.convertToNodeSpaceAR(worldPos);
                this.mMovingCtrl.setNodeTouchLocalPos(ctrl.node.convertToNodeSpaceAR(worldPos));
                this.mMovingCtrl.changeState(eOptionState.eMove, {pos: pos});
                return;
            }
        }
    }

    private touchMove(event: cc.Event.EventTouch)
    {
        if(this.getNowStateType() != eDragState.ePlaying) return;
        if(!this.mMovingCtrl) return;

        let localPos = event.getLocation();
        let worldPos = this.node.convertToWorldSpace(localPos);
        
        let pos = this.node.convertToNodeSpaceAR(worldPos);
        this.mMovingCtrl.changeState(eOptionState.eMove, {pos: pos})
    }
    
    private touchEnd(event: cc.Event.EventTouch)
    {
        if(this.getNowStateType() != eDragState.ePlaying) return;
        if(!this.mMovingCtrl) return;

        let localPos = event.getLocation();
        let worldPos = this.node.convertToWorldSpace(localPos);

        for(let i = 0; i < this.mAnswerCtrlArray.length; i++)
        {
            let ctrl = this.mAnswerCtrlArray[i];
            if( ctrl.node.getBoundingBoxToWorld().contains(worldPos) )
            {
                ctrl.changeState(eAnswerState.eShowAnswer, {type: this.mMovingCtrl.mTriggerType});

                this.mMovingCtrl.changeState(eOptionState.eInit);
                this.mMovingCtrl = null;
                return;
            }
        }

        this.mMovingCtrl.changeState(eOptionState.eBack);
        this.mMovingCtrl = null;
    }

    //----------------------------------------------------------------------------
    protected onCocosMessage(data): void
    {
        switch(data.msgId)
        {
            case Const_Msg.MSG_CHANGE_GAME_STATE:
                this.changeState(data.msgData.stateType);
            break;
        }
    }
}
