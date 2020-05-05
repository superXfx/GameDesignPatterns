
import {eConditionType} from "./Const_BehaviorTree";

export default class Goal_Evaluator
{
    static mInstance: Goal_Evaluator = null;
    
    static getInstance()
    {
        if(this.mInstance === null)
        {
            this.mInstance = new Goal_Evaluator;
        }

        return this.mInstance;
    }

    getDesirability(condition)
    {
        switch(condition)
        {
            case eConditionType.eChangeHero:
                return this.CalculateDesirability_ChangeHero();
            break;
            case eConditionType.eMoveLeft:
                return this.CalculateDesirability_MoveLeft();
            break;
            case eConditionType.eMoveRight:
                return this.CalculateDesirability_MoveRight();
            break;
            case eConditionType.eSpeedUp:
                return this.CalculateDesirability_SpeedUp();
            break;
            case eConditionType.eSpeedDown:
                return this.CalculateDesirability_SpeedDown();
            break;
        }
    }

    private CalculateDesirability_ChangeHero(): number
    {
        return Math.random();
    }
  
    private CalculateDesirability_MoveLeft(): number
    {
        return Math.random();
    }
    
    private CalculateDesirability_MoveRight(): number
    {
        return Math.random();
    }

    private CalculateDesirability_SpeedDown(): number
    {
        return Math.random();
    }

    private CalculateDesirability_SpeedUp(): number
    {
        return Math.random();
    }
}
