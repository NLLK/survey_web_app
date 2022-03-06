import { Button } from "@mui/material";
import { ButtonSizes } from './Styling'


export default function ViewerButton(props) {

    return (
        <div style={{ margin: 10 + "px" }}>
            <Button variant="contained" style={ButtonSizes}>
                {props.children}
            </Button>
        </div>

    );
}