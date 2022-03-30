import { Paper, Typography } from "@mui/material"
import { connect } from "react-redux"
import { QuestionTypes } from "../../Constructor/Models/Models"
import { RadioButtons } from "./Inputs/RadioButtons"
import TextInput from "./Inputs/TextInput"

const TypeSwitch = (question) => {
    console.log(question.type)
    switch (question.type) {
        case QuestionTypes.radio_button:
            return <RadioButtons question={question} />
        case QuestionTypes.text: {
            return <TextInput question={question} />
        }
    }
}


function QuestionCard(props) {
    return (
        <Paper sx={{ minWidth: "300px", padding: "10px" }}>
            <Typography>{props.question.id.string}. {props.question.text}</Typography>
            <div>
                {
                    TypeSwitch(props.question)
                }
            </div>
        </Paper>)
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(QuestionCard)