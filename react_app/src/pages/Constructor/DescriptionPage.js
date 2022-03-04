import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

import SideBarHandler from "../Common/SideBar/SideBarHandler";
import { BLANK_MENU } from "../Common/SideBar/SideBarList"
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import '../Common/styles.css'

import { Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetQuestionnaireById, QuestionnaireTemplate } from "../SelectQuestionnaire/QuestionnaireActions";


export default function DescriptionPage(props) {

    const working_on_id = useSelector(state => state.constructor.working_on_id)

    let qInfoDefault = QuestionnaireTemplate

    const [questionnaire, setQuestionnaire] = useState(qInfoDefault)

    useEffect(() => {
        console.log(working_on_id)
        GetQuestionnaireById(setQuestionnaire, working_on_id)
    }, [working_on_id])

    const paperStyle = { width: "75%", padding: "20px" }

    return (
        <>
            <UserPermissionsWrapper permission={2} />
            <SideBarHandler menu_type={BLANK_MENU} page_name={"Описание анкеты"} />
            <div>
                <Paper className="center" elevation={3} style={{ width: "50%", padding: "20px", paddingBlockStart: "50px", paddingBlockEnd: "50px" }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Paper elevation={3} style={paperStyle}>
                            <Typography variant="h5">
                                Наименование:
                            </Typography>
                            <Typography>
                                {questionnaire.name}
                            </Typography>
                        </Paper>

                        <Paper elevation={3} style={paperStyle}>
                            <Typography variant="h5">
                                Описание:
                            </Typography>
                            <Typography>
                                {questionnaire.comment}
                            </Typography>
                        </Paper>
                        <Accordion style={{ width: "75%", padding: "15px" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h5">Поля:</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div style={{ scrollBehavior: "smooth", overflowY: "scroll", maxHeight: "300px" }}>
                                <Typography>
                                    {questionnaire.fields}
                                </Typography>
                            </div>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Paper>
            </div>
        </>

    )
}