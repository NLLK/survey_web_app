import React from "react";

import { useSelector} from 'react-redux'
import './styles.css'
import '../../Common/styles.css'

import SideBar from "../../Common/SideBar.js"
import UserPermissionsWrapper from "../../Common/UserPermissionsWrapper.js"
import SimpleCard from "./SimpleCard"

export default function ManagePage(props) {

    const user = useSelector(state => state.login.user)
    
    return (
        <UserPermissionsWrapper permission={1}>
            <div className="manage">
                <div className="m-menu">
                    <SideBar />
                </div>
                <div className="m-main upper-center">
                    <SimpleCard text="Имя пользователя: " value={user.username}/>
                    <SimpleCard text="Индификационный номер???: " value={user.personnel_id}/>
                    <SimpleCard text="Фамилия: " value={user.last_name}/>
                    <SimpleCard text="Имя: " value={user.first_name}/>
                </div>

            </div>
        </UserPermissionsWrapper>
    );
}