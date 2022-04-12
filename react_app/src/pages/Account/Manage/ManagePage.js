import { Paper, Typography } from "@mui/material";
import React from "react";

import { useSelector } from 'react-redux'

import SideBarHandler from "../../Common/SideBar/SideBarHandler.js"
import { BLANK_MENU } from "../../Common/SideBar/SideBarList"
import UserPermissionsWrapper from "../../Common/UserPermissionsWrapper.js"

export default function ManagePage(props) {

    const user = useSelector(state => state.login.user)

    return (
        <>
            <UserPermissionsWrapper permission={1} />
            <SideBarHandler page_name="Управление аккаунтом" menu_type={BLANK_MENU} />
            <div className="center" >
                <Paper sx={{padding: "40px"}}>
                    <Typography variant="h4" sx={{ marginBottom: "20px" }}>Добро пожаловать!</Typography>
                    <Typography variant="h6">Данные аккаунта:</Typography>
                    <div>
                        <Typography display="inline" variant="h6">Имя пользователя:</Typography>
                        <Typography display="inline"> {user.username}</Typography>
                    </div>
                    <div>
                        <Typography display="inline" variant="h6">Фамилия: </Typography>
                        <Typography display="inline">{user.last_name}</Typography>
                    </div>
                    <div>
                        <Typography display="inline" variant="h6">Имя: </Typography>
                        <Typography display="inline">{user.first_name}</Typography>
                    </div>
                </Paper>

            </div>
        </>

    );
}