import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { getPureIdString } from "../Actions";

export function CheckBoxes(props) {

    const array = () =>{
        let a = []
        for(let i = 0; i < props.question.answersList.length; i++){
            a.push(false);
        }
        return a;
    }

    const [value, setValue] = useState(array)

    const handleRadioChange = (e) => {
        let id = getPureIdString(e.target.id)

        let splt = id.split('.')
        let index = splt[splt.length-1] - 1;

        let copy = JSON.parse(JSON.stringify(value))

        copy[index] = e.target.checked

        setValue(copy)
    }

    useEffect(() => {
        if (props.clear) {
            setValue(array)
        }
    }, [props.clear])

    return (
        <>
            {props.question.answersList ? (
                <>
                    <FormControl>
                        <FormLabel id={props.id + "-radio-buttons-group-label"}>Выберите из списка: </FormLabel>
                        <FormGroup
                            aria-labelledby={props.id + "-radio-buttons-group-label"}
                            name={props.question.id.string + ' ' + props.question.type}
                            value={value}
                            onChange={handleRadioChange}
                        >
                            {props.question.answersList.map((item, index) => (
                                <FormControlLabel
                                    value={item.id.string}
                                    control={<Checkbox id={item.id.string + ' ' + item.type} checked={value[index]}/>}
                                    label={item.text}
                                    key={index} />
                            ))}
                        </FormGroup>
                    </FormControl>
                </>
            ) : (
                <>
                </>
            )}
        </>)
}