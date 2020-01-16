
import cmdMgr from "../../cmdMgr";
import cmdBase from "../../cmdBase";
const {ccclass, property} = cc._decorator;

@ccclass
export default class cmdMoveBy extends cmdBase{ 

    private mNode: cc.Node = null;

    public setParam(param: any)
    {
        this.mNode = param.node;
        this.mParam = param;
    }

    public open()
    {
        this.mNode.stopAllActions();
        this.mNode.runAction(cc.sequence(
            cc.moveBy(this.mParam.time, this.mParam.pos)
            ,cc.callFunc(function(){this.end()}, this)
        ))
    }

    public close()
    {
        
    }
}
