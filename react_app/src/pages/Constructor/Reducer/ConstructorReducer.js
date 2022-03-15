import 
{
    CONSTRUCTOR_SET_QUESTIONNAIRE_ID, 
    CONSTRUCTOR_SET_QUESTIONNAIRE, 
    CONSTRUCTOR_MODIFY_QUESTIONNAIRE, 
    CONSTRUCTOR_ADD_BLANK_QUESTION,
    CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION } from "./ConstructorReducerTypes";

import {ModifyQuestionnaire, AddQuestion, AddParentQuestion} from './ConstructorActions'

const defaultState = {
    working_on_id: -1,
    questionnaire: null
};

export const ConstructorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CONSTRUCTOR_SET_QUESTIONNAIRE_ID: {
            return {
                ...state,
                working_on_id: action.payload
            };
        }
        case CONSTRUCTOR_SET_QUESTIONNAIRE: {
            console.log('setting q', action.payload)
            return {
                ...state,
                questionnaire: action.payload
            };
        }
        case CONSTRUCTOR_MODIFY_QUESTIONNAIRE: {

            let newQ = ModifyQuestionnaire(JSON.stringify(state.questionnaire), action.payload)
            console.log("newQ", newQ)
            return {
                ...state,
                questionnaire: newQ
            };
        }
        case CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION: {
            let newQ = AddParentQuestion(JSON.stringify(state.questionnaire))
            console.log('newQ', newQ)
            return {
                ...state,
                questionnaire: newQ
            };
        }
        case CONSTRUCTOR_ADD_BLANK_QUESTION: {
            let newQ = AddQuestion(JSON.stringify(state.questionnaire), action.payload)
            console.log('newQ', newQ)
            return {
                ...state,
                questionnaire: newQ
            };
        }
        default:
            return state;
    }

}
