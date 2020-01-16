
import Hero from "../Hero";
import {eMoveDir} from "../../../../../Script/Const_All";

export default class MoveBehavior{

    protected mObjCtrl: Hero = null;
    protected mMoveDir: eMoveDir = eMoveDir.eRight;

    public constructor(hero: Hero)
    {
        this.mObjCtrl = hero;
    }

    public update(dt)
    {
        
    }

    public setDir(dir: eMoveDir)
    {
        this.mMoveDir = dir;
    }

    public packParam()
    {
        return {dir: this.mMoveDir}
    }

    public unPackParam(data)
    {
        if(data)
        {
            this.mMoveDir = data.dir;
        }
    }
}
