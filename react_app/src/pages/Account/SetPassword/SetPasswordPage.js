import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";



function SetPasswordPage() {
    const navigate = useNavigate()

    const [usernameError, setUsernameError] = useState(false)
    const [usernameHelperText, setUsernameHelperText] = useState("")
    const [passwordConfirmError, setpasswordConfirmError] = useState(false)
    const [passwordConfirmHelperText, setpasswordConfirmHelperText] = useState("")

    const onSetPasswordClick = () => {
        console.log("SetPassword button clicked")

        const userData = {
            username: document.getElementById("username_field").value,
            password: document.getElementById("password_field").value,
        };

        let redirectTo = "/account/login"
        axios
            .post("/api/auth/setPassword/", userData)
            .then(response => {
                navigate(redirectTo)
            })
            .catch(error => {
                let response = error.response.data
                if (response['Error'] !== undefined)
                    if (response['Error'] == 'Error') {
                        setUsernameError(true)
                        setUsernameHelperText("Данный пользователь не существует!")
                    }
                    else
                        console.log("шота другое")
            });
    };

    const checkPasswordConfirm = () => {
        const data = {
            password: document.getElementById("password_field").value,
            passwordRepeat: document.getElementById("password_repeat_field").value
        };

        if (data.password !== data.passwordRepeat){
            setpasswordConfirmError(true)
            setpasswordConfirmHelperText("Пароли не совпадают!") 
        }
        else {
            setpasswordConfirmError(false)
            setpasswordConfirmHelperText("") 
        }
    }

    return (
        <form className="center">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <h1>Сброс пароля:</h1>
                <TextField
                    id="username_field"
                    label="Имя пользователя"
                    variant="standard"
                    type="text"
                    error={usernameError}
                    helperText={usernameHelperText === "" ? "" : usernameHelperText}
                    onChange={() => {
                        setUsernameError(false)
                        setUsernameHelperText("")
                    }}
                />
                <TextField
                    id="password_field"
                    label="Пароль"
                    variant="standard"
                    type="password"
                />
                <TextField
                    id="password_repeat_field"
                    label="Повторите пароль"
                    variant="standard"
                    type="password"
                    error={passwordConfirmError}
                    helperText={passwordConfirmHelperText === "" ? "" : passwordConfirmHelperText}
                    onChange={checkPasswordConfirm}
                />
                {/*Добавить проверку одинаковости паролей*/}

                <Button variant="contained" onClick={onSetPasswordClick}>Сброс</Button>
            </Stack>

        </form>

    );
}

export default SetPasswordPage;