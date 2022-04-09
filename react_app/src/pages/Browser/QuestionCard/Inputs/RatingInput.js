import { Rating, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const SEPARATOR_SYMBOL = ':'

export default function RatingInput(props) {

    var splitArray = props.question.answersList[0].text.split(SEPARATOR_SYMBOL)
    var min = Number(splitArray[0])
    var max = Number(splitArray[1])
    var mid = (max + min) / 2

    const [value, setValue] = useState(mid)

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    useEffect(()=>{
        if (props.clear)
        {
            setValue(mid)
        }
    }, [props.clear])

    const marks = [
        {
            value: min,
            label: min
        },
        {
            value: mid,
            label: mid
        },
        {
            value: max,
            label: max
        }
    ]
    return (
        <>
            <Typography variant="subtitle1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Введите число</Typography>
            <Slider
                componentsProps={{
                    input: { id: props.question.answersList[0].id.string + ' ' + props.question.type }
                }}
                aria-label="Always visible"
                //defaultValue={mid}
                value = {value}
                min={min}
                max={max}
                step={1}
                marks={marks}
                valueLabelDisplay="on"
                onChange={handleChange}
            />
        </>)
}