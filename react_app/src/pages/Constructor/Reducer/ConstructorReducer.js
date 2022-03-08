import { CONSTRUCTOR_SET_QUESTIONNAIRE_ID, CONSTRUCTOR_SET_QUESTIONNAIRE, CONSTRUCTOR_MODIFY_QUESTIONNAIRE } from "./ConstructorReducerTypes";

import {ModifyQuestionnaire} from './ConstructorActions'

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

            let newQ = {}
            Object.assign(newQ, state.questionnaire)

            newQ.fields = '['+action.payload+']'

            console.log('modifying',ModifyQuestionnaire(JSON.stringify(state.questionnaire), action.payload))

            return {
                ...state,
                questionnaire: newQ
            };
        }
        default:
            return state;
    }

}
