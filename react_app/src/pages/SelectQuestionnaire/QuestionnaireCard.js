import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import './questionnaireCard.css'
import '../Common/styles.css'

import { getQuestionnaireList } from './SelectQuestionnaireActions'
import { useNavigate } from "react-router-dom";
import ButtonEnter from "../Common/ButtonEnter";
import TextBoxWithDots from '../Common/TextBoxWithDots'

export default function QuestionnaireCard(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);

    useEffect(()=>{},[])

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
        navigate('edit/' + props.cardInfo.id)
    }

    return (
        <div>
            <Card className="card" sx={{ width: 300}}> {/*maxWidth: 345, minWidth: 200 , height: 200*/}
                <CardActionArea onClick={() => {
                }}>
                    <CardContent sx={{height: 150 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Наименование
                        </Typography>
                        <TextBoxWithDots variant = "h5"  max_length = {15} text = {props.cardInfo.name}/>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Описание:
                        </Typography>
                        <TextBoxWithDots variant = "body2" max_length = {69} text = {props.cardInfo.comment}/>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" onClick={handleDeleteAction}>Удалить</Button>
                    <Button size="small" onClick={handleEditAction}>Изменить</Button>
                </CardActions>
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
