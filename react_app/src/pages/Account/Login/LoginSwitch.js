import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from "./LoginPage"
import { useSelector, useDispatch } from 'react-redux'
import ManagePage from "../Manage/ManagePage"
function LoginSwitch(props) {

  return (
    <React.StrictMode>{
      localStorage.token !== null ?
        <ManagePage />
        :
        <LoginPage />
    }
    </React.StrictMode>
  );
}


export default LoginSwitch;