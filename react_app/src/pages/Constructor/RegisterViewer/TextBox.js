import DivWithCoords from "../Utils/DivWithCoords";

import {func} from "./aboba.ts"

export default function TextBox(props) {
    return (
        <DivWithCoords x={props.x} y={props.y}>
            <p>
                {props.children}, {func(1)}
            </p>
        </DivWithCoords>
    );
}