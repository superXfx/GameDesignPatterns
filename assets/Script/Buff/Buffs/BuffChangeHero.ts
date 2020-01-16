
import BuffBase from "../BuffBase";
import * as Const_All from "../../Const_All";

export default class BuffChangeHero extends BuffBase {

    protected init(param)
    {
        super.init(param);
        this.mLiveTime = 3;
        this.mGroup = Const_All.eBuffGroup.eChangeHeroGroup;
        this.mClashGroup = Const_All.eBuffGroup.eChangeHeroGroup;
    }

    public Exit()
    {
        this.mObjCtrl.changeToOriginHero();
    }

    public Action()
    {
        this.mObjCtrl.changeHero(Const_All.eHeroType.eAngerMan); 
    }
}
