import { Button } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import { BLANK_MENU } from "../Common/SideBar/SideBarList";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { QuestionTypes } from "../Constructor/Models/Models";
import { GetQuestionnaireById } from "../SelectQuestionnaire/QuestionnaireActions";
import QuestionCard from "./QuestionCard/QuestionCard";
import { BROWSER_CLEAR, BROWSER_SET_QUESTIONNAIRE } from "./Reducer/BrowserReducerTypes"

import { getIntervalsArray, getParent } from "./QuestionCard/Actions"
import axios from "axios";

function dataObject(idString, dataString) {
    return { id: idString, data: dataString }
}

function getData(question) {

    let data = []

    question.answersList.forEach(q => {

        let elementId = q.id.string + ' ' + q.type
        let element = null;
        if (question.type != QuestionTypes.order)
            element = document.getElementById(elementId)
        else {
            let parId = getParent(q.id)
            let parString = parId.string + ' ' + q.type
            element = document.getElementById(parString)
        }

        if (element != null || question.type === QuestionTypes.intervals) {
            switch (question.type) {
                case QuestionTypes.radio_button:
                case QuestionTypes.check_box: {
                    if (element.checked)
                        data.push(dataObject(q.id.string, 1))
                    else data.push(dataObject(q.id.string, 0))
                    break;
                }
                case QuestionTypes.text:
                case QuestionTypes.date:
                case QuestionTypes.time:
                case QuestionTypes.number:
                case QuestionTypes.rating: {
                    data.push(dataObject(q.id.string, element.value))
                    break;
                }
                case QuestionTypes.order: {
                    let index = 1;
                    for (let i = 0; i < element.children.length; i++) {
                        if (element.children[i].id === elementId) {
                            data.push(dataObject(q.id.string, index))
                            break;
                        }
                        index++
                    }
                    break;
                }
            }
        }
        else {
            if (question.type === QuestionTypes.text) data.push(dataObject(q.id.string, ""))
            else data.push(dataObject(q.id.string, 0))
        }

        if (q.answersList.length !== 0) {
            data = data.concat(getData(q));
        }

    });

    return data
}

function getDataFromIntervals(question) {
    let data = []

    let elementId = question.id.string + ' ' + question.type
    let element = document.getElementById(elementId)

    question.answersList.forEach(answer => {
        let borders = getIntervalsArray(answer.text)
        if (element.value >= borders[0] && element.value <= borders[1])
            data.push(dataObject(answer.id.string, 1))
        else data.push(dataObject(answer.id.string, 0))
    });

    return data
}

function SendData(data, questionnaireId) {
    console.log("got data: ", data, "qId: ", questionnaireId)

    let sendingData = { data: data, questionnaireId: questionnaireId }

    axios.post("/api/dataStoring/sendInfo/", sendingData)
        .then(() => {
            console.log('ok')
        })
        .catch(() => {
            console.log('ne ok')
        })

}

function CollectDataFunction(questionnaire) {
    let data = []

    let questionnaireCopy = JSON.parse(JSON.stringify(questionnaire))

    if (questionnaireCopy.questionList === undefined) {
        questionnaireCopy.questionList = JSON.parse(questionnaireCopy.fields)
    }

    questionnaireCopy.questionList.forEach(element => {
        if (element.type !== QuestionTypes.intervals)
            data = data.concat(getData(element))
        else data = data.concat(getDataFromIntervals(element))
    });
    return data
}

function BrowserPage(props) {
    let params = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        if (params.id > -1) {
            getQuestionnaire(params.id)
        }
    }, [props.toogle])

    const getQuestionnaire = async (id) => {
        const qInfo = await GetQuestionnaireById(id)
        dispatch({ type: BROWSER_SET_QUESTIONNAIRE, payload: qInfo })
    }

    const CollectData = () => {
        let data = CollectDataFunction(props.questionnaire)
        SendData(data, props.questionnaire.id)

        dispatch({ type: BROWSER_CLEAR })

        window.scrollTo(0, 0)
    }

    return (
        <div style={{ backgroundColor: "rgb(210 210 210 / 58%)" }}>
            <SideBarHandler page_name={"Анкетирование: " + (props.questionnaire ? props.questionnaire.name : "")} menu_type={BLANK_MENU} />
            {/* <UserPermissionsWrapper permission={1} /> */}
            {
                props.questionnaire ? (<>
                    {
                        props.questionnaire.fields !== '{}' ?
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    padding: "20px",
                                    width: "750px",
                                    marginLeft: "auto",
                                    marginRight: "auto"

                                }}>
                                {
                                    props.questionnaire.questionList !== undefined || props.questionnaire.questionList !== {} ?
                                        props.questionnaire.questionList.map((rootQuestion, index) =>
                                            <div
                                                key={index}
                                                id={rootQuestion.id.string + "mainDiv"}
                                                style={{ margin: "10px", width: "-webkit-fill-available" }}
                                            >
                                                <QuestionCard question={rootQuestion}/>
                                            </div>
                                        ) : <></>

                                }
                                <div style={{ alignSelf: "end", margin: "10px", marginTop: "25px" }}>
                                    <Button variant="contained" onClick={CollectData}>Сохранить</Button>
                                </div>
                            </div>
                            : <></>
                    }
                </>)
                    : <></>
            }
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        questionnaire: state.browser.questionnaire,
        toogle: state.browser.toogle
    }
}

export default connect(mapStateToProps)(BrowserPage)