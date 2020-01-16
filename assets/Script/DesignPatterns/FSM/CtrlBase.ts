
import StateMachine from "../FSM/StateMachine";

import CocosMessageMgr from "../Monitor/CocosMessageMgr";
import * as Const_Msg from "../Monitor/Const_Msg_Monitor";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CtrlBase extends cc.Component{

    protected mIsInit = false;
    private mFSM: StateMachine = null;

    onLoad() {

        this.init();
    }

    protected init()
    {
        
    }

    onEnable()
    {
        this.registerMsg();
    }

    onDisable()
    {
        this.unResgiterMsg();
    }

    onDestory()
    {
        if(this.mFSM)
        {
            this.mFSM.onDestory();
        }
    }

    public registerMsg()
    {

    }

    public unResgiterMsg()
    {
        this.unscheduleAllCallbacks();
    }

    public update(dt)
    {
        if(this.mFSM)
        {
            this.mFSM.update(dt);
        }
    }

    public setFSM(fsm)
    {
        this.mFSM = fsm;
    }

    public changeState(stateType: number, param: any = {})
    {   
        this.preCall();
        this.init();

        if(this.mFSM && (stateType != this.getNowStateType() || this.checkStateCanRepetition(stateType, param)))
        {
            this.mFSM.changeState(stateType, param);
        }
    }

    public changeGlobalState(stateType: number, param: any = {})
    {   
        this.init();

        if(this.mFSM && (stateType != this.getNowGlobalStateType() || this.checkGlobalStateCanRepetition(stateType, param)))
        {
            this.mFSM.changeGlobalState(stateType, param);
        }
    }

    public clearState()
    {
        
    }

    public getNowStateType()
    {
        return  this.mFSM && this.mFSM.getNowStateType();
    }

    public getNowStateParam()
    {
        return this.mFSM && this.mFSM.getNowStateParam();
    }

    public getNowGlobalState()
    {
        return this.mFSM && this.mFSM.getNowGlobalState();
    }

    public getNowGlobalStateType()
    {
        return this.mFSM && this.mFSM.getNowGlobalStateType();
    }

    public getNowGlobalStateParam()
    {
        return this.mFSM && this.mFSM.getNowGlobalStateParam();
    }
    
    public preCall()
    {

    }

    //判断状态是否能重复执行，子类实现
    public checkStateCanRepetition(stateType, param)
    {
        return false;
    }

    //判断全局状态是否能重复执行，子类实现
    public checkGlobalStateCanRepetition(stateType, param)
    {
        return false;
    }
}
