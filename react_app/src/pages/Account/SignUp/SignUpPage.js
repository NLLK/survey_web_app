import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {signUp} from './SignUpActions'

function SignUpPage() {
    const navigate = useNavigate()

    const onSignUpClick = () => {
        console.log("SignUp button clicked")
        const userData = {
            username: document.getElementById("username_field").value,
            password: document.getElementById("password_field").value,
            last_name: document.getElementById("last_name_field").value,
            first_name: document.getElementById("first_name_field").value,
            personnel_id: document.getElementById("personnel_id_field").value
        };

        signUp(userData,"/account/login", navigate)
    };

    return (
        <form className="center">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <h1>Регистрация:</h1>
                <TextField
                    id="username_field"
                    label="Имя пользователя"
                    variant="standard"
                    type="text"
                />
                <TextField
                    id="password_field"
                    label="Пароль"
                    variant="standard"
                    type="password"
                />
                <TextField
                    id="password_field_repeat"
                    label="Повторите пароль"
                    variant="standard"
                    type="password"
                />
                {/*Добавить проверку одинаковости паролей*/}
                <TextField
                    id="last_name_field"
                    label="Фамилия"
                    variant="standard"
                    type="text"
                />
                <TextField
                    id="first_name_field"
                    label="Имя (Отчетсво по желанию)"
                    variant="standard"
                    type="text"
                />
                <TextField
                    id="personnel_id_field"
                    label="Личный номер ???(не обязательно)"
                    variant="standard"
                    type="text"
                />
                <Button variant="contained" onClick={onSignUpClick}>Войти</Button>
            </Stack>

        </form>

    );
}

export default SignUpPage;