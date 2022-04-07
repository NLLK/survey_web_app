import {
    BROWSER_SET_QUESTIONNAIRE,
    BROWSER_CLEAR,
    BROWSER_SET_INFO,
    BROWSER_CLEARED
} from "./BrowserReducerTypes";

import {getTemplateForStorage} from "./Actions"
const defaultState = {
    questionnaire: null,
    storage: null,
    clear: null
};

export const BrowserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case BROWSER_SET_QUESTIONNAIRE: {
            let questionList = JSON.parse(action.payload.fields)
            let storageTemplate = getTemplateForStorage(questionList)
            return {
                ...state,
                questionnaire: {
                    ...action.payload,
                    questionList: questionList
                },
                storage: storageTemplate
            }
        }
        case BROWSER_CLEAR:{
            let storageTemplate = getTemplateForStorage(state.questionnaire.questionList)
            return {
                ...state,
                storage: storageTemplate,
                clear: true
            }
        }
        case BROWSER_CLEARED:{
            return {
                ...state,
                clear: false
            }
        }
        case BROWSER_SET_INFO:{
            let newState = JSON.parse(JSON.stringify(state.storage))
            newState[action.payload.id] = action.payload.data
            return {
                ...state,
                storage: newState
            }
        }
        default:
            return state;
    }

}
