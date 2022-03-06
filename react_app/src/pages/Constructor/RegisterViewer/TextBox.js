import { WithCoordStyleViewElement } from '../Utils/Styling'

export default function TextBox(props) {
    return (
        <p style={WithCoordStyleViewElement(props.x, props.y)}>
            {props.children}
        </p>
    );
}