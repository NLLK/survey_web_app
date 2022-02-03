import React, { Component } from "react";
import { render } from "react-dom";
import './styles.css'
import SideBar from "./SideBar"
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';


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
            <SideBar app_name={this.props.app_name} />
          </div>
          <div className="c-main">
            <SplitterLayout>
              <div className="c-viewerAndAnswerField"> 
                <SplitterLayout vertical={true}>
                  <div>Pane 1</div>
                  <div>Pane 2</div>
                </SplitterLayout>
              </div>

              <div className="c-registerEditorField">Pane3</div>
            </SplitterLayout>

          </div>

        </div>

      </div>
    );
  }
}


export default App;

render(<App app_name="App_name" />, document.getElementById("app"));