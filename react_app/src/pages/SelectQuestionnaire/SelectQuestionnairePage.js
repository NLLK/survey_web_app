import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'react-splitter-layout/lib/index.css';

import SideBar from "../Common/SideBar"
import QuestionnaireCard from "./QuestionnaireCard"

import './styles.css'

import { getQuestionnaireList } from "./SelectQuestionnaireActions";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { SELECT_QUESTIONNAIRE_MENU } from "../Common/SideBarList";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
            <UserPermissionsWrapper permission={2}>
                <SideBar name="Выбор анкеты" menu_type={SELECT_QUESTIONNAIRE_MENU}>
                    <div style={{ marginBottom: "5px" }}>
                        <div style={{ display: "inline" }}>
                            <Button
                                variant="contained"
                                style={buttonStyle}
                                onClick={() => navigate('create')}
                            > Создать анкету</Button>
                            <Button
                                variant="contained"
                                style={buttonStyle}
                                onClick={() => navigate('import')}
                            >Импорт из файла</Button>
                        </div>
                    </div>
                    <div style={{ display: "inline" }}> {
                        questionnaires.map((questionnaire, index) =>
                            <div key={index} style={{ display: 'inline-block', marginRight: 15 + "px" }}>
                                <QuestionnaireCard cardInfo={questionnaire} />
                            </div>
                        )}
                    </div>

                </SideBar>
            </UserPermissionsWrapper>
        </div>
    );

}
