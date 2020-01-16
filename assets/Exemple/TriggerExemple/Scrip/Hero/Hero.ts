
import CtrlBase from "../../../../Script/DesignPatterns/FSM/CtrlBase";
import MoveBehavior from "./MoveInterface/MoveBehavior";
import MoveNormal from "./MoveInterface/MoveNormal";
import MoveRotation from "./MoveInterface/MoveRotation";
import BuffMgr from "../../../../Script/Buff/BuffMgr";

import {eMoveDir, eBuffType, eAttrType, eHeroType} from "../../../../Script/Const_All";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero extends CtrlBase {

    private mMoveSpeed: number = 200;
    private mHeroType: eHeroType = null;

    private mBuffMgr: BuffMgr = null;
    private mMoveBehavior: MoveBehavior = null;

    protected init()
    {
        this.mBuffMgr = new BuffMgr(this);
        this.changeToOriginHero();
    }

    public update(dt)
    {
        super.update(dt);

        this.mBuffMgr.update(dt);
        this.mMoveBehavior.update(dt);
    }

    public getHeroType()
    {
        return this.mHeroType;
    }

    public addBuff(buffType: eBuffType)
    {
        this.mBuffMgr.createBuff(buffType);
    }

    public TurnToLeft()
    {
        this.mMoveBehavior.setDir( eMoveDir.eLeft );
    }

    public TurnToRight()
    {
        this.mMoveBehavior.setDir( eMoveDir.eRight );
    }

    public changeHero(heroType: eHeroType)
    {
        let data = null;
        if(this.mMoveBehavior)
        {
            data = this.mMoveBehavior.packParam();
        }

        switch(heroType)
        {
            case eHeroType.eHappyMan:
                this.mMoveBehavior = new MoveNormal(this);
                this.node.getChildByName("Avatar1").active = true;
                this.node.getChildByName("Avatar2").active = false;
                this.node.rotation = 0;
            break;
            case eHeroType.eAngerMan:
                this.mMoveBehavior = new MoveRotation(this);
                this.node.getChildByName("Avatar1").active = false;
                this.node.getChildByName("Avatar2").active = true;  
            break;
        }

        this.mMoveBehavior.unPackParam(data);

        this.mHeroType = heroType;
    }

    public changeToOriginHero()
    {
        this.changeHero(eHeroType.eHappyMan);
    }

    public getMoveSpeed()
    {
        return this.mMoveSpeed + this.mBuffMgr.getAttr(eAttrType.eSpeed);
    }

    public setMoveSpeed(value)
    {
        this.mMoveSpeed = value; 
    }
}
