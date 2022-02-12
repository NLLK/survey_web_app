import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import './styles.css'
import { login } from "./LoginActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "./withRouter";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    onLoginClick = () => {
        const userData = {
            username: document.getElementById("username_field").value,
            password: document.getElementById("password_field").value
        };
        this.props.login(userData, "/account");
        console.log(userData)
    };
    render() {
        return (
            <form className="center">
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <h1>Вход в аккаунт</h1>
                    <TextField
                        id="username_field"
                        label="Имя пользователя / ИН"
                        variant="standard"
                        type="text"
                    />
                    <TextField
                        id="password_field"
                        label="Пароль"
                        variant="standard"
                        type="password"
                    />
                    <Button variant="contained" onClick={this.onLoginClick}>Войти</Button>
                </Stack>

            </form>

        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {login})(withRouter(LoginPage));