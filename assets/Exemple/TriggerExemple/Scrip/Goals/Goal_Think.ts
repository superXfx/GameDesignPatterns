
import Goal_Composite from "./Goal_Composite";
import Goal_Evaluator from "./Evaluator/Goal_Evaluator";

import AnswerCtrl from "../Drag/Ctrl/AnswerCtrl_Drag";
import OptionCtrl from "../Drag/Ctrl/OptionCtrl_Drag";

import CocosMessageMgr from "../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import SpeedUpGoal_Evaluator from "./Evaluator/SpeedUpGoal_Evaluator";
import SpeedDownGoal_Evaluator from "./Evaluator/SpeedDownGoal_Evaluator";
import MoveLeftGoal_Evaluator from "./Evaluator/MoveLeftGoal_Evaluator";
import MoveRightGoal_Evaluator from "./Evaluator/MoveRightGoal_Evaluator";
import ChangeHeroGoal_Evaluator from "./Evaluator/ChangeHeroGoal_Evaluator";

import { eAIState, eGoalType } from "../../../../Script/Const_All";
import Goal_SpeedUp from "./Goal_SpeedUp";
import Goal_SpeedDown from "./Goal_SpeedDown";
import Goal_MoveLeft from "./Goal_MoveLeft";
import Goal_MoveRight from "./Goal_MoveRight";
import Goal_ChangeHero from "./Goal_ChangeHero";

export default class Goal_Think extends Goal_Composite
{
    private mGameNode: cc.Node;
    private mDragAnswers: Array<AnswerCtrl>;
    private mDragOptions: Array<OptionCtrl>;

    private mEvaluators: Array<Goal_Evaluator>;

    constructor(param)
    {
        super(param, eGoalType.eGoal_think);
        
        this.mGameNode = param.gameNode;

        this.mDragAnswers = new Array<AnswerCtrl>();
        let AnswerParent = this.mGameNode.getChildByName("TriggerDragNode").getChildByName("AnswerParent");
        let answerChildren = AnswerParent.children
        for(let i = 0; i < AnswerParent.childrenCount; i++)
        {
            if( answerChildren[i].getComponent(AnswerCtrl) )
            {
                this.mDragAnswers.push( answerChildren[i].getComponent(AnswerCtrl) );
            }
        }
        
        this.mDragOptions = new Array<OptionCtrl>();
        let optionParent = this.mGameNode.getChildByName("TriggerDragNode").getChildByName("OptionParent");
        let optionChildren = optionParent.children
        for(let i = 0; i < optionParent.childrenCount; i++)
        {
            if( optionChildren[i].getComponent(OptionCtrl) )
            {
                this.mDragOptions.push( optionChildren[i].getComponent(OptionCtrl) );
            }
        }

        this.mEvaluators = new Array<Goal_Evaluator>();
        this.mEvaluators.push(new SpeedUpGoal_Evaluator());
        this.mEvaluators.push(new SpeedDownGoal_Evaluator());
        this.mEvaluators.push(new MoveLeftGoal_Evaluator());
        this.mEvaluators.push(new MoveRightGoal_Evaluator());
        this.mEvaluators.push(new ChangeHeroGoal_Evaluator());
    }

    public Enter()
    {
        this.mState = eAIState.eActive;
        CocosMessageMgr.getInstance().registerMsg(Const_Msg_Monitor.MSG_ADD_SUBGOAL, this.onAddSubgoal, this);
        this.Arbitrate();
    }

    public Exit()
    {
        CocosMessageMgr.getInstance().unRegisterMsg(Const_Msg_Monitor.MSG_ADD_SUBGOAL, this.onAddSubgoal, this);
    }

    public Arbitrate()
    {
        let best = 0;
        let mostDesirable = null;
        for(let i = 0; i < this.mEvaluators.length; i++)
        {
            let desirabilty = this.mEvaluators[i].CalculateDesirability();

            if( desirabilty >= best)
            {
                best = desirabilty;
                mostDesirable = this.mEvaluators[i];
            }
        }

        mostDesirable.SetGoal();
    }

    public Process(dt)
    {
        this.ActivateIfInactive();
        let subgoalState = this.ProcessSubgoals(dt);
        if(subgoalState === eAIState.eCompleted || subgoalState === eAIState.eFailed)
        { 
            this.mState = eAIState.eInactive;
        }

        return this.mState;
    }

    public notPresent(goalType)
    {
        if(this.mSubGoals.length > 0 )
        {
            return this.mSubGoals[0].getType() != goalType;
        }

        return true;
    }

    public AddGoal_SpeedUp()
    {
        if(this.notPresent(eGoalType.eGoal_speedUp))
        {
            this.RemoveAllSubgoals();
            this.AddSubgoal(new Goal_SpeedUp({answers: this.mDragAnswers
                                            , options: this.mDragOptions}));
        }
    }

    public AddGoal_SpeedDown()
    {
        if(this.notPresent(eGoalType.eGoal_speedDown))
        {
            this.RemoveAllSubgoals();
            this.AddSubgoal(new Goal_SpeedDown({answers: this.mDragAnswers
                                                , options: this.mDragOptions}));
        }
    }

    public AddGoal_MoveLeft()
    {
        if(this.notPresent(eGoalType.eGoal_moveLeft))
        {
            this.RemoveAllSubgoals();
            this.AddSubgoal(new Goal_MoveLeft({answers: this.mDragAnswers
                                                , options: this.mDragOptions}));
        }
    }

    public AddGoal_MoveRight()
    {
        if(this.notPresent(eGoalType.eGoal_moveRight))
        {
            this.RemoveAllSubgoals();
            this.AddSubgoal(new Goal_MoveRight({answers: this.mDragAnswers
                                                , options: this.mDragOptions}));
        }
    }

    public AddGoal_ChangeHero()
    {
        if(this.notPresent(eGoalType.eGoal_changeHero))
        {
            this.RemoveAllSubgoals();
            this.AddSubgoal(new Goal_ChangeHero({answers: this.mDragAnswers
                                                , options: this.mDragOptions}));
        }
    }

    //--------------------------------
    private onAddSubgoal(param)
    {
        switch(param.msgData.goalType)
        {
            case eGoalType.eGoal_speedUp:
                this.AddGoal_SpeedUp();
            break;
            case eGoalType.eGoal_speedDown:
                this.AddGoal_SpeedDown();
            break;
            case eGoalType.eGoal_moveLeft:
                this.AddGoal_MoveLeft();
            break;
            case eGoalType.eGoal_moveRight:
                this.AddGoal_MoveRight();
            break;
            case eGoalType.eGoal_changeHero:
                this.AddGoal_ChangeHero();
            break;
        }
    }
}
