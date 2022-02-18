import React, { Component } from "react";
import './styles.css'
import SideBar from "../Common/SideBar"
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';



class ConstructorPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.defaultProps={app_name: "App_name"};
    }
    render() {
      return (
        <div>
          <div className="constructor">
            <div className="c-menu">
              <SideBar app_name={this.props.app_name} />
            </div>
            <div className="c-main">
              <SplitterLayout percentage={true} primaryMinSize={75}>
                <div className="c-viewerAndAnswerField"> 
                  <SplitterLayout vertical={true} percentage={true} primaryMinSize={66}>
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
  
  
export default ConstructorPage;
