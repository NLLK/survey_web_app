import {
    BROWSER_SET_QUESTIONNAIRE
} from "./BrowserReducerTypes";

const defaultState = {
    questionnaire: null
};

export const BrowserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case BROWSER_SET_QUESTIONNAIRE: {
            let fields = JSON.parse(action.payload.fields)
            return {
                ...state,
                questionnaire: {
                    ...action.payload,
                    questionList: fields
                }
            }
        }
        case "toogle":{

            return{
                ...state,
                toogle: !action.payload
            }
        }
        default:
            return state;
    }

}
