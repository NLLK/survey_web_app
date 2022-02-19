import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import './questionnaireCard.css'
import '../Common/styles.css'

export default function QuestionnaireCard(props) {
    return (
        <Card className="card" sx={{ width: 300 }}> {/*maxWidth: 345, minWidth: 200 */}
            <CardActionArea onClick={() => {
                console.log('card clicked');
            }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Наименование
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.cardInfo.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Описание:
                    </Typography>
                    <Typography variant="body2">
                        {props.cardInfo.comment}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small">Удалить</Button>
                <Button size="small">Изменить</Button>
            </CardActions>
        </Card>
    );
}
QuestionnaireCard.defaultProps = {
    cardInfo: {
        id: 1,
        name: 'Название анкеты',
        comment: 'Описание анкеты'
    }
}
