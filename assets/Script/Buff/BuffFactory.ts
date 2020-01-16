
import BuffBase from "./BuffBase";

import {eBuffType} from "../Const_All";

import BuffSpeedUp from "./Buffs/BuffSpeedUp";
import BuffSpeedDown from "./Buffs/BuffSpeedDown";
import BuffChangeHero from "./Buffs/BuffChangeHero";

export default class BuffFactory{

    public createState(stateType: eBuffType, objCtrl: any, param?: {}): BuffBase
    {
        let instance: BuffBase = null;

        switch(stateType)
        {
            case eBuffType.eSpeedUp:
                instance = new BuffSpeedUp(stateType, objCtrl, param);
            break;
            case eBuffType.eSpeedDown:
                instance = new BuffSpeedDown(stateType, objCtrl, param);
            break;
            case eBuffType.eChangeHero:
                instance = new BuffChangeHero(stateType, objCtrl, param);
            break;
        }

        return instance
    }
}
