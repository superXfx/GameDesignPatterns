
const countDownEndFlag = -99999;

export default class StateBase {

    protected mObjCtrl: any = null;
    private mCountTime: number = countDownEndFlag;
    private mCountDownCallFunc: Function = null;
    private mStateType: number = null;
    private mParam: any = null;

    constructor(stateType: number, objCtrl: any)
    {
        this.init(stateType, objCtrl);
    }

    private init(stateType: number, objCtrl: any)
    {
        this.mStateType = stateType;
        this.mObjCtrl = objCtrl;
    }

    public Enter(param?: any)
    {
        this.mParam = param;
    }

    public Exit()
    {
        this.endCountDown();
    }

    public update(dt)
    {
        if(this.mCountTime > 0
            && this.mCountDownCallFunc)
        {
            this.mCountTime -= dt;
            if(this.mCountTime <= 0)
            {
                this.mCountDownCallFunc()
                this.mCountDownCallFunc = null; 
            }
        }
        else
        {
            this.mCountTime = countDownEndFlag;
        }
    }

    public getStateType()
    {
        return this.mStateType;
    }

    public getParam()
    {
        return this.mParam;
    }

    //----------------
    protected setCountDwon(callFunc: Function, time)
    {
        if(time > 0)
        {
            this.mCountTime = time;
            this.mCountDownCallFunc = callFunc;
        }
    }

    protected endCountDown()
    {
        this.mCountTime = countDownEndFlag;
        this.mCountDownCallFunc = null;
    }
}
