import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import './questionnaireCard.css'
import '../Common/styles.css'

import { getQuestionnaireList } from './SelectQuestionnaireActions'
import ButtonEnter from "../Common/ButtonEnter";
import TextBoxWithDots from '../Common/TextBoxWithDots'
import { CONSTRUCTOR_SET_QUESTIONNAIRE as CONSTRUCTOR_SET_QUESTIONNAIRE_ID } from "../Constructor/Reducer/ConstructorReducerTypes";
import { HtmlTooltip } from "../Common/HtmlTooltip";

export const QuestionCardTypes = { Constructor: 0, Browser: 1 }

export default function QuestionnaireCard(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);

    useEffect(() => { }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        console.log('deleting', props.cardInfo.id)
        const data = {
            id: props.cardInfo.id
        };

        axios
            .post("/api/constructor/deleteQuestionnaire/", data)
            .then(response => {
                console.log('deleted ', props.cardInfo.id)
                getQuestionnaireList(dispatch)
            })
            .catch(error => {
                console.log(error)
            });
    };

    const handleDeleteAction = () => {
        setOpen(true);
    };

    const handleEditAction = () => {
        navigate('/constructor/selectQuestionnaire/edit/' + props.cardInfo.id)
    }

    const handleExportButtonClick = () => {
        axios({
            url: 'api/dataStoring/downloadExcel/?id='+props.cardInfo.id, //your url
            method: 'GET',
            responseType: 'blob', // important 
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', props.cardInfo.name + "(" + props.cardInfo.id + ")" + '.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    const cardOnClick = () => {
        switch (props.type) {
            case QuestionCardTypes.Constructor: {
                dispatch({
                    type: CONSTRUCTOR_SET_QUESTIONNAIRE_ID,
                    payload: props.cardInfo.id
                }
                )
                navigate('/constructor/' + props.cardInfo.id)
                break;
            }
            case QuestionCardTypes.Browser: {
                navigate('/browser/' + props.cardInfo.id)
                break;
            }
        }
    }

    return (
        <div>
            <Card className="card" sx={{ width: 300 }}> {/*maxWidth: 345, minWidth: 200 , height: 200*/}
                <CardActionArea onClick={cardOnClick}>
                    <CardContent sx={{ height: 150 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Наименование:
                        </Typography>
                        <TextBoxWithDots variant="h5" max_length={15} text={props.cardInfo.name} />
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Описание:
                        </Typography>
                        <TextBoxWithDots variant="body2" max_length={69} text={props.cardInfo.comment} />
                    </CardContent>
                </CardActionArea>
                {props.type === QuestionCardTypes.Constructor ?
                    <CardActions>
                        <Button size="small" onClick={handleDeleteAction}>Удалить</Button>
                        <Button size="small" onClick={handleEditAction}>Изменить</Button>
                        <HtmlTooltip title="Экспорт">
                            <IconButton aria-label="delete" onClick={handleExportButtonClick}>
                                <SaveAltIcon />
                            </IconButton>
                        </HtmlTooltip>
                    </CardActions> : <></>}
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Вы действительно хотите удалить анкету?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Данное действие приведет к удалению анкеты и всех данных, внесенных для нее.
                        Если вы хотите скрыть анкету, нажмите "Отмена" в этом меню, и выберите кнопку "Изменить" для анкеты.
                        Там вы найдете кнопку "Скрыть анкету".
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <ButtonEnter>
                        <Button onClick={handleDelete} autoFocus>Удалить</Button>
                    </ButtonEnter>
                </DialogActions>
            </Dialog>
        </div>
    );
}
QuestionnaireCard.defaultProps = {
    cardInfo: {
        id: 1,
        name: 'Название анкеты',
        comment: 'Описание анкеты'
    }
}
