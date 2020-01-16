
import cmdMgr from "../cmdMgr"
import cmdMoveBy from "./cmds/cmdMoveBy";
import cmdShowText from "./cmds/cmdShowText";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type: cc.Node})
    mNode: cc.Node = null;

    @property({type: cc.Label})
    mLabel: cc.Label = null;

    @property({type: cc.String})
    mText: string = "";

    private mCmdMgr: cmdMgr = null;

    // onLoad () {}

    start () {

        this.mCmdMgr = new cmdMgr();

        let cmd1 = new cmdMoveBy();
        cmd1.setParam({node: this.mNode, time: 1, pos: cc.v2(300, 0)});
        let cmd2 = new cmdMoveBy();
        cmd2.setParam({node: this.mNode, time: 1, pos: cc.v2(-300, 0)});
        let cmd3 = new cmdShowText();
        cmd3.setParam({node: this.mLabel, text: this.mText});

        this.mCmdMgr.pushCmd(cmd1);
        this.mCmdMgr.pushCmd(cmd3);
        this.mCmdMgr.pushCmd(cmd2);
        
        this.mCmdMgr.run(function()
        {
            console.log("------all cmd run end------")
        }
        .bind(this));
    }

    // update (dt) {}
}
