import React, {useState} from "react";
import axios from "axios";

import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import '../../Common/styles.css'
import { setToken, getCurrentUser, unsetCurrentUser } from "./LoginActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import ButtonEnter from "../../Common/ButtonEnter";

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginError, setLoginError] = useState(false)
    const [loginHelperText, setLoginHelperText] = useState("")

    const [passwordError, setPasswordError] = useState(false)
    const [passwordHelperText, setPasswordHelperText] = useState("")

    const login = (userData, redirectTo, dispatch, navigate) => {
        axios
            .post("/api/auth/api-token-auth/", userData)
            .then(response => {
                const auth_token = response.data.token;
                setToken(auth_token, dispatch)
                if (localStorage.last_page)
                    redirectTo = localStorage.last_page;
                getCurrentUser(redirectTo, dispatch, navigate);
            })
            .catch(error => {
                //unsetCurrentUser(dispatch);
                let response = error.response.data
                console.log(response)

                const wrongPasswordError = "Unable to log in with provided credentials."
                const blankError = "This field may not be blank."
                const blankAnswerText = "Поле не может быть пустым!"

                if (response['non_field_errors'] !== undefined) {
                    if (response['non_field_errors'][0] === wrongPasswordError) {
                        setLoginError(true)
                        setPasswordError(true)
                        setPasswordHelperText("Неверные имя пользователя/пароль!")
                    }
                }
                if (response['username'] !== undefined) {
                    if (response['username'][0] === blankError) {
                        setLoginError(true)
                        setLoginHelperText(blankAnswerText)
                    }
                }
                if (response['password'] !== undefined) {
                    if (response['password'][0] === blankError) {
                        setPasswordError(true)
                        setPasswordHelperText(blankAnswerText)
                    }
                }
            });
    };


    const onLoginClick = () => {
        console.log("Login button clicked")
        const userData = {
            username: document.getElementById("username_field").value,
            password: document.getElementById("password_field").value
        };

        login(userData, "/account/manage", dispatch, navigate)
    };

    return (
        <form className="center">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <h1>Вход в аккаунт:</h1>
                <TextField
                    id="username_field"
                    label="Имя пользователя"
                    variant="standard"
                    type="text"
                    error={loginError}
                    helperText={loginHelperText === "" ? "" : loginHelperText}
                    onChange={() => {
                        setPasswordError(false)
                        setLoginError(false)
                        setPasswordHelperText("")
                    }}

                    sx={{width: 221}}
                />
                <TextField
                    id="password_field"
                    label="Пароль"
                    variant="standard"
                    type="password"

                    error={passwordError}
                    helperText={passwordHelperText === "" ? "" : passwordHelperText}
                    onChange={() => {
                        setPasswordError(false)
                        setLoginError(false)
                        setPasswordHelperText("")
                    }}

                    sx={{width: 221}}

                />
                <ButtonEnter action={onLoginClick}>
                    <Button variant="contained" onClick={onLoginClick}>Войти</Button>
                </ButtonEnter>
                <p>Забыли пароль?</p>
                <Button variant="contained" onClick={() => { navigate("/account/setPassword") }}>Сброс пароля</Button>
                <p>Нет аккаунта?</p>
                <Button variant="contained" onClick={() => { navigate("/account/signUp") }}>Зарегистрироваться</Button>

            </Stack>

        </form>

    );
}

export default LoginPage;