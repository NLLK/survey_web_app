import React, { Component } from "react";
import { render } from "react-dom";
import './styles.css'
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: "300px",
  paddingBlockEnd: "5px"
}));
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
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
        <MisteryBox width="150px" height="150px" text="any other"></MisteryBox>
      </div>


    );
  }
}

class MisteryBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
    this.click = this.click.bind(this);
  }
  click() {
    this.setState((prevState) => {
      return {
        text: prevState.text === "aboba" ? "bobaba" : "aboba"
      };
    });
  }
  render() {
    let style = {
      width: this.props.width,
      height: this.props.height
    }
    return (
      <div className="misteryBox" onClick={this.click} style={style}>
        <p>{this.state.text}</p>
      </div>
    );
  }
}


export default App;

App.defaultProps = { aboba: "abobus", amoga: "amogus" }
render(<App />, document.getElementById("app"));