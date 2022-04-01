import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

export function RadioButtons(props) {
    return (
        <>
            {props.question.answersList ? (
                <>
                    <FormControl>
                        <FormLabel id={props.id + "-radio-buttons-group-label"}>Выберите из списка: </FormLabel>
                        <RadioGroup
                            aria-labelledby={props.id + "-radio-buttons-group-label"}
                            name={props.question.id.string + ' ' + props.question.type}
                        >
                            {props.question.answersList.map((item, index) => (
                                <FormControlLabel
                                    value={item.id.string}
                                    control={<Radio id={item.id.string + ' ' + item.type} />}
                                    label={item.text}
                                    key={index} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </>
            ) : (
                <>
                </>
            )}
        </>)
}