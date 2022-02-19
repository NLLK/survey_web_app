import  { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getCurrentUser } from '../Account/Login/LoginActions'

let gotUser = false;

export default function UserPermissionsWrapper(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.login.user)
    useEffect(() => {
            getCurrentUser("", dispatch, navigate)
            if (user.permissions < props.permission)
                navigate('/account/login')
        
    },[dispatch])

    return (props.children);

}