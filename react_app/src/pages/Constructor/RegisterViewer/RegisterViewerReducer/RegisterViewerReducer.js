import {  } from "./RegisterViewerTypes";

const defaultState = {
    working_on_id: -1,
};

export const RegisterViewerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ф': {
            return {
                ...state,
                working_on_id: action.payload
            };
        }
        default:
            return state;
    }

}
