import { Button } from "@mui/material";
import { WithCoordStyleViewElement } from '../Utils/Styling'


export default function ViewerButton(props) {

    return (
        <Button variant="contained" style={WithCoordStyleViewElement(props.x, props.y)}>
            {props.children}
        </Button>
    );
}