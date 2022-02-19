import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'react-splitter-layout/lib/index.css';

import SideBar from "../Common/SideBar"
import QuestionnaireCard from "./QuestionnaireCard"

import './styles.css'

import { getQuestionnaireList } from "./SelectQuestionnaireActions";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import {SELECT_QUESTIONNAIRE_MENU} from "../Common/SideBarList";

export default function SelectQuestionnairePage(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        getQuestionnaireList(dispatch);
    }, [dispatch])

    const questionnaires = useSelector(state => state.selectQuestionnaire.questionnaires)

    return (
        <div>
            <UserPermissionsWrapper permission={0}>
                <SideBar name="Выбор анкеты" menu_type = {SELECT_QUESTIONNAIRE_MENU}>
                    <div className="questionnaire_view"> {
                        questionnaires.map((questionnaire, index) =>
                            <div key={index} style={{ display: 'inline-block', marginRight: 15+"px" }}>
                                <QuestionnaireCard cardInfo={questionnaire} />
                            </div>
                        )}
                    </div>

                </SideBar>
            </UserPermissionsWrapper>
        </div>
    );

}
