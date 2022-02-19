import React from "react";
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
import SignUpPage from "./pages/Account/SignUp/SignUpPage";
import SetPasswordPage from "./pages/Account/SetPassword/SetPasswordPage"
import ManagePage from "./pages/Account/Manage/ManagePage"
import SelectQuestionnairePage from "./pages/SelectQuestionnaire/SelectQuestionnairePage"

axios.defaults.baseURL = "http://localhost:8000";
function App() {

  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginSwitch />} />
          <Route path="/account">
            <Route path="manage" element={<ManagePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="setPassword" element={<SetPasswordPage />} />
          </Route>
          <Route path="/constructor" element={<ConstructorPage />} />
          <Route path="/selectQuestionnaire" element={<SelectQuestionnairePage/>} />
        </Routes>
      </BrowserRouter>
    </Root>
  );
}

export default App;
