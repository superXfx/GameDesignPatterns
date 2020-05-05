
import Goal_Composite from "./Goal_Composite";
import Goal_SelectCtrl from "./CtrlNode/Goal_SelectCtrl";

import AnswerCtrl from "../Drag/Ctrl/AnswerCtrl_Drag";
import OptionCtrl from "../Drag/Ctrl/OptionCtrl_Drag";

import CocosMessageMgr from "../../../../Script/DesignPatterns/Monitor/CocosMessageMgr";
import * as Const_Msg_Monitor from "../../../../Script/DesignPatterns/Monitor/Const_Msg_Monitor";

import BehaviorTreeCfg from "./Config/BehaviorTreeCfg"
import { eAIState, eNodeType} from "./Const_BehaviorTree";

export default class Goal_Think extends Goal_SelectCtrl
{
    private mGameNode: cc.Node;
    private mDragAnswers: Array<AnswerCtrl>;
    private mDragOptions: Array<OptionCtrl>;
    
    constructor(param)
    {
        super(param);
        
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

        this.mParam.answers = this.mDragAnswers;
        this.mParam.options = this.mDragOptions;
    }

    public Enter()
    {
        this.mState = eAIState.eActive;
        
        this.RemoveAllSubgoals();
        this.passCfg(BehaviorTreeCfg);
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
}
