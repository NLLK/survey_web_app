import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import './styles.css'
import { login } from "./LoginActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "./withRouter";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

function LoginPage() {
    const dispatch = useDispatch()
    const state = {
        username: "",
        password: ""
    };

    const onLoginClick = () => {
        console.log("Login button clicked")
        const userData = {
            username: document.getElementById("username_field").value,
            password: document.getElementById("password_field").value
        };

        login(userData, "/acccount", dispatch)

        console.log(userData)
    };

    const user = useSelector(state => state.login.user)

    return (
        <form className="center">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <h1>Вход в аккаунт: {user.username}</h1>
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
                <Button variant="contained" onClick={onLoginClick}>Войти</Button>
            </Stack>

        </form>

    );
}


// LoginPage.propTypes = {
//     login: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default withRouter(connect(mapStateToProps, { login })(LoginPage));
//export default withRouter(connect(mapStateToProps)(EggComponent));
export default LoginPage;