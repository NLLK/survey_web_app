import React, { useState } from "react";
import 'react-splitter-layout/lib/index.css';
import axios from "axios";
import { useParams } from "react-router-dom";

import UserPermissionsWrapper from "../../Common/UserPermissionsWrapper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Stack } from "@mui/material";

import SideBar from "../../Common/SideBar/SideBar";
import { BLANK_MENU } from "../../Common/SideBar/SideBarList";

import "../../Common/styles.css";

export default function EditQuestionnairePage() {


    let params = useParams();
    const navigate = useNavigate()

    const [nameError, setNameError] = useState(false)
    const [nameHelperText, setNameHelperText] = useState(false)
    const [commentError, setCommentError] = useState("")
    const [commentHelperText, setCommentHelperText] = useState("")

    const postQuestionnaire = () => {
        console.log("posting new questionnaire...")
        console.log(params.id)
        const data = {
            name: document.getElementById("name_field").value,
            comment: document.getElementById("comment_field").value,
        };

        let redirectTo = "/constructor/selectQuestionnaire"
        // axios
        //     .post("/api/constructor/createQuestionnaire/", data)
        //     .then(response => {
        //         navigate(redirectTo)
        //     })
        //     .catch(error => {
        //         let response = error.response.data

        //         const overfillError = "Ensure this field has no more than 150 characters."
        //         const blankError = "This field may not be blank."

        //         console.log(response)

        //         console.log(typeof(response['name']), typeof(overfillError))

        //         if (response['name'] !== undefined) {
        //             if (response['name'][0] === overfillError) {
        //                 setNameError(true)
        //                 setNameHelperText("Текст слишком длинный!")
        //             }
        //             else if (response['name'][0] === blankError) {
        //                 setNameError(true)
        //                 setNameHelperText("Поле не может быть пустым!")
        //             }
        //         }
        //         if (response['comment'] !== undefined) {
        //             if (response['comment'][0] === overfillError) {
        //                 setCommentError(true)
        //                 setCommentHelperText("Текст слишком длинный!")
        //             }
        //             else console.log("щота пошло не так")
        //         }
        //     });
    }

    const buttonStyle = {
        marginRight: '5px'
    }

    return (
        <UserPermissionsWrapper permission={2}>
            <SideBar name="Создать анкету" menu_type={BLANK_MENU}>
                <div className="center">

                    <Stack direction="column" justifyContent="center" spacing={2}>
                        <h1>Создание анкеты: </h1>
                        <TextField
                            id="name_field"
                            label="Название анкеты: "
                            type="text"
                            error={nameError}
                            helperText={nameHelperText === "" ? "" : nameHelperText}
                            onChange={() => {
                                setNameError(false)
                                setNameHelperText("")
                            }}
                        />
                        <TextField
                            id="comment_field"
                            label="Описание: "
                            multiline
                            error={commentError}
                            helperText={commentHelperText === "" ? "" : commentHelperText}
                            onChange={() => {
                                setCommentError(false)
                                setCommentHelperText("")
                            }}
                        />
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
                                onClick={postQuestionnaire}
                            >Создать</Button>
                        </Stack>
                    </Stack>
                </div>

            </SideBar>
        </UserPermissionsWrapper>
    );
}