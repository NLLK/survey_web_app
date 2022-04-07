import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function DatePicker(props) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-'+mm + '-' + dd;

    const [value, setValue] = useState(today)

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    useEffect(()=>{
        if (props.clear)
        {
            setValue(today)
        }
    }, [props.clear])

    return (
        <div style={{ paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px" }}>
            <TextField
                id={props.question.answersList[0].id.string+' '+props.question.type}
                label="Введитe дату"
                type="date"
                fullWidth
                value = {value}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div >)
}