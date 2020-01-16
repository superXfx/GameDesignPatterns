
import cmdMgr from "./cmdMgr";

export default class cmdBase { 

    private _mCmdMgr: cmdMgr = null;
    public set mCmdMgr(value){this._mCmdMgr = value}

    protected mParam: any = null;

    public setParam(param: any)
    {
        this.mParam = param;
    }

    public open()
    {

    }

    //在此函数中停止一切Action
    public close()
    {

    }

    protected end()
    {
        this._mCmdMgr.onCmdEnd();
    }
}
