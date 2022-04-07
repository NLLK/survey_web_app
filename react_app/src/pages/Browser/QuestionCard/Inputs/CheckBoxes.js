import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { getPureIdString } from "../Actions";

export function CheckBoxes(props) {

    const [value, setValue] = useState({})

    const handleRadioChange = (e) => {
        let id =  getPureIdString(e.target.id)
        setValue({...value, id:e.target.value})
        console.log(value)
    }

    useEffect(() => {
        if (props.clear) {
            setValue(null)
        }
        else;

        console.log('as')
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
                                    control={<Checkbox id={item.id.string + ' ' + item.type} checked={value[item.id.string]}/>}
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