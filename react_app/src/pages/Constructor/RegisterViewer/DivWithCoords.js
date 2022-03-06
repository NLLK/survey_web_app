
export default function DivWithCoords(props) {

    return (
        <div style={{ position: "relative", left: props.x + "px", up: props.y + "px"}}>
            {props.children}
        </div>
    );

}
DivWithCoords.defaultProps={
    x: 0,
    y: 0
}