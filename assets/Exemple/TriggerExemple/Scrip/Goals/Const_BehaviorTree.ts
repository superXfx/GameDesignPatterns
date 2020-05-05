
export enum eAIState
{
    eInactive,
    eActive,
    eCompleted,
    eFailed
};

export enum eConditionType
{
    eChangeHero,
    eMoveLeft,
    eMoveRight,
    eSpeedDown,
    eSpeedUp,
}

export enum eNodeType
{
    eOrder,
    eSelect,
    eParallel,
    eLoop,
    eGoal_think,
    eGoal_findEmptySolt,
    eGoal_checkTriggerState,
    eGoal_putTrigger,
}