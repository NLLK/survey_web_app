import DivWithCoords from "../Utils/DivWithCoords";

export default function TextBox(props) {
    return (
        <DivWithCoords x={props.x} y={props.y}>
            <p>
                {props.children}
            </p>
        </DivWithCoords>
    );
}