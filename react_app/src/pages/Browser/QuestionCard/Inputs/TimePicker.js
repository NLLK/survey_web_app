import { TextField } from "@mui/material";

export default function TimePicker(props) {
    return (
        <div style={{ paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px" }}>
            <TextField
                id={props.question.answersList[0].id.string+' '+props.question.type}
                label="Введитe время"
                type="time"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div >)
}