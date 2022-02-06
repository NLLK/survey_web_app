import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
class NotFound extends React.Component {
  render() {
    return <h2>{this.props.text}</h2>;
  }
}

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
          <Route path="/constructor" element={<NotFound text="c" />} />
          <Route path="/account" element={<NotFound text="acc" />}/>
          <Route path="/account/login" element={<NotFound text="log" />}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

render(<App app_name="App_name" />, document.getElementById("app"));