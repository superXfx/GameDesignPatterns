
import {eConditionType, eNodeType} from "../Const_BehaviorTree";
import { eTriggerType } from "../../../../../Script/DesignPatterns/Trigger/Const_Trigger";;

let BehaviorTreeCfg = {
    thinkType: "quanzhong",
    ctrlNodes:[
        {
            nodeType: eNodeType.eOrder,
            condition: eConditionType.eChangeHero,
            childNodes: [
                {nodeType: eNodeType.eGoal_checkTriggerState, param: {triggerType: eTriggerType.eChangeHero}},
                {nodeType: eNodeType.eGoal_findEmptySolt, param: {}},
                {nodeType: eNodeType.eGoal_putTrigger, param: {triggerType: eTriggerType.eChangeHero}},
            ]
        },
        {
            nodeType: eNodeType.eOrder,
            condition: eConditionType.eMoveLeft,
            childNodes: [
                {nodeType: eNodeType.eGoal_checkTriggerState, param: {triggerType: eTriggerType.eToLeft}},
                {nodeType: eNodeType.eGoal_findEmptySolt, param: {}},
                {nodeType: eNodeType.eGoal_putTrigger, param: {triggerType: eTriggerType.eToLeft}},
            ]
        },
        {
            nodeType: eNodeType.eOrder,
            condition: eConditionType.eMoveRight,
            childNodes: [
                {nodeType: eNodeType.eGoal_checkTriggerState, param: {triggerType: eTriggerType.eToRight}},
                {nodeType: eNodeType.eGoal_findEmptySolt, param: {}},
                {nodeType: eNodeType.eGoal_putTrigger, param: {triggerType: eTriggerType.eToRight}},
            ]
        },
        {
            nodeType: eNodeType.eOrder,
            condition: eConditionType.eSpeedUp,
            childNodes: [
                {nodeType: eNodeType.eGoal_checkTriggerState, param: {triggerType: eTriggerType.eSpeedUp}},
                {nodeType: eNodeType.eGoal_findEmptySolt, param: {}},
                {nodeType: eNodeType.eGoal_putTrigger, param: {triggerType: eTriggerType.eSpeedUp}},
            ]
        },
        {
            nodeType: eNodeType.eOrder,
            condition: eConditionType.eSpeedDown,
            childNodes: [
                {nodeType: eNodeType.eGoal_checkTriggerState, param: {triggerType: eTriggerType.eSpeedDown}},
                {nodeType: eNodeType.eGoal_findEmptySolt, param: {}},
                {nodeType: eNodeType.eGoal_putTrigger, param: {triggerType: eTriggerType.eSpeedDown}},
            ]
        },
    ]
}

export default BehaviorTreeCfg;