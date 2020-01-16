
import CtrlBase from "../../../../../Script/DesignPatterns/FSM/CtrlBase";
import StateMachine from "../../../../../Script/DesignPatterns/FSM/StateMachine";
import StateFactory from "../StateFactory/StateFactory_Drag_Option";

import commonUtils from "../../../../../Script/commonUtils";
import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import {eOptionState} from "../Const_State_Drag";
import {eTriggerType} from "../../../../../Script/DesignPatterns/Trigger/Const_Trigger";

const moveBackSpeed = 2500;

const { ccclass, property } = cc._decorator;

@ccclass
export default class OptionCtrl_Drag extends CtrlBase{

    @property({type: cc.Enum(eTriggerType)})
    mTriggerType = eTriggerType.eSpeedUp;

    @property({type: cc.Vec2})
    mOriPos: cc.Vec2 = null;

    private nodeTouchLocalPos: cc.Vec2 = cc.v2(0, 0);

    onLoad() {

        super.onLoad();
        this.changeState(eOptionState.eInit);
    }

    protected init()
    {
        if(!this.mIsInit)
        {
            this.setFSM( new StateMachine(this, new StateFactory()) );
            this.mIsInit = true;
        }
    }

    public update(dt)
    {
        super.update(dt);
    }

    public clearState()
    {
        this.nodeTouchLocalPos = cc.v2(0, 0);
        this.changeState(eOptionState.eInit);
    }
    
    public setNodeTouchLocalPos(pos: cc.Vec2)
    {
        this.nodeTouchLocalPos = pos
    }

    public getOriPos()
    {
        return this.mOriPos;
    }

    toInit()
    {
        this.node.zIndex = 1;
        this.node.opacity = 255;

        this.node.stopAllActions();
        this.node.setPosition(this.getOriPos())

        this.nodeTouchLocalPos = cc.v2(0, 0);
    }

    moveOption(param)
    {
        this.node.zIndex = 999;

        this.node.stopAllActions();
        this.node.setPosition(cc.v2(param.pos.x - this.nodeTouchLocalPos.x, param.pos.y - this.nodeTouchLocalPos.y ));
    }

    backToOri()
    {
        this.node.zIndex = 1;

        this.node.stopAllActions();
        let distance = commonUtils.getInstance().getPointDistance(this.node.getPosition(), this.mOriPos);
        let moveTo = cc.moveTo(distance / moveBackSpeed, this.mOriPos);
        let callBack = cc.callFunc(function()
                                    {
                                        this.changeState(eOptionState.eInit);
                                    }
                                    ,this);
        this.node.runAction(cc.sequence(moveTo, callBack));

        this.nodeTouchLocalPos = cc.v2(0, 0);
    }

    //-----------------------------------
    //判断状态是否能重复执行，子类实现
    public checkStateCanRepetition(stateType, param)
    {
        if(this.getNowStateType() === eOptionState.eMove)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}