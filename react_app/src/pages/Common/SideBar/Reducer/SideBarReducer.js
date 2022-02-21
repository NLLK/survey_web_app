import { BLANK_MENU } from "../SideBarList";
import { SIDEBAR_CHANGE_PAGE } from "./SideBarReducerTypes";

const defaultState = {
    page_name: "Название страницы",
    width: 240,
    menu_type: BLANK_MENU
}

export const SideBarReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SIDEBAR_CHANGE_PAGE: {
            let width = action.payload.width
            if (action.payload.width === undefined)
                width = defaultState.width

            return {
                ...state,
                page_name: action.payload.page_name,
                width: width,
                menu_type: action.payload.menu_type
            };
        }
        default:
            return state;
    }

}
