
import CocosMessageMgr from "../Monitor/CocosMessageMgr";
import * as Const_Msg from "../Monitor/Const_Msg_Monitor";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StateMachine
{
    private mPreStateData: any = null;
    private mNowState: any = null;
    private mGlobalState: any = null;
    private mObjCtrl: any = null;
    private mStateFactory: any = null;

    constructor(objCtrl: any, factory: any)
    {
        this.init(objCtrl, factory);
    }

    private init(objCtrl: any, factory: any)
    {
        this.mObjCtrl = objCtrl;
        this.mStateFactory = factory;
    }

    public onDestory()
    {
        
    }

    public update(dt)
    {
        if(this.mGlobalState)
        {
            this.mGlobalState.update(dt);
        }
        
        if(this.mNowState)
        {
            this.mNowState.update(dt);
        }
    }

    public changeState(stateType: number, param?: any)
    {
        let stateInstance = this.mStateFactory.createState(stateType, this.mObjCtrl);
        if(stateInstance === null) return;

        if(this.mNowState)
        {
            this.mPreStateData = {type: this.mNowState.getStateType(), param: this.mNowState.getParam()};
            this.mNowState.Exit();
        }
        
        this.mNowState = stateInstance;
        this.mNowState.Enter(param);
    }

    public changeGlobalState(stateType: number, param?: any)
    {
        let stateInstance = this.mStateFactory.createState(stateType, this.mObjCtrl);
        if(stateInstance === null) return;

        if(this.mGlobalState)
        {
            this.mGlobalState.Exit();
        }

        this.mGlobalState = stateInstance;
        this.mGlobalState.Enter(param);
    }

    public backPreState()
    {
        if(this.mPreStateData)
        {
            this.changeState(this.mPreStateData.type, this.mPreStateData.param);
        }
    }

    public getNowState()
    {
        return this.mNowState;
    }

    public getNowStateType()
    {
        if(this.mNowState)
        {
            return this.mNowState.getStateType();
        }
        return null;
    }

    public getNowStateParam()
    {
        if(this.mNowState)
        {
            return this.mNowState.getParam();
        }
        return null;
    }

    public getNowGlobalState()
    {
        return this.mGlobalState;
    }

    public getNowGlobalStateType()
    {
        if(this.mGlobalState)
        {
            return this.mGlobalState.getStateType();
        }
        return null;
    }

    public getNowGlobalStateParam()
    {
        if(this.mGlobalState)
        {
            return this.mGlobalState.getParam();
        }
        return null;
    }
}
