import {
CONSTRUCTOR_SET_QUESTIONNAIRE_ID,
CONSTRUCTOR_SET_QUESTIONNAIRE,
CONSTRUCTOR_MODIFY_QUESTIONNAIRE,
CONSTRUCTOR_ADD_BLANK_QUESTION,
CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION,
CONSTRUCTOR_TOOGLE_SHOW_ADD_BUTTONS,
CONSTRUCTOR_REQUEST_SAVING,
CONSTRUCTOR_SAVING_COMPLETE,
CONSTRUCTOR_ADD_WITH_TEMPLATE
} from "./ConstructorReducerTypes";

import { REGISTER_EDITOR_SET_REGISTER_ID } from "./RegisterEditorTypes";

import { ModifyQuestionnaire, AddQuestion, AddParentQuestion, FindRegisterById, FindRegisterByIdNext, AddWithTemplate } from './ConstructorActions'

const defaultState = {
    working_on_id: -1,
    questionnaire: null,
    register: null,
    register_id: null,
    showAddButtons: false,
    saving: false
};

export const ConstructorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CONSTRUCTOR_SET_QUESTIONNAIRE_ID: {
            return {
                ...state,
                working_on_id: action.payload,
                showAddButtons: true
            };
        }
        case CONSTRUCTOR_SET_QUESTIONNAIRE: {
            console.log('setting q', action.payload)
            return {
                ...state,
                questionnaire: action.payload,
                showAddButtons: true,
                register: null,
                register_id: null,
            };
        }
        case CONSTRUCTOR_MODIFY_QUESTIONNAIRE: {

            let newQ = ModifyQuestionnaire(state.questionnaire, action.payload)
            console.log("newQ", newQ)

            let newReg = action.payload
            return {
                ...state,
                register: newReg,
                questionnaire: newQ
            };
        }
        case CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION: {
            let newQ = AddParentQuestion(JSON.stringify(state.questionnaire))

            let lastParent = newQ.questionList[newQ.questionList.length - 1]


            console.log('newQ', newQ)
            return {
                ...state,
                register_id: lastParent.id.string,
                register: lastParent,
                questionnaire: newQ
            };
        }
        case CONSTRUCTOR_ADD_BLANK_QUESTION: {
            let newQ = AddQuestion(JSON.stringify(state.questionnaire), action.payload)
            console.log('newQ', newQ)
            let lastParent = FindRegisterByIdNext(newQ, action.payload)

            return {
                ...state,
                register: lastParent,
                register_id: lastParent.id.string,
                questionnaire: newQ
            };
        }
        case CONSTRUCTOR_TOOGLE_SHOW_ADD_BUTTONS: {
            let newShowAddButtons = false;
            if (!state.showAddButtons)
                newShowAddButtons = true;

            return {
                ...state,  
                showAddButtons: newShowAddButtons
            };
        }
        //TODO: новое для отчета
        case CONSTRUCTOR_REQUEST_SAVING: {
            return{
                ...state,
                saving: true
            }
        }
        case CONSTRUCTOR_SAVING_COMPLETE: {
            return{
                ...state,
                saving: false
            }
        }
        case CONSTRUCTOR_ADD_WITH_TEMPLATE: {
            let newQ = AddWithTemplate(state.questionnaire, action.payload, state.register)
            return{
                ...state,
                questionnaire: newQ
            }
        }
    }
    switch (action.type) {
        case REGISTER_EDITOR_SET_REGISTER_ID: {

            let register = FindRegisterById(state.questionnaire, action.payload)

            return {
                ...state,
                register: register,
                register_id: action.payload
            };
        }
        default:
            return state;
    }

}
