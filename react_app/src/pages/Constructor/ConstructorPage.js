import React, { useState, useEffect  } from "react";
import { useNavigate, useParams } from "react-router-dom";

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";

export default function ConstructorPage(props) {
  let params = useParams();

  const navigate = useNavigate()

  const [questionnaireEditingId, setQuestionnaireEditingId] = useState(-1)

  useEffect(() => {
    if (params.id === undefined && props.id === undefined)
      navigate('/')//TODO: add error page
    else if (params.id !== undefined) {
      setQuestionnaireEditingId(params.id)
    }
    else setQuestionnaireEditingId(props.id)

  }, [])


  // console.log('qId', questionnaireEditingId)

  const UnderConstruction = () => {
    let i = 0;
    var rows = [];
    for (i = 0; i < 50; i++) {
      rows.push(<span key={i} style={{ fontSize: "30px" }}>UNDER CONSTRUCTION</span>)
    }
    return rows
  }

  return (
    <>
      <UserPermissionsWrapper permission={2} />
      <SideBarHandler page_name="Конструктор анкет" width={300} menu_type={CONSTRUCTOR_MENU} />
      {
        UnderConstruction()
      }
    </>

  );
}
