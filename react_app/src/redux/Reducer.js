import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

//import { signupReducer } from "../components/signup/SignupReducer";
import { loginReducer } from "../pages/Login/LoginReducer";



const defaultState = {
  cash: 0,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CASH":
      return {
        ...state,
        cash: state.cash + action.payload
      };
    case "GET_CASH":
      return {
        ...state,
        cash: state.cash - action.payload
      }

    default:
      return state
  }
}


const createRootReducer = combineReducers({
    login: loginReducer,
    test: reducer
  });

export default createRootReducer;