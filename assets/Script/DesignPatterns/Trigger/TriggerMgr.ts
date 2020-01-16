
import {eTriggerType, TypeToName, eLiveType} from "./Const_Trigger";
import TriggerBase from "./TriggerBase"

export default class TriggerMgr
{
    private mTriggerPrefabs: Array<cc.Prefab> = null;
    private mTriggerArray: Array<TriggerBase> = null;
    private mHeroArray: Array<any> = null;
    
    private mTriggerParent: cc.Node = null;

    private static mInstance: TriggerMgr = null;
    
    private constructor()
    {
        this.init();
    };

    public static getInstance()
    {
        if(this.mInstance === null)
        {
            this.mInstance = new TriggerMgr();
        }

        return this.mInstance;
    }

    private init()
    {
        this.mTriggerArray = new Array<TriggerBase>();
    }

    public update(dt)
    {
        this.updateTrigger(dt);
        this.tryTriggers();
    }

    private updateTrigger(dt)
    {
        for(let i = 0; i < this.mTriggerArray.length;)
        {
            let trigger = this.mTriggerArray[i];
            if(trigger.getLive() === false)
            {
                this.mTriggerArray[i].node.removeFromParent();
                this.mTriggerArray.splice(i, 1)
            }
            else
            {
                trigger._update(dt);
                i++;
            }
        }
    }

    private tryTriggers()
    {
        for(let i = 0; i < this.mHeroArray.length; i++)
        {
            let hero = this.mHeroArray[i];
            for(let j = 0; j < this.mTriggerArray.length; j++)
            {
                let trigger = this.mTriggerArray[j];
                if(trigger.getActive() && trigger.getLive())
                {
                    trigger.try(hero)
                }
            }
        }
    }

    public setHeros(heros: any)
    {
        this.mHeroArray = heros;
    }

    public setTriggerParent(node: cc.Node)
    {
        this.mTriggerParent = node;
    }

    public preloadAllTrigger(completeCallback: (result) => void)
    {
        cc.loader.loadResArray(TypeToName, function(error: Error, resource: any[])
        {
            this.mTriggerPrefabs = resource;
            completeCallback(true);
        }.bind(this))
    }

    public createTrigger(triggerType, param?: any)
    {
        let triggerNode = cc.instantiate( this.mTriggerPrefabs[triggerType] );
        if(param && param.pos)
        {
            triggerNode.position = param.pos;
        }

        return triggerNode.getComponent(TriggerBase);
    }

    public push(type: TriggerBase, param?: any);
    public push(type: eTriggerType, param?: any);
    public push(type: TriggerBase | eTriggerType, param?: any)
    {
        if(typeof(type) === "number")
        {
            let trigger = this.createTrigger(type, param);
            this.mTriggerParent.addChild(trigger.node);
            this.mTriggerArray.push(trigger);
        }
        else
        {
            this.mTriggerArray.push(type);
        }
    }
}
