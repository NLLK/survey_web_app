import { TextField } from "@mui/material";

export default function TextInput(props) {
    return (
        <div style={{paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px"}}>
            <TextField
                id={props.question.answersList[0].id.string+' '+props.question.type}
                label="Введите текст:"
                multiline
                fullWidth
                rows={2}

            />
        </div >)
}