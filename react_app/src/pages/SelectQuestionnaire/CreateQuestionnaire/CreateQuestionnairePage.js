import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'react-splitter-layout/lib/index.css';


import UserPermissionsWrapper from "../../Common/UserPermissionsWrapper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";

import SideBar from "../../Common/SideBar";
import { BLANK_MENU } from "../../Common/SideBarList";

import "../../Common/styles.css";

export default function CreateQuestionnairePage() {


    const buttonStyle = {
        marginRight: '5px'
    }

    return (
        <UserPermissionsWrapper permission={2}>
            <SideBar name="Создать анкету" menu_type={BLANK_MENU}>
                <div className="center">

                    <Stack direction="column" justifyContent="center" spacing={2}>
                        <h1>Создание анкеты: </h1>
                        <TextField
                            id="username_field"
                            label="Название анкеты: "
                            type="text"
                        />
                        <TextField
                            id="password_field"
                            label="Описание: "
                            multiline
                        />
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button variant="outlined" style={buttonStyle}>Отмена</Button>
                            <Button variant="contained" style={buttonStyle}>Создать</Button>
                        </Stack>
                    </Stack>
                </div>

            </SideBar>
        </UserPermissionsWrapper>
    );
}