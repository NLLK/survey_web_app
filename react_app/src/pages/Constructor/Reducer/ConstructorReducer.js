import { CONSTRUCTOR_SET_QUESTIONNAIRE } from "./ConstructorReducerTypes";

const defaultState = {
    working_on_id: -1,
};

export const ConstructorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CONSTRUCTOR_SET_QUESTIONNAIRE: {
            return {
                ...state,
                working_on_id: action.payload
            };
        }
        default:
            return state;
    }

}
