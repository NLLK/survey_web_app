import './styles.css'
import Paper from '@mui/material/Paper'
export default function SimpleCard(props) {
    return (
        <Paper className="card">
            <span>{props.text}{props.value}</span>
        </Paper>
    )
}