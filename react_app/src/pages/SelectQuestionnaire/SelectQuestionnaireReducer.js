import {SET_QUESTIONNAIRES_CARDS} from './SelectQuestionnaireTypes'

const initialState = {
    questionnaires: [],
    questionnaire: null
};

export const SelectQuestionnaireReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTIONNAIRES_CARDS:
            return {
                ...state,
                questionnaires: action.payload
            };
        default:
            return state;
    }
};