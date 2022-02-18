import React from "react";
import LoginPage from "./LoginPage"
import ManagePage from "../Manage/ManagePage"
function LoginSwitch(props) {

  return (
    <React.StrictMode>{
      localStorage.token != null ?
        <ManagePage />
        :
        <LoginPage />
    }
    </React.StrictMode>
  );
}


export default LoginSwitch;