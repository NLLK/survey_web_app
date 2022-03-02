import { combineReducers } from "redux";

import { loginReducer } from "../pages/Account/Login/LoginReducer";
import { SelectQuestionnaireReducer } from "../pages/SelectQuestionnaire/SelectQuestionnaireReducer";
import {mainReducer} from "../main/MainReducer"
import { SideBarReducer } from "../pages/Common/SideBar/Reducer/SideBarReducer";

import {DESTROY_SESSION} from './MainTypes'

const createRootReducer = combineReducers({
    login: loginReducer,
    main: mainReducer,
    selectQuestionnaire: SelectQuestionnaireReducer,
    sideBar: SideBarReducer,
  });

// Combine all reducers.
const appReducer = combineReducers({
  state: (state = {}) => state,
  login: loginReducer,
  main: mainReducer,
  selectQuestionnaire: SelectQuestionnaireReducer,
  sideBar: SideBarReducer,
});
const rootReducer = (state, action) => {   
  // Clear all data in redux store to initial.
  if(action.type === DESTROY_SESSION){
    state = undefined;
  }
     
  
  return appReducer(state, action);
};

export default rootReducer;