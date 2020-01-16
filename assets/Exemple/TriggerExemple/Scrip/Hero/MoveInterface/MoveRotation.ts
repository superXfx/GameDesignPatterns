
import MoveBehavior from "./MoveBehavior";
import {eMoveDir} from "../../../../../Script/Const_All";

export default class MoveRotation extends MoveBehavior {

    private mRotationSpeed: number = 90;

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
        this.mObjCtrl.node.position = cc.v2(this.mObjCtrl.node.position.x + value, this.mObjCtrl.node.position.y);
        
        this.mObjCtrl.node.rotation += this.mRotationSpeed * dt;
        if(this.mObjCtrl.node.rotation >=360)
        {
            this.mObjCtrl.node.rotation = this.mObjCtrl.node.rotation - 360;
        }
    }
}
