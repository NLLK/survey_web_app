import { Paper, Typography } from "@mui/material"
import { connect } from "react-redux"
import { QuestionTypes } from "../../Constructor/Models/Models"
import { CheckBoxes } from "./Inputs/CheckBoxes"
import DatePicker from "./Inputs/DatePicker"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { RadioButtons } from "./Inputs/RadioButtons"
import TextInput from "./Inputs/TextInput"
import TimePicker from "./Inputs/TimePicker"
import OrderScale from "./Inputs/OrderScale"
import NumberInput from "./Inputs/NumberInput"
import RatingInput from "./Inputs/RatingInput"
import { useState } from "react"
import { getPureIdString, findRegisterInRegister } from "./Actions"

import { FindRegisterById } from "../../Constructor/Reducer/ConstructorActions"
const TypeSwitch = (question) => {
    switch (question.type) {
        // case QuestionTypes.radio_button:
        //     return <RadioButtons question={question} />
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
            return <NumberInput question={question} />
        case QuestionTypes.number:
            return <NumberInput question={question} />
        case QuestionTypes.rating:
            return <RatingInput question={question} />
        default: return <p>Ошибка!</p>
    }

}

function QuestionCard(props) {

    const [additionalCard, setAdditionalCard] = useState("")

    const handleRadioChange = (e) => {
        let idString = getPureIdString(e.target.id)
        let currentReg = findRegisterInRegister(props.question, idString)
        if (currentReg.isQuestion) {
            setAdditionalCard(idString)
        }
        else setAdditionalCard("")
    }

    return (
        <Paper sx={{ padding: "20px" }}>
            <Typography>{props.question.id.string}. {props.question.haveSubquestion ? props.question.subText : props.question.text}</Typography>
            <div>
                {
                    props.question.type !== QuestionTypes.radio_button ?
                        TypeSwitch(props.question)
                        : <>
                            <FormControl>
                                <FormLabel id={props.id + "-radio-buttons-group-label"}>Выберите из списка: </FormLabel>
                                <RadioGroup
                                    aria-labelledby={props.id + "-radio-buttons-group-label"}
                                    name={props.question.id.string + ' ' + props.question.type}
                                >
                                    {props.question.answersList.map((item, index) => (
                                        <FormControlLabel
                                            value={item.id.string}
                                            control={<Radio id={item.id.string + ' ' + item.type} />}
                                            label={item.text}
                                            onChange={handleRadioChange}
                                            key={index} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            {additionalCard ? <QuestionCard question={findRegisterInRegister(props.question, additionalCard)} /> : <></>}
                        </>
                }
            </div>
        </Paper>)
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps)(QuestionCard)