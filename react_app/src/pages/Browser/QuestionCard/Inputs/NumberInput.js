import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { QuestionTypes } from "../../../Constructor/Models/Models";
import { getIntervalsArray } from "../Actions"
import QuestionCard from "../QuestionCard";


export default function NumberInput(props) {

    var startFrom = 0;
    var endTo = 100;

    const [value, setValue] = useState(startFrom)
    const [error, setError] = useState(false)


    if (props.question.type === QuestionTypes.intervals) {

        startFrom = getIntervalsArray(props.question.answersList[0].text)[0]
        endTo = getIntervalsArray(props.question.answersList[props.question.answersList.length - 1].text)[1]
    }

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (props.question.type === QuestionTypes.intervals) {
            if (value < startFrom || value > endTo) setError(true)
            else setError(false);
        }

        setValue(value);
    }

    useEffect(() => {
        if (props.clear) {
            setValue(startFrom)
        }
    }, [props.clear])


    return (
        props.question.type === QuestionTypes.intervals ?
            <>
                <Typography variant="subtitle1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Введите число от {startFrom} до {endTo}</Typography>
                <TextField
                    type="number"
                    inputProps={{ max: endTo, min: startFrom }}
                    onChange={handleChange}
                    value={value}
                    error={error}
                    helperText={error ? "Число не находится в заданном диапазоне!" : ""}
                    id={props.question.id.string + ' ' + props.question.type}
                    fullWidth />
                {
                    props.question.answersList.map((item, index) => (
                        index !== 0 && item.isAdditionalQuestion ? <QuestionCard question={item} key={index} clear={props.clear} /> : <></>
                    ))
                }
            </>
            :

            <>
                <Typography variant="subtitle1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Введите число</Typography>
                <TextField
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    id={props.question.answersList[0].id.string + ' ' + props.question.type}
                    onChange={handleChange}
                    value={value}
                    fullWidth />
                {
                    props.question.answersList.map((item, index) => (
                        index !== 0 && item.isAdditionalQuestion ? <div style={{ marginTop: "20px" }}><QuestionCard question={item} key={index} clear={props.clear} /></div> : <></>
                    ))
                }
            </>


    )
}