import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import ConstructorPage from "./ConstructorPage";
import SelectQuestionnairePage from "../SelectQuestionnaire/SelectQuestionnairePage";

export default function ConstructorSwitch(props) {

  const working_on_id = useSelector(state => state.constructor.working_on_id)

  const navigate = useNavigate()
  useEffect(()=>{

  },[navigate])

  if (working_on_id >0)
    return (<ConstructorPage id = {working_on_id}/>);
  else return (<SelectQuestionnairePage/>)
}