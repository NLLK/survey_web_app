import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function TimePicker(props) {

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
        <div style={{ paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px" }}>
            <TextField
                id={props.question.answersList[0].id.string+' '+props.question.type}
                label="Введитe время"
                type="time"
                fullWidth
                value={value}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div >)
}