import React from "react";

import { useSelector } from 'react-redux'
import './styles.css'
import '../../Common/styles.css'

import SideBarHandler from "../../Common/SideBar/SideBarHandler.js"
import {BLANK_MENU} from "../../Common/SideBar/SideBarList" 
import UserPermissionsWrapper from "../../Common/UserPermissionsWrapper.js"
import SimpleCard from "./SimpleCard"

export default function ManagePage(props) {

    const user = useSelector(state => state.login.user)

    return (
        <UserPermissionsWrapper permission={1}>
            <SideBarHandler page_name = "Управление аккаунтом" menu_type = {BLANK_MENU}>
                <div>
                    <SimpleCard text="Имя пользователя: " value={user.username} />
                    <SimpleCard text="Индификационный номер???: " value={user.personnel_id} />
                    <SimpleCard text="Фамилия: " value={user.last_name} />
                    <SimpleCard text="Имя: " value={user.first_name} />
                </div>
            </SideBarHandler>
        </UserPermissionsWrapper>
    );
}