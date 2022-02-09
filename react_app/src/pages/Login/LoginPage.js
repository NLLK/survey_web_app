import { Component, useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import './styles.css'

export default function LoginPage() {

    const handleSubmit = (event) => {
        event.preventDefault();
        var login = document.getElementById("username_field").value;
        var password = document.getElementById("password_field").value;
        console.log(login, password);
    };

    return (
        <form className="center" onSubmit={handleSubmit}>
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
                <Button variant="contained" type="submit">Войти</Button>
            </Stack>

        </form>

    );

}