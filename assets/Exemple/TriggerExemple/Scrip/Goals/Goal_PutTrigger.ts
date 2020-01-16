
import Goal from "./Goal";
import { eAIState, eGoalType } from "../../../../Script/Const_All";
import { eTriggerType } from "../../../../Script/DesignPatterns/Trigger/Const_Trigger";
import AnswerCtrl from "../Drag/Ctrl/AnswerCtrl_Drag";
import OptionCtrl from "../Drag/Ctrl/OptionCtrl_Drag";
import { eOptionState } from "../Drag/Const_State_Drag";
import CommonUtils from "../../../../Script/commonUtils";

const SPEED = 500;

export default class Goal_PutTrigger extends Goal
{
    private mAnswerCtrl: AnswerCtrl = null;
    private mOptionCtrl: OptionCtrl = null;

    public constructor(owner)
    {
        super(owner, eGoalType.eGoal_putTrigger);
    }

    public Enter()
    {
        this.mState = eAIState.eActive;
        
        for(let i = 0; i < this.mParam.options.length; i++)
        {
            if(this.mParam.options[i].mTriggerType === this.mParam.triggerType)
            {
                this.mOptionCtrl = this.mParam.options[i];
                break;
            }
        }

        for(let i = 0; i < this.mParam.answers.length; i++)
        {
            if(this.mParam.answers[i].isfilled() === false)
            {
                this.mAnswerCtrl = this.mParam.answers[i];
                break;
            }
        }

        if(this.mAnswerCtrl)
        {
            this.mOptionCtrl.changeState(eOptionState.eLock);
            this.mOptionCtrl.node.runAction(cc.sequence(cc.moveTo(CommonUtils.getInstance().getPointDistance(this.mOptionCtrl.node.position
                                                                                                            , this.mAnswerCtrl.node.position)
                                                                                                            /SPEED
                                                                , this.mAnswerCtrl.node.position)
                                                        , cc.callFunc(function()
                                                                                {
                                                                                    this.mAnswerCtrl.fillTrigger(this.mParam.triggerType);
                                                                                    this.mState = eAIState.eCompleted;
                                                                                    this.mOptionCtrl.changeState(eOptionState.eInit);
                                                                                }.bind(this) )));
        }
        else
        {
            this.mState = eAIState.eFailed;
        }
    }

    public Process(dt)
    {
        this. ActivateIfInactive();

        return this.mState;
    }

    public Exit()
    {
        if(this.mOptionCtrl)
        {
            this.mOptionCtrl.changeState(eOptionState.eInit);
        }
    }
}
