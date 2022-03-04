import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'react-splitter-layout/lib/index.css';

import QuestionnaireCard from "./QuestionnaireCard"

import './styles.css'

import { getQuestionnaireList } from "./SelectQuestionnaireActions";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { SELECT_QUESTIONNAIRE_MENU } from "../Common/SideBar/SideBarList";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBarHandler from "../Common/SideBar/SideBarHandler";

export default function SelectQuestionnairePage(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getQuestionnaireList(dispatch);
    }, [dispatch])

    const questionnaires = useSelector(state => state.selectQuestionnaire.questionnaires)
    const buttonStyle = {
        margin: '5px'
    }
    return (
        <div>
            <UserPermissionsWrapper permission={2} />
            <SideBarHandler page_name="Выбор анкеты" menu_type={SELECT_QUESTIONNAIRE_MENU} />
            <div style={{ marginBottom: "5px" }}>
                <div style={{ display: "inline" }}>
                    <Button
                        variant="contained"
                        style={buttonStyle}
                        onClick={() => navigate('/constructor/selectQuestionnaire/create/')}
                    >Создать анкету</Button>
                    <Button
                        variant="contained"
                        style={buttonStyle}
                        onClick={() => navigate('/constructor/selectQuestionnaire/import/')}
                    >Импорт из файла</Button>
                </div>
            </div>

            <div style={{ display: "inline" }}> {
                questionnaires.map((item, index) =>
                    <div key={index} style={{ display: 'inline-block', marginRight: 15 + "px" }}>
                        <QuestionnaireCard cardInfo={item} />
                    </div>
                )}
            </div>
        </div>
    );

}
