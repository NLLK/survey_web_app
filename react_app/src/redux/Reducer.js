import { combineReducers } from "redux";

import { loginReducer } from "../pages/Account/Login/LoginReducer";
import { SelectQuestionnaireReducer } from "../pages/SelectQuestionnaire/SelectQuestionnaireReducer";


const defaultState ={
  app_name: "App_name"
}

const mainReducer = (state = defaultState, action) =>
{
  return state;
}

const createRootReducer = combineReducers({
    login: loginReducer,
    main: mainReducer,
    selectQuestionnaire: SelectQuestionnaireReducer,
  });

export default createRootReducer;