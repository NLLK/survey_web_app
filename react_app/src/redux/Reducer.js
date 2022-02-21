import { combineReducers } from "redux";

import { loginReducer } from "../pages/Account/Login/LoginReducer";
import { SelectQuestionnaireReducer } from "../pages/SelectQuestionnaire/SelectQuestionnaireReducer";
import {mainReducer} from "../main/MainReducer"
import { SideBarReducer } from "../pages/Common/SideBar/Reducer/SideBarReducer";

const createRootReducer = combineReducers({
    login: loginReducer,
    main: mainReducer,
    selectQuestionnaire: SelectQuestionnaireReducer,
    sideBar: SideBarReducer,
  });

export default createRootReducer;