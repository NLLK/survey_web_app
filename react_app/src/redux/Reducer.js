import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { loginReducer } from "../pages/Account/Login/LoginReducer";


const defaultState ={
  app_name: "App_name"
}

const mainReducer = (state = defaultState, action) =>
{
  return state;
}

const createRootReducer = combineReducers({
    login: loginReducer,
    main: mainReducer
  });

export default createRootReducer;