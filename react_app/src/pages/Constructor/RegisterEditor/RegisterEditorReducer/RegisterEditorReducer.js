import { REGISTER_EDITOR_SET_REGISTER } from "./RegisterEditorTypes";

const defaultState = {
    register: null,
};

export const RegisterEditorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case REGISTER_EDITOR_SET_REGISTER: {
            return {
                ...state,
                register: action.payload
            };
        }
        default:
            return state;
    }

}
