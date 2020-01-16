
import UIBase from "../../../../../Script/UI/UIBase";

import * as Const_All from "../../../../../Script/Const_All";
import UIMgr from "../../../../../Script/UI/UIMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIStartScene extends UIBase {

    private mBtnStar: cc.Node = null;
    
    protected init()
    {
        this.mBtnStar = this.node.getChildByName("BtnStar");
    }

    public registerMsg()
    {
        super.registerMsg();
        this.mBtnStar.on("click", this.onBtnStar, this);
    }

    public unResgiterMsg()
    {
        super.unResgiterMsg();
        this.mBtnStar.off("click", this.onBtnStar, this);
    }

    onBtnStar()
    {
        UIMgr.getInstance().open(Const_All.pageNameToPath.PlayScene);
    }
}
