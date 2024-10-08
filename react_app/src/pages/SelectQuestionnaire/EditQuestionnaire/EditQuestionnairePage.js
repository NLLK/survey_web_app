import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import UserPermissionsWrapper from "../../Common/UserPermissionsWrapper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";

import { BLANK_MENU } from "../../Common/SideBar/SideBarList";

import "../../Common/styles.css";
import SideBarHandler from "../../Common/SideBar/SideBarHandler";
import { GetQuestionnaireById } from "../QuestionnaireActions";
import { Questionnaire } from "../../Constructor/Models/Models";
import { connect, useDispatch } from "react-redux";

import { toogle } from "../../Common/Utils";

export default function EditQuestionnairePage(props) {
    let params = useParams();
    const navigate = useNavigate()

    const [nameError, setNameError] = useState(false)
    const [nameHelperText, setNameHelperText] = useState(false)
    const [commentError, setCommentError] = useState("")
    const [commentHelperText, setCommentHelperText] = useState("")

    let qInfoDefault = new Questionnaire()
    qInfoDefault.name = ""
    qInfoDefault.comment = ""

    const [qInfo, setQInfo] = useState(qInfoDefault)
    const [hidden, setHidden] = useState(0)

    useEffect(() => {
        getQuestionnaire(params.id)
    }, [params])

    const getQuestionnaire = async (id) => {
        const qInfo = await GetQuestionnaireById(id)
        setQInfo(qInfo)
        setHidden(qInfo.hidden)
    }

    const editQuestionnaire = () => {
        console.log("editing questionnaire...", params.id)
        const data = qInfo

        let redirectTo = "/constructor/selectQuestionnaire"
        axios
            .post("/api/constructor/editQuestionnaire/", data)
            .then(response => {
                navigate(redirectTo)
            })
            .catch(error => {
                let response = error.response.data
                console.log(response)
                const overfillError = "Ensure this field has no more than 150 characters."
                const overfillErrorComment = "Ensure this field has no more than 300 characters."
                const blankError = "This field may not be blank."

                if (response['name'] !== undefined) {
                    if (response['name'][0] === overfillError) {
                        setNameError(true)
                        setNameHelperText("Текст слишком длинный!")
                    }
                    else if (response['name'][0] === blankError) {
                        setNameError(true)
                        setNameHelperText("Поле не может быть пустым!")
                    }
                }
                if (response['comment'] !== undefined) {
                    if (response['comment'][0] === overfillErrorComment) {
                        setCommentError(true)
                        setCommentHelperText("Текст слишком длинный!")
                    }
                    else console.log("щота пошло не так", response)
                }
            });
    }

    const toogleQuestionnaire = (e) => {
        let data = {
            id: qInfo.id
        }
        axios.post("/api/constructor/toogleQuestionnaire/", data)
            .then(()=>{
                hidden === 0 ? setHidden(1) : setHidden(0)
            })
    }

    const buttonStyle = {
        marginRight: '5px'
    }

    const handleChange = e => {
        const { id, value } = e.target;
        setQInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
        switch (id) {
            case 'name': {
                setNameError(false)
                setNameHelperText("")
                break;
            }
            case 'comment': {
                setCommentError(false)
                setCommentHelperText("")
                break;
            }
            default: break;
        }
    }

    return (
        <>
            <UserPermissionsWrapper permission={2} />
            <SideBarHandler page_name="Создать анкету" menu_type={BLANK_MENU} />
            <div className="center">
                <Stack direction="column" justifyContent="center" spacing={2}>
                    <h1>Редактирование анкеты: </h1>
                    <TextField
                        id="name"
                        label="Название анкеты: "
                        type="text"

                        value={qInfo.name}
                        onChange={handleChange}
                        error={nameError}
                        helperText={nameHelperText === "" ? "" : nameHelperText}
                    />
                    <TextField
                        id="comment"
                        label="Описание: "
                        multiline
                        error={commentError}
                        helperText={commentHelperText === "" ? "" : commentHelperText}
                        value={qInfo.comment}
                        onChange={handleChange}
                    />
                    <Button
                        variant="outlined"
                        onClick={toogleQuestionnaire}
                        >
                        {hidden === 0 ? "Скрыть" : "Отобразить"} анкету
                    </Button>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button
                            variant="outlined"
                            style={buttonStyle}
                            onClick={() => { navigate(-1) }}
                        >Отмена</Button>
                        <Button
                            variant="contained"
                            style={buttonStyle}
                            onClick={editQuestionnaire}
                        >Изменить</Button>
                    </Stack>
                </Stack>

            </div>
        </>
    );
}
