import {
    BROWSER_SET_QUESTIONNAIRE,
    BROWSER_CLEAR,
    BROWSER_CLEARED
} from "./BrowserReducerTypes";

const defaultState = {
    questionnaire: null,
    clear: null
};

export const BrowserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case BROWSER_SET_QUESTIONNAIRE: {
            let questionList
            questionList = JSON.parse(action.payload.fields)

            return {
                ...state,
                questionnaire: {
                    ...action.payload,
                    questionList: questionList
                },
            }
        }
        case BROWSER_CLEAR:{
            return {
                ...state,
                clear: true
            }
        }
        case BROWSER_CLEARED:{
            return {
                ...state,
                clear: false
            }
        }
        default:
            return state;
    }

}
