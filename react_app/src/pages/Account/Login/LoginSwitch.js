import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from "./LoginPage"

class LoginSwitch extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    render() {
      return (
        <React.StrictMode>
            <BrowserRouter>
              <Routes>
                  {

                  }
                <Route path="/account/login" element={<LoginPage />} />
              </Routes>
            </BrowserRouter>
        </React.StrictMode>
      );
    }
  }
  
  export default LoginSwitch;