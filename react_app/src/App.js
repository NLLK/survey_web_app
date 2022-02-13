import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import axios from "axios";

import ConstructorPage from "./pages/Constructor/ConstructorPage"
import LoginPage from "./pages/Account/Login/LoginPage"
import LoginSwitch from "./pages/Account/Login/LoginSwitch"
import Root from "./redux/Root"

axios.defaults.baseURL = "http://localhost:8000";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <React.StrictMode>
        <Root>
          <BrowserRouter>
            <Routes>
              <Route path="/constructor" element={<ConstructorPage />} />
              <Route exact path="/account/manage" element={<h1>acc</h1>} />
              <Route path="/account/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </Root>
      </React.StrictMode>
    );
  }
}

export default App;
