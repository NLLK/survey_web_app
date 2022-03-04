import { Button } from "@mui/material";
import DivWithCoords from "../Utils/DivWithCoords";
export default function ViewerButton(props) {

    return(
        <DivWithCoords x={props.x} y={props.y}>
            <Button variant="contained" sx={{width: "75px"}}>
                {props.children}
            </Button>
        </DivWithCoords>
    );
}