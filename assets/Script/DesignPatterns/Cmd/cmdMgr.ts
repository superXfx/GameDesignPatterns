
import cmdBase from "./cmdBase";
const {ccclass, property} = cc._decorator;

enum eRunType{
    eNormal,
    eReverse,
}

@ccclass
export default class cmdMgr extends cc.Component {
    
    mRunType: eRunType = eRunType.eNormal;
    mRuningCmd: cmdBase = null;
    mCmdArray: Array<cmdBase> = null;
    mEndCallBack: any = null;

    public run(endCall?:(isRunEnd: boolean) => void)
    {
        this.mRunType = eRunType.eNormal;

        this._onRun();
        this.mEndCallBack = endCall;
        
    }

    public runReverse(endCall:(isRunEnd: boolean) => void)
    {
        this.mRunType = eRunType.eReverse;

        this._onRun();
        this.mEndCallBack = endCall;
    }

    public runForever(endCall:(isRunEnd: boolean) => void)
    {
        //to do
    }

    public stop()
    {
        this._onStop(false);
    }

    public pushCmd(cmd: cmdBase)
    {
        if(this.mCmdArray == null)  this.mCmdArray = new Array<cmdBase>();
        cmd.mCmdMgr = this;
        this.mCmdArray.push(cmd);
    }

    private _onRun()
    {
        if(this.mCmdArray && this.mCmdArray.length > 0)
        {
            if(this.mRunType === eRunType.eNormal)
            {
                this.mRuningCmd = this.mCmdArray[0];
                this.mCmdArray.splice(0, 1);
                this.mRuningCmd.open();
            }
            else if(this.mRunType === eRunType.eReverse)
            {
                this.mRuningCmd = this.mCmdArray[this.mCmdArray.length-1];
                this.mCmdArray.splice(this.mCmdArray.length - 1, 1);
                this.mRuningCmd.open();
            }
        }
    }

    private _onStop(isRunEnd: boolean)
    {
        this.mCmdArray = null;

        if(!this.mRuningCmd) return;
        
        this.mRuningCmd.close();
        this.mRuningCmd = null;
        if(this.mEndCallBack)
        {
            this.mEndCallBack(isRunEnd);
        }
        
        this.mRunType = eRunType.eNormal;
    }

    public onCmdEnd()
    {
        if(this.mRuningCmd) this.mRuningCmd.close();
        
        if(this.mCmdArray && this.mCmdArray.length > 0)
        {
            this._onRun();
        }
        else
        {
            this._onStop(true);
        }
    }
}
