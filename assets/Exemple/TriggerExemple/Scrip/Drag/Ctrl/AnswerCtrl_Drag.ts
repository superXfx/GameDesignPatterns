
import TriggerMgr from "../../../../../Script/DesignPatterns/Trigger/TriggerMgr";

import CtrlBase from "../../../../../Script/DesignPatterns/FSM/CtrlBase";
import StateMachine from "../../../../../Script/DesignPatterns/FSM/StateMachine";
import StateFactory from "./../StateFactory/StateFactory_Drag_Answer";

import TriSolt from "../../../../../Script/DesignPatterns/Trigger/Trigger/TriSolt";

import CocosMessageMgr from "../../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg from "../../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import {eAnswerState} from "../Const_State_Drag";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnswerCtrl_Drag extends CtrlBase{

    @property({type: TriSolt})
    mTriggerSolt: TriSolt = null;

    onLoad() {

        super.onLoad();
        this.clearState();
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
        this.changeState(eAnswerState.eInit);
    }
    
    //-------------------------
    public checkClick(worldPos)
    {
        if(this.node.getBoundingBoxToWorld().contains(worldPos))
        {
            return true;
        }

        return false;
    }

    fillTrigger(type)
    {
        let triggerCtrl = TriggerMgr.getInstance().createTrigger(type);
        this.mTriggerSolt.addChildTrigger(triggerCtrl);
    }

    public isfilled()
    {
        return this.mTriggerSolt.isAddedTrigger();
    }
}
