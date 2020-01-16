import UIBase from "./UIBase";

import * as Const_All from "../Const_All";

const {ccclass, property} = cc._decorator;

export default class UIMgr {

    static mInstance: UIMgr = null;

    private mSceneNode: cc.Node = null;
    private mPageNode: cc.Node = null;
    private mPopupNode: cc.Node = null;
    private mTipsNode: cc.Node = null;

    private constructor(){}

    public static getInstance()
    {
        if(!this.mInstance)
        {
            this.mInstance = new UIMgr();
        }
        return this.mInstance;
    }

    setUINodesByParent(parentNode)
    {
        this.mSceneNode = parentNode.getChildByName("SceneNode");
        this.mPageNode = parentNode.getChildByName("PageNode");
        this.mPopupNode = parentNode.getChildByName("PopupNode");
        this.mTipsNode = parentNode.getChildByName("TipsNode");
    }

    public open(name)
    {
        cc.loader.loadRes(name, function(error: Error, resource: UIBase)
        {
            let ui = cc.instantiate(resource);
            switch(ui.getComponent(UIBase).getUIType())
            {
                case Const_All.eUIType.eScene:
                    this.mSceneNode.removeAllChildren();
                    this.mSceneNode.addChild(ui);
                break;
                case Const_All.eUIType.ePage:
                    
                    this.mPageNode.addChild(ui);
                break;
                case Const_All.eUIType.ePopup:
                    
                    this.mPopupNode.addChild(ui);
                break;
                case Const_All.eUIType.eTips:
                    
                    this.mTipsNode.addChild(ui);
                break;
            }
        }.bind(this))
    }

    public close(name)
    {
        
    }
}
