import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";

import rootReducer from "./Reducer";
import { setCurrentUser, setToken } from "../pages/Account/Login/LoginActions";
import { isEmpty } from "../utils/Utils";

import { composeWithDevTools } from 'redux-devtools-extension';

const Root = ({ children}) => {
  const store = createStore(
    rootReducer,
    composeWithDevTools()

  );
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Root;
