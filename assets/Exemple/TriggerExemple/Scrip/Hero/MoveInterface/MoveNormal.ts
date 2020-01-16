
import MoveBehavior from "./MoveBehavior";

import {eMoveDir} from "../../../../../Script/Const_All";

export default class MoveNormal extends MoveBehavior {

    public update(dt)
    {
        let value = dt * this.mObjCtrl.getMoveSpeed();
        switch(this.mMoveDir)
        {
            case eMoveDir.eLeft:
                value *= -1;
            break;
            case eMoveDir.eRight:
                value *= 1;
            break;
        }
        this.mObjCtrl.node.position = cc.v2(this.mObjCtrl.node.position.x + value
                                                , this.mObjCtrl.node.position.y);
    }
}
