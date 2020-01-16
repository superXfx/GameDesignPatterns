
import TriggerBase from "../TriggerBase";
import Hero from "../../../../Exemple/TriggerExemple/Scrip/Hero/Hero";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TriToRight extends TriggerBase {

    public Action(hero: Hero)
    {
        hero.TurnToRight();
    }
}
