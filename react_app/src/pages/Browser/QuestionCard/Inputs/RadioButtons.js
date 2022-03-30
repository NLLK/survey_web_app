import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

export function RadioButtons(props) {
    return (
        <>
            {props.question.answersList ? (
                <>
                    <FormControl>
                        <FormLabel id={props.id+"-radio-buttons-group-label"}>Выберите из списка: </FormLabel>
                        <RadioGroup
                            aria-labelledby={props.id+"-radio-buttons-group-label"}
                            name={props.id+"-radio-buttons-group"}
                        >
                            {props.question.answersList.map((item, index) => (
                                <FormControlLabel value={item.id.string + " value"} control={<Radio />} label={item.text} key={index}/>
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