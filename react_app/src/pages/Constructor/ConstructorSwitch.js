import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function ConstructorSwitch(props) {

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