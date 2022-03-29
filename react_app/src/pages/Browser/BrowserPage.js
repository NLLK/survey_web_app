import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import { BLANK_MENU } from "../Common/SideBar/SideBarList";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { Questionnaire } from "../Constructor/Models/Models";
import { GetQuestionnaireById } from "../SelectQuestionnaire/QuestionnaireActions";
import { BROWSER_SET_QUESTIONNAIRE } from "./Reducer/BrowserReducerTypes"


function BrowserPage(props) {
    let params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (params.id > -1) {
            getQuestionnaire(params.id)
        }
    }, [dispatch])

    const getQuestionnaire = async (id) => {
        const qInfo = await GetQuestionnaireById(params.id)//Questionnaire.test()//await GetQuestionnaireById(setQuestionnaireInfo, id)

        dispatch({ type: BROWSER_SET_QUESTIONNAIRE, payload: qInfo })
    }

    let returnPage  = [];

    if (props.questionnaire != undefined && props.questionnaire.fields !== null && props.questionnaire.fields !== '{}') {
        console.log('browser', props.questionnaire.fields)
        let fields = JSON.parse(props.questionnaire.fields)

        fields.forEach(rootQuestion => {
            returnPage.push(RenderQuestion(rootQuestion))
        });
    }

    return (
        <div>
            {/* <UserPermissionsWrapper permission={1} /> */}
            <SideBarHandler page_name={"Анкетирование: " + (props.questionnaire ? props.questionnaire.name: "")} menu_type={BLANK_MENU} />
            <div style={{ position: "relative", paddingLeft: "10 px", display: "flex", flexDirection: 'column' }}>
                {
                    returnPage.map((item, index) =>
                        <div style={{ display: "flex" }} key={index}>{item}</div>
                    )
                }
            </div>
        </div>
    );
}

function RenderQuestion(question) {

    return (
        <div style={{ position: "relative", display: "flex", flexDirection: 'column' }} key={question.id.string + "r"}>

            <p>{question.id.string} - {question.text}</p>

            <div style={{ position: "relative", display: "flex", flexDirection: 'column' }}>
                {question.isQuestion ?
                    <>
                        {
                            question.answersList.map((item, index) => (
                                !item.isQuestion ?
                                   <p> {item.id.string + " " + item.text}</p>
                                    :
                                    RenderQuestion(item)
                            ))
                        }
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        questionnaire: state.browser.questionnaire
    }
}

export default connect(mapStateToProps)(BrowserPage)