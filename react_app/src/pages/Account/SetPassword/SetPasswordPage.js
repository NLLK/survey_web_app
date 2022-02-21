import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordFields from "../../Common/PasswordFields";
import ButtonEnter from "../../Common/ButtonEnter";

function SetPasswordPage() {
    const navigate = useNavigate()

    const [usernameError, setUsernameError] = useState(false)
    const [usernameHelperText, setUsernameHelperText] = useState("")

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
                    if (response['Error'] === 'Error') {
                        setUsernameError(true)
                        setUsernameHelperText("Данный пользователь не существует!")
                    }
                    else
                        console.log("шота другое")
            });
    };

    let props = {
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        spacing: 2
    }

    return (
        <form className="center">
            <Stack direction={props.direction}
                justifyContent={props.justifyContent}
                alignItems={props.alignItems}
                spacing={props.spacing}
            >
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
                <PasswordFields styles={props} />
                <ButtonEnter action={onSetPasswordClick}>
                    <Button variant="contained" onClick={onSetPasswordClick}>Сброс</Button>
                </ButtonEnter>

                <p>Вспомнили пароль?</p>
                <Button variant="contained" onClick={() => { navigate("/account/login") }}>Вход в аккаунт</Button>

            </Stack>

        </form>

    );
}

export default SetPasswordPage;