import { ButtonSizes } from './Styling'

export default function TextBox(props) {
    return (
        <p style={ButtonSizes}>
            {props.children}
        </p>
    );
}

TextBox.defaultProps={
    x: 0,
    y: 0
}