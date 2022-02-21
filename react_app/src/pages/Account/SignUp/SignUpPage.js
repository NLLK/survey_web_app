import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordFields from "../../Common/PasswordFields";
import ButtonEnter from "../../Common/ButtonEnter";

function SignUpPage() {
    const navigate = useNavigate()

    const [usernameError, setUsernameError] = useState(false)
    const [usernameHelperText, setUsernameHelperText] = useState("")

    const onSignUpClick = () => {
        console.log("SignUp button clicked")

        const userData = {
            username: document.getElementById("username_field").value,
            password: document.getElementById("password_field").value,
            last_name: document.getElementById("last_name_field").value,
            first_name: document.getElementById("first_name_field").value,
            personnel_id: document.getElementById("personnel_id_field").value
        };

        //let response = signUp(userData,"/account/login", navigate)

        let redirectTo = "/account/login"
        axios
            .post("/api/auth/signUp/", userData)
            .then(response => {
                navigate(redirectTo)
            })
            .catch(error => {
                let response = error.response.data
                if (response['username'] !== undefined)
                    if (response['username'] === 'A user with that username already exists.') {
                        setUsernameError(true)
                        setUsernameHelperText("Данный пользователь уже существует!")
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
                <h1>Регистрация:</h1>
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
                <ButtonEnter action={onSignUpClick}>
                    <Button variant="contained" onClick={onSignUpClick}>Регистрация</Button>
                </ButtonEnter>

                <p>Уже есть аккаунт?</p>
                <Button variant="contained" onClick={() => { navigate("/account/login") }}>Войти</Button>
            </Stack>

        </form>

    );
}

export default SignUpPage;