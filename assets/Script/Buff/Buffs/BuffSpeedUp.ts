
import BuffBase from "../BuffBase";
import * as Const_All from "../../Const_All";

export default class BuffSpeedUp extends BuffBase {

    protected init(param)
    {
        super.init(param);
        this.mLiveTime = 3;
        this.mMaxCount = 3;
    }
    
    public getAttr(attrType: Const_All.eAttrType)
    {
        if(this.getLive() === false) return 0;

        switch(attrType)
        {
            case Const_All.eAttrType.eSpeed:
                return (this.mObjCtrl.mMoveSpeed * 0.5) * this.getNowCount();
            break;
        }

        return 0;
    }
}
