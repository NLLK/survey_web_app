import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

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
            <TextField
                id={props.question.answersList[0].id.string+' '+props.question.type}
                value={value}
                onChange={handleChange}
                label="Введите текст:"
                multiline
                fullWidth
                rows={2}

            />
        </div >)
}