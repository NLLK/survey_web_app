import React, { Component } from "react";
import { render } from "react-dom";
import './styles.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  render() {
    return (
      <div>
        <MisteryBox width="150px" height="150px" text="any other"></MisteryBox>
      </div>
        
        
    );
  }
}

class MisteryBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : this.props.text
    };
    this.click = this.click.bind(this);
  }
  click()
  {
    this.setState((prevState) => {
      return {
        text: prevState.text === "aboba"? "bobaba": "aboba"
      };
    });
  }
  render() {
    let style =  {
      width : this.props.width,
      height: this.props.height
    }
    return (
        <div className="misteryBox" onClick={this.click} style={style}>
          <p>{this.state.text}</p>
        </div>
    );
  }
}


//export default App;

App.defaultProps = {aboba: "abobus", amoga: "amogus"}
render(<App />, document.getElementById("app"));