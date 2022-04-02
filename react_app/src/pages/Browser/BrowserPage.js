import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import { BLANK_MENU } from "../Common/SideBar/SideBarList";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { Questionnaire } from "../Constructor/Models/Models";
import { GetQuestionnaireById } from "../SelectQuestionnaire/QuestionnaireActions";
import QuestionCard from "./QuestionCard/QuestionCard";
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

    let returnPage = [];

    if (props.questionnaire != undefined && props.questionnaire.fields !== null && props.questionnaire.fields !== '{}') {
        console.log('browser', props.questionnaire.fields)
        let fields = JSON.parse(props.questionnaire.fields)

        fields.forEach(rootQuestion => {
            returnPage.push(<QuestionCard question={rootQuestion} />)
        });
    }

    return (
        <div style={{ backgroundColor: "rgb(210 210 210 / 58%)" }}>
            {/* <UserPermissionsWrapper permission={1} /> */}
            <SideBarHandler page_name={"Анкетирование: " + (props.questionnaire ? props.questionnaire.name : "")} menu_type={BLANK_MENU} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                width: "700px",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                {
                    returnPage.map((item, index) =>
                        <div key={index} style={{ margin: "10px", width: "-webkit-fill-available" }}>{item}</div>
                    )
                }
                <div style={{ alignSelf: "end", margin: "10px", marginTop: "25px" }}>
                    <Button variant="contained">Сохранить</Button>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        questionnaire: state.browser.questionnaire
    }
}

export default connect(mapStateToProps)(BrowserPage)