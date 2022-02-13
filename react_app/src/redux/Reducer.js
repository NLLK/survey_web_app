import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { loginReducer } from "../pages/Login/LoginReducer";


const createRootReducer = combineReducers({
    login: loginReducer,
  });

export default createRootReducer;