import { TextField } from "@mui/material";

export default function TimePicker(props) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-'+mm + '-' + dd;

    return (
        <div style={{ paddingTop: "15px", paddingLeft: "10px", paddingRight: "10px" }}>
            <TextField
                id={props.question.id.string + props.question.type}
                label="Введитe время"
                type="time"
                fullWidth
                defaultValue={today}
                //sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div >)
}