import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ConstructorPage from "./pages/Constructor/ConstructorPage"
import LoginPage from "./pages/Login/LoginPage"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/constructor" element={<ConstructorPage/>} />
          <Route path="/account" element={<h1>acc</h1>}/>
          <Route path="/account/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
