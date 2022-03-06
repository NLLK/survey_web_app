import { WithCoordStyle } from './Styling'

export default function DivWithCoords(props) {

    return (
        <div style={WithCoordStyle(props.x, props.y)}>
            {props.children}
        </div>
    );

}