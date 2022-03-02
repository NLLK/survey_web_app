import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getCurrentUser } from '../Account/Login/LoginActions'

export default function UserPermissionsWrapper(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.login.user)
    const token = useSelector(state => state.login.token)

    useEffect(() => {
        console.log('wrapper')
        getCurrentUser("", dispatch, navigate)
        console.log(user.permissions, props.permission, token)
        if (user.permissions < props.permission)
            navigate('/account/login')

    }, [dispatch, navigate, props.permission, user.permissions, token])

    return (<></>);//props.children

}