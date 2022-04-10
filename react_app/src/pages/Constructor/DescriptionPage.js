import React, { useState, useEffect } from "react";
import { connect, useSelector } from 'react-redux'

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
import { GetQuestionnaireById} from "../SelectQuestionnaire/QuestionnaireActions";
import { Questionnaire } from "./Models/Models";


function DescriptionPage(props) {
    
    useEffect(() => {

    }, [])

    const paperStyle = { width: "75%", padding: "20px" }

    return (
        <>
            <UserPermissionsWrapper permission={2} />
            <SideBarHandler menu_type={BLANK_MENU} page_name={"Описание анкеты"} />
            {
                props.questionnaire ? <div>
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
                                {props.questionnaire.name}
                            </Typography>
                        </Paper>

                        <Paper elevation={3} style={paperStyle}>
                            <Typography variant="h5">
                                Описание:
                            </Typography>
                            <Typography>
                                {props.questionnaire.comment}
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
                                    {props.questionnaire.fields}
                                </Typography>
                            </div>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Paper>
            </div> : <></>
            }
            
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        questionnaire: state.constructor.questionnaire,
    }
}

export default connect(mapStateToProps)(DescriptionPage)