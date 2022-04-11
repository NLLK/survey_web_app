import { Paper, Typography } from "@mui/material"
import { connect, useDispatch } from "react-redux"
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
import { useEffect, useState } from "react"
import { getPureIdString, findRegisterInRegister } from "./Actions"

import { FindRegisterById } from "../../Constructor/Reducer/ConstructorActions"
import { BROWSER_CLEAR, BROWSER_CLEARED, BROWSER_SET_INFO } from "../Reducer/BrowserReducerTypes"
const TypeSwitch = (question, clear) => {
    switch (question.type) {
        // case QuestionTypes.radio_button:
        //     return <RadioButtons question={question} />
        case QuestionTypes.text:
            return <TextInput question={question} clear={clear} />
        case QuestionTypes.check_box:
            return <CheckBoxes question={question} clear={clear} />
        case QuestionTypes.date:
            return <DatePicker question={question} clear={clear} />
        case QuestionTypes.time:
            return <TimePicker question={question} clear={clear} />
        case QuestionTypes.order:
            return <OrderScale question={question} clear={clear} />
        case QuestionTypes.intervals:
            return <NumberInput question={question} clear={clear} />
        case QuestionTypes.number:
            return <NumberInput question={question} clear={clear} />
        case QuestionTypes.rating:
            return <RatingInput question={question} clear={clear} />
        default: return <p>Ошибка!</p>
    }

}

function QuestionCard(props) {

    const dispatch = useDispatch()

    const [additionalCard, setAdditionalCard] = useState("")

    const [value, setValue] = useState(null)

    const handleRadioChange = (e) => {
        let idString = getPureIdString(e.target.id)
        let currentReg = findRegisterInRegister(props.question, idString)
        if (currentReg.isQuestion) {
            setAdditionalCard(idString)
        }
        else setAdditionalCard("")
        setValue(e.target.value)
    }

    useEffect(() => {
        if (props.clear) {
            setValue(null)
            setAdditionalCard("")
            dispatch({ type: BROWSER_CLEARED })
        }
    }, [props.clear])

    return (

        <Paper sx={{ padding: "20px" }} key={props.question.id.string + "paper"}>
            <Typography>{props.question.id.string}. {props.question.text} {props.question.subText !== "" ? (" - " + props.question.subText) : ""}</Typography>
            <div>
                {
                    props.question.type !== QuestionTypes.radio_button ?
                        TypeSwitch(props.question, props.clear)
                        : <>
                            <FormControl>
                                <FormLabel id={props.id + "-radio-buttons-group-label"}>Выберите из списка: </FormLabel>
                                <RadioGroup
                                    aria-labelledby={props.id + "-radio-buttons-group-label"}
                                    name={props.question.id.string + ' ' + props.question.type}
                                    value={value}
                                    onChange={handleRadioChange}
                                >
                                    {props.question.answersList.map((item, index) => (
                                        !item.isAdditionalQuestion ?
                                            <FormControlLabel
                                                value={item.id.string}
                                                control={
                                                    <Radio id={item.id.string + ' ' + item.type} />
                                                }
                                                label={item.text}
                                                key={index} />
                                            : <></>
                                    ))}

                                </RadioGroup>
                            </FormControl>
                            {additionalCard ? <QuestionCard question={findRegisterInRegister(props.question, additionalCard)} /> : <></>}
                            {props.question.answersList.map((item, index) => (
                                item.isAdditionalQuestion ?
                                    <div style={{ marginTop: "20px" }}>
                                        <QuestionCard question={item} key={index} />
                                    </div>


                                    : <></>
                            ))}
                        </>
                }
            </div>
        </Paper>
    )
}

const mapStateToProps = (state) => {
    return {
        clear: state.browser.clear
    }
}

export default connect(mapStateToProps)(QuestionCard)