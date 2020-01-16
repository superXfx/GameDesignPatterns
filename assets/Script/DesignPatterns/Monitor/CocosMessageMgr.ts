
import * as Const_Msg from "./Const_Msg_Monitor";

export default class CocosMessageMgr
{
    static mInstance: CocosMessageMgr = null;
    
    private constructor(){};

    public static getInstance()
    {
        if(this.mInstance === null)
        {
            this.mInstance = new CocosMessageMgr();
        }

        return this.mInstance;
    }

    sendMsg(msgId, msgData?)
    {
        if(!msgData)
        {
            msgData = {};
        }
        
        cc.systemEvent.emit(msgId, {msgId: msgId, msgData: msgData});
    }

    registerMsg(msgId, callFunc:(data: any) => void, target: any)
    {
        
        cc.systemEvent.on(msgId, callFunc, target);
    }

    unRegisterMsg(msgId, callFunc:(data: any) => void, target: any)
    {
        cc.systemEvent.off(msgId, callFunc, target);
    }
}
