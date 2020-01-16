
import UIBase from "../../../../../Script/UI/UIBase";

import TriggerBase from "../../../../../Script/DesignPatterns/Trigger/TriggerBase";
import TriggerMgr from "../../../../../Script/DesignPatterns/Trigger/TriggerMgr";
import Hero from "../../Hero/Hero";

import * as Const_All from "../../../../../Script/Const_All";
import UIMgr from "../../../../../Script/UI/UIMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIPlayScene extends UIBase {

    private mHeroArray: Array<Hero> = null;
    private mGameNode: cc.Node = null;
    private mTriggerParent: cc.Node = null;
    private mBlockNode: cc.Node = null;

    protected init()
    {
        this.mGameNode = this.node.getChildByName("GameNode");
        this.mTriggerParent = this.mGameNode.getChildByName("TriggerParent");
        this.mBlockNode = this.node.getChildByName("BlockNode");
        
        this.mBlockNode.active = true;

        this.mHeroArray = new Array<Hero>();
        this.mHeroArray.push(this.node.getChildByName("GameNode").getChildByName("Hero1").getComponent(Hero));
        
        TriggerMgr.getInstance().setHeros(this.mHeroArray);
        TriggerMgr.getInstance().setTriggerParent(this.mTriggerParent);
        TriggerMgr.getInstance().preloadAllTrigger(this.onPreloadEnd.bind(this));
        
        let children = this.mTriggerParent.children;
        for(let i = 0; i < children.length; i++)
        {
            TriggerMgr.getInstance().push( children[i].getComponent(TriggerBase));
        }
    }

    update(dt)
    {
        super.update(dt);
        TriggerMgr.getInstance().update(dt);
    }

    private onPreloadEnd()
    {
        this.mBlockNode.active = false;
    }

    onBack()
    {
        UIMgr.getInstance().open(Const_All.pageNameToPath.StartScene);
    }
}
