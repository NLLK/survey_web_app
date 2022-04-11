import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuestionCard from "../QuestionCard";

export default function TextInput(props) {

    const [value, setValue] = useState("")

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    useEffect(()=>{
        if (props.clear)
        {
            setValue("")
        }
    }, [props.clear])

    return (
        <div style={{paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px"}}>
            <Typography variant="caption">{props.question.answersList[0].text}</Typography>
            <TextField
                id={props.question.answersList[0].id.string+' '+props.question.type}
                value={value}
                onChange={handleChange}
                label="Введите текст:"
                multiline
                fullWidth
                rows={2}

            />
            {
                props.question.answersList.map((item, index) => (
                   index !== 0 && item.isAdditionalQuestion ? <div style={{ marginTop: "20px" }}><QuestionCard question={item} key={index} clear = {props.clear}/></div> : <></>
                ))
            }
        </div >)
}