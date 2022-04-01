import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { QuestionTypes } from "../../../Constructor/Models/Models";

const INTERVAL_SEPARATOR = '.'

export default function NumberInput(props) {



    // props.question.forEach(element => {

    // });


    var startFrom = 0;
    var endTo = 100;

    if (props.question.type === QuestionTypes.intervals) {
        startFrom = Number(props.question.answersList[0].text.split(INTERVAL_SEPARATOR, 1)[0])
        let spltarr = props.question.answersList[props.question.answersList.length - 1].text.split(INTERVAL_SEPARATOR)
        endTo = Number(spltarr[spltarr.length - 1])
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (value < startFrom || value > endTo)  setError(true) 
        else setError(false);
        setValue(value); 
    }

    const [value, setValue] = useState(startFrom)
    const [error, setError] = useState(false)
    return (
        props.question.type === QuestionTypes.intervals ?
            <>
                <Typography variant="subtitle1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Введите число от {startFrom} до {endTo}</Typography>
                <TextField
                    type="number"
                    inputProps={{ max: endTo, min: startFrom }}
                    onChange={handleChange}
                    value = {value}
                    error = {error}
                    helperText = {error ? "Число не находится в заданном диапазоне!":""}
                    fullWidth />
            </>
            :

            <>
                <Typography variant="subtitle1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Введите число</Typography>
                <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} fullWidth />
            </>


    )
}