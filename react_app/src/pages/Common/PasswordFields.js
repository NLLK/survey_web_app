import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";

function PasswordFields(props) {

    const [passwordConfirmError, setpasswordConfirmError] = useState(false)
    const [passwordConfirmHelperText, setpasswordConfirmHelperText] = useState("")


    const checkPasswordConfirm = () => {
        const data = {
            password: document.getElementById("password_field").value,
            passwordRepeat: document.getElementById("password_repeat_field").value
        };

        if (data.password !== data.passwordRepeat) {
            setpasswordConfirmError(true)
            setpasswordConfirmHelperText("Пароли не совпадают!")
        }
        else {
            setpasswordConfirmError(false)
            setpasswordConfirmHelperText("")
        }
    }
    let style = props.styles
    return (
        <Stack direction={style.direction}
            justifyContent={style.justifyContent}
            alignItems={style.alignItems}
            spacing={style.spacing}
        >
            <TextField
                id="password_field"
                label="Пароль"
                variant="standard"
                type="password"
                onChange={checkPasswordConfirm}
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
        </Stack>
    )

}

export default PasswordFields;