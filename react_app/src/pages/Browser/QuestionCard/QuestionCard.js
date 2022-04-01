import { Paper, Typography } from "@mui/material"
import { connect } from "react-redux"
import { QuestionTypes } from "../../Constructor/Models/Models"
import { CheckBoxes } from "./Inputs/CheckBoxes"
import DatePicker from "./Inputs/DatePicker"

import { RadioButtons } from "./Inputs/RadioButtons"
import TextInput from "./Inputs/TextInput"
import TimePicker from "./Inputs/TimePicker"
import OrderScale from "./Inputs/OrderScale"
import NumberInput from "./Inputs/NumberInput"
import RatingInput from "./Inputs/RatingInput"
const TypeSwitch = (question) => {
    switch (question.type) {
        case QuestionTypes.radio_button:
            return <RadioButtons question={question} />
        case QuestionTypes.text:
            return <TextInput question={question} />
        case QuestionTypes.check_box:
            return <CheckBoxes question={question} />
        case QuestionTypes.date:
            return <DatePicker question={question} />
        case QuestionTypes.time:
            return <TimePicker question={question} />
        case QuestionTypes.order:
            return <OrderScale question={question} />
        case QuestionTypes.intervals:
            return <NumberInput question={question}/>
        case QuestionTypes.number:
            return <NumberInput question={question}/>
        case QuestionTypes.rating:
            return <RatingInput question={question}/>
        default: return <p>Ошибка!</p>
    }

}


function QuestionCard(props) {
    return (
        <Paper sx={{ minWidth: "600px", padding: "20px" }}>
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