
import TriggerBase from "../TriggerBase";
import Hero from "../../../../Exemple/TriggerExemple/Scrip/Hero/Hero";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TriggerSolt extends TriggerBase {

    mChildTrigger: TriggerBase = null;

    public _update(dt)
    {
        if(this.mChildTrigger)
        {
            if(this.mChildTrigger.getLive() === false)
            {
                this.removeTrigger();
            }
            else
            {
                this.mChildTrigger._update(dt);
            }
        }
    }

    public Action(hero: Hero)
    {
        if(this.mChildTrigger
            && this.mChildTrigger.getActive() === true)
        {
            this.mChildTrigger.Action(hero);
            this.mChildTrigger.changeFlagInCrash();
        }
    }

    public onExit(hero: Hero)
    {
        if(this.mChildTrigger)
        {
            this.mChildTrigger.onExit(hero);
        }
    }

    private removeTrigger()
    {
        this.mChildTrigger.node.removeFromParent();
        this.mChildTrigger = null;
    }

    public addChildTrigger(TriggerBase)
    {
        if(this.mChildTrigger)
        {
            this.removeTrigger();
        }
        
        this.node.addChild(TriggerBase.node);
        this.mChildTrigger = TriggerBase;
    }

    public isAddedTrigger()
    {
        return !(this.mChildTrigger === null);
    }
}
