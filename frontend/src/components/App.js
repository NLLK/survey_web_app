import React, { Component } from "react";
import { render } from "react-dom";
import './styles.css'
import SideBar from "./SideBar"
import { } from '@mui/material/styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <div className="constructor">
          <div className="c-menu">
            <SideBar app_name={this.props.app_name}/>
          </div>
          <div className="c-registerEditor" style={{ backgroundColor: "#bebebe" }}></div>
          <div className="c-registerViewer" style={{ backgroundColor: "#bebeb1" }}></div>
          <div className="c-answerEditor" style={{ backgroundColor: "#bebeeb" }}></div>

        </div>
      </div>
    );
  }
}


export default App;

render(<App app_name="App_name" />, document.getElementById("app"));