import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./Reducer";

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
