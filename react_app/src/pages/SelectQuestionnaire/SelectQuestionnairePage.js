import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'react-splitter-layout/lib/index.css';

import SideBar from "../Common/SideBar"
import QuestionnaireCard from "./QuestionnaireCard"

import './styles.css'

import { getQuestionnaireList } from "./SelectQuestionnaireActions";

export default function SelectQuestionnairePage(props) {

    const dispatch = useDispatch()

    useEffect(()=>{
        getQuestionnaireList(dispatch);
    }, [dispatch])

    const questionnaires = useSelector(state => state.selectQuestionnaire.questionnaires)

    return (
        <div>
            <div >
                <div>
                    {/* <SideBar/> */}
                </div>
                <div className="questionnaire_view"> {
                        questionnaires.map((questionnaire,index)=>
                            <div key={index} style={{display: 'inline-block'}}>
                                <QuestionnaireCard cardInfo={questionnaire} />
                            </div>
                        )}
                </div>

            </div>

        </div>
    );

}
