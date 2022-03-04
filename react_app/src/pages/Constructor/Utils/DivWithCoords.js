export default function DivWithCoords(props){

    const style = {
        position: "relative",
        left: props.x,
        top: props.y
    }

    return(
        <div style={style}>
            {props.children}
        </div>
);

}