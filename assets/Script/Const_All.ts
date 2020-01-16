
export enum eHeroType
{
    eHappyMan,
    eAngerMan,
}

export enum eMoveDir
{
    eLeft,
    eRight,
}

//---------------buff---------------
export enum eBuffType
{
    eSpeedUp,
    eSpeedDown,
    eChangeHero,
}

export enum eBuffGroup
{
    eNoGroup,
    eChangeHeroGroup,
}


export enum eAttrType
{
    eSpeed,
}

//---------------UI----------------

export enum eUIType{
    eUnDefine,
    eScene,
    ePage,
    ePopup,
    eTips,
}

export const pageNameToPath = 
{
    "StartScene": "Prefab/UI/StartScene",
    "PlayScene": "Prefab/UI/PlayScene",
}

//---------------AI----------------
export enum eAIBtnState{
    eInit,
    eThink,
}

export enum eAIState
{
   eActive,
   eInactive,
   eCompleted,
   eFailed
};

export enum eGoalType
{
    eGoal_think,
    eGoal_speedUp,
    eGoal_speedDown,
    eGoal_moveLeft,
    eGoal_moveRight,
    eGoal_changeHero,
    eGoal_findEmptySolt,
    eGoal_checkTriggerState,
    eGoal_putTrigger,
};