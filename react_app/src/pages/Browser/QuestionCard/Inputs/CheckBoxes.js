import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";

export function CheckBoxes(props) {
    return (
        <>
            {props.question.answersList ? (
                <>
                    <FormControl>
                        <FormLabel id={props.id + "-radio-buttons-group-label"}>Выберите из списка: </FormLabel>
                        <FormGroup
                            aria-labelledby={props.id + "-radio-buttons-group-label"}
                            name={props.id + "-radio-buttons-group"}
                        >
                            {props.question.answersList.map((item, index) => (
                                <FormControlLabel 
                                control={<Checkbox id={item.id.string+' '+item.type} />}
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