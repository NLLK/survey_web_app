import React, { Component, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import './styles.css'
import '../../Common/styles.css'
import { getCurrentUser } from '../Login/LoginActions'

import SideBar from "../../Common/SideBar.js"
import SimpleCard from "./SimpleCard"

let gotUser = false;
function LoginPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (gotUser == false) {
            getCurrentUser("", dispatch, navigate)
            gotUser = true
        }

    })

    const user = useSelector(state => state.login.user)
    
    return (
        <div>
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
        </div>
    );
}

export default LoginPage;