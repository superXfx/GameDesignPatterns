
import {eLiveType} from "./Const_Trigger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TriggerBase extends cc.Component {

    @property({type: cc.Enum(eLiveType)})
    mLiveType: eLiveType = eLiveType.eOnce;

    @property({type: Number})
    mRebirthTime: number = 3;
    
    private mIsActive: boolean = true;
    private mIsLive: boolean = true;
    private mTime: number = 0;

    private mPreHero: any = null;

    public init()
    {
        if(this.mLiveType !== eLiveType.eRebirth)
        {
            this.mRebirthTime = undefined;
        }
    }

    public Action(hero: any)
    {

    }

    public onExit(hero: any)
    {

    }

    public _update(dt)
    {
        if(this.mIsLive === true
            && this.mIsActive === false
            &&this.mLiveType === eLiveType.eRebirth
            && this.mRebirthTime != undefined)
        {
            this.mTime += dt;
            if(this.mTime >= this.mRebirthTime)
            {
                this.setActive(true);
                this.mTime = 0;
            }
        }
    }

    public try(hero)
    {
        if( this.node.getBoundingBoxToWorld().intersects( hero.node.getBoundingBoxToWorld() ) )
        {
            this.mPreHero = hero;
            this.Action(hero);
            this.changeFlagInCrash();
        }
        else if (this.mPreHero === hero)
        {
            this.mPreHero = null;
            this.onExit(hero);
        }
    }

    public changeFlagInCrash()
    {
        switch(this.mLiveType)
        {
            case eLiveType.eOnce:
                this.setActive(false);
                this.mIsLive = false;
                this.mPreHero = null;
            break;
            case eLiveType.eImmortal:
                this.setActive(true);
                this.mIsLive = true;
            break;
            case eLiveType.eRebirth:
                this.setActive(false);
                this.mIsLive = true;
                this.mPreHero = null;
            break;
        }            
    }

    protected setActive(isActive)
    {
        this.mIsActive = isActive;
        if(isActive === true)
        {
            this.node.active = true;
        }
        else
        {
            this.node.active = false;
        }
    }

    public getActive()
    {
        return this.mIsActive;
    }
    
    public getLive()
    {
        return this.mIsLive;
    }  
}
