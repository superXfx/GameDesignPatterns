
import cmdMgr from "../../cmdMgr";
import cmdBase from "../../cmdBase";
const {ccclass, property} = cc._decorator;

@ccclass
export default class cmdShowText extends cmdBase{ 

    private mNode: cc.Node = null;

    public setParam(param: any)
    {
        this.mNode = param.node;
        this.mParam = param;
    }

    public open()
    {
        this.mNode.getComponent(cc.Label).string = this.mParam.text;
        this.end();
    }

    public close()
    {
        
    }
}
