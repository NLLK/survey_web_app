import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { GetQuestionnaireById, QuestionnaireTemplate } from "../SelectQuestionnaire/QuestionnaireActions";
import DivWithCoords from "./Utils/DivWithCoords";
import ViewerButton from "./RegisterViewer/ViewerButton";
import TextBox from "./RegisterViewer/TextBox";

export default function ConstructorPage(props) {
  let params = useParams();

  const navigate = useNavigate()

  const [questionnaireEditingId, setQuestionnaireEditingId] = useState(-1)
  const [questionnaireInfo, setQuestionnaireInfo] = useState(QuestionnaireTemplate)

  useEffect(() => {
    let id = -1;
    if (params.id === undefined && props.id === undefined)
      navigate('/')//TODO: add error page
    else if (params.id !== undefined) {
      setQuestionnaireEditingId(params.id)
      id = params.id
    }
    else {
      setQuestionnaireEditingId(props.id)
      id = props.id
    }

    if (id > -1) GetQuestionnaireById(setQuestionnaireInfo, id)



  }, [])

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
      <SideBarHandler page_name={"Конструктор анкет: " + questionnaireInfo.name} width={300} menu_type={CONSTRUCTOR_MENU} />
      <div class="constructor">
        <div class="c-left-part">
          <div class="c-registerViewer" style={{overflow: "auto"}}>
            <TextBox x={30} y={20}>
                Вопрос 1
            </TextBox>
            <ViewerButton x={30} y={30}>
                +
            </ViewerButton>
          </div>
          <div class="c-registerEditor">

          </div>
        </div>
        <div class="c-registerPicker">

        </div>
      </div>
    </>

  );
}
