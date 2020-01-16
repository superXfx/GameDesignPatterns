
export enum eTriggerType
{
    eSpeedUp,
    eSpeedDown,
    eToLeft,
    eToRight,
    eTriggerSlot,
    eChangeHero,
    eMineral,
    eBed,
}

export let TypeToName: Array<string> = [];
TypeToName[eTriggerType.eSpeedUp] = "Prefab/Trigger/TriggerSpeed+";
TypeToName[eTriggerType.eSpeedDown] = "Prefab/Trigger/TriggerSpeed-";
TypeToName[eTriggerType.eToLeft] = "Prefab/Trigger/TriggerToLeft";
TypeToName[eTriggerType.eToRight] = "Prefab/Trigger/TriggerToRight";
TypeToName[eTriggerType.eTriggerSlot] = "Prefab/Trigger/TriggerSlot";
TypeToName[eTriggerType.eChangeHero] = "Prefab/Trigger/TriggerChangeHero";

export enum eLiveType
{
    eOnce,
    eImmortal,
    eRebirth,
}