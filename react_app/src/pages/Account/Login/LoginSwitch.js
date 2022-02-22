import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LoginSwitch(props) {

  const navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.token != null)
      navigate('/account/manage')
    else navigate('/account/login')
  },[navigate])

  return (
    <></>
  );
}

export default LoginSwitch;