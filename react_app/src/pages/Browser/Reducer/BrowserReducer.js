import {
    BROWSER_SET_QUESTIONNAIRE
} from "./BrowserReducerTypes";

const defaultState = {
    questionnaire: null
};

export const BrowserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case BROWSER_SET_QUESTIONNAIRE:{
            return {
                ...state,
                questionnaire: action.payload
            }
        }
        default:
            return state;
    }

}
