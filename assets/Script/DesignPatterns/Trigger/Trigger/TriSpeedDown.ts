
import TriggerBase from "../TriggerBase";
import Hero from "../../../../Exemple/TriggerExemple/Scrip/Hero/Hero";

import *  as Const_All from "../../../Const_All";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TriSpeedDown extends TriggerBase {

    public Action(hero: Hero)
    {
        hero.addBuff(Const_All.eBuffType.eSpeedDown);
    }
}
