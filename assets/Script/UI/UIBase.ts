
import * as  Const_All from "../Const_All";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIBase extends cc.Component {

    @property({type: cc.Enum(Const_All.eUIType)})
    mUIType: Const_All.eUIType = Const_All.eUIType.eUnDefine;

    public onLoad()
    {
        this.init();
    }

    public onEnable()
    {
        this.registerMsg();
    }

    public onDisable()
    {
        this.unResgiterMsg();
    }

    protected init()
    {

    }

    update (dt)
    {

    }

    public registerMsg()
    {

    }

    public unResgiterMsg()
    {
        this.unscheduleAllCallbacks();
    }

    //---------------

    protected setUIType(uiType: Const_All.eUIType)
    {
        this.mUIType = uiType;
    }

    public getUIType()
    {
        return this.mUIType;
    }
}
