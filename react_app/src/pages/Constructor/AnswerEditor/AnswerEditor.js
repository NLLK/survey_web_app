import * as React from 'react'
import TextField from '@mui/material/TextField';

import { Question, QuestionId, QuestionTypes } from "../Models/Models"
import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, ListItemIcon, MenuItem, Select } from "@mui/material";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/Sort';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import "./styles.css"
import { connect, useDispatch, useSelector } from 'react-redux';

import { CONSTRUCTOR_ADD_SUB_QUESTION, CONSTRUCTOR_MODIFY_QUESTIONNAIRE } from "../../Constructor/Reducer/ConstructorReducerTypes"

import { isIdParent, couldBeAdditional, getQuestionIdByString, getRootQuestion, setIdNextToId } from "./AnswerEditorActions.ts"

const DEFAULT_TEXT = "По умолчанию"

function AnswerEditor(props) {

    const dispatch = useDispatch()

    const [regInfo, setRegInfo] = React.useState(new Question())

    React.useEffect(() => {
        setRegInfo(props.register)
    }, [props])

    const handleChange = e => {
        const { id, value } = e.target;

        switch (id) {
            case "text_field":
                setRegInfo(prevState => ({
                    ...prevState,
                    text: value
                }));
                break;
            case "subText_field":
                setRegInfo(prevState => ({
                    ...prevState,
                    subText: value
                }));
                break;
            case "is_additionalQ_checkbox":
                setRegInfo(prevState => ({
                    ...prevState,
                    isAdditionalQuestion: e.target.checked
                }));
                break;
            default:
                console.log(e)
                break;
        }
        if (id.includes("redirect_autocomplete")) {
            console.log(e.target.textContent)
                setRegInfo(prevState => ({
                    ...prevState,
                    redirectTo: e.target.textContent !== DEFAULT_TEXT ? getQuestionIdByString(e.target.textContent) : new QuestionId()
                }));
        }
    }
    const handleChangeTypeSelect = e => {
        const { id, value } = e.target;
        setRegInfo(prevState => ({
            ...prevState,
            type: value
        }));
    }

    const divStyle = { style: { position: "relative", width: "100%", flex: "0 0 48%", maxWidth: "48%" } }

    const iconStyle = { height: "0.75em" }
    const textFieldStyle = { marginTop: "15px" }

    const idList = () => {
        let list = []
        list.push(DEFAULT_TEXT)
        if (props.questionnaire && props.register) {

            let thisRootReg = getRootQuestion(props.register.id)

            if (!props.questionnaire.questionList) {
                props.questionnaire.questionList = JSON.parse(props.questionnaire.fields)
            }

            props.questionnaire.questionList.forEach(element => {
                if (element.id.string !== thisRootReg.string)
                    list.push(element.id.string)
            });
        }

        return list
    }

    return (
        <>
            {
                regInfo ? (<div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", margin: "10px" }}>
                        <div style={divStyle.style}>
                            <TextField
                                id="text_field"
                                label={regInfo.isQuestion ? "Текст вопроса: " : "Текст ответа: "}
                                type="text"
                                value={regInfo.text}
                                onChange={handleChange}
                                multiline
                                fullWidth
                            />
                            {
                                (regInfo.haveSubquestion
                                    ? <TextField
                                        id="subText_field"
                                        label="Текст подвопроса: "
                                        type="text"
                                        value={regInfo.subText}
                                        onChange={handleChange}
                                        multiline
                                        fullWidth
                                        style={textFieldStyle}
                                    /> : 
                                    <>
                                        <Button variant = "contained" 
                                        sx={{marginTop: "15px", width: "-webkit-fill-available", height: "56px"}}
                                        onClick={()=>{
                                            dispatch({type: CONSTRUCTOR_ADD_SUB_QUESTION})
                                        }}
                                        >
                                            Добавить подвопрос
                                        </Button>
                                    </>)
                            }

                        </div>
                        <div style={{ width: "2px", marginRight: "10px", marginLeft: "10px", marginTop: "0px", marginBottom: "0px", backgroundColor: "gray" }}></div>
                        <div style={divStyle.style}>
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="type_select_label">Тип регистра</InputLabel>
                                    <Select
                                        labelId="type_select_label"
                                        id="type_select"
                                        value={regInfo.type}
                                        label="Тип регистра"
                                        disabled={regInfo.isQuestion ? false : true}
                                        onChange={handleChangeTypeSelect}
                                    >
                                        <MenuItem value={QuestionTypes.text}>
                                            <ListItemIcon >
                                                <TextFieldsIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Текст
                                        </MenuItem>
                                        <MenuItem value={QuestionTypes.number}>
                                            <ListItemIcon>
                                                <NumbersIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Число
                                        </MenuItem>
                                        <MenuItem value={QuestionTypes.radio_button}>
                                            <ListItemIcon>
                                                <RadioButtonCheckedIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Один из списка
                                        </MenuItem>
                                        <MenuItem value={QuestionTypes.check_box}>
                                            <ListItemIcon>
                                                <CheckBoxIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Многие из списка</MenuItem>
                                        <MenuItem value={QuestionTypes.date}>
                                            <ListItemIcon>
                                                <CalendarTodayIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Дата
                                        </MenuItem>
                                        <MenuItem value={QuestionTypes.time}>
                                            <ListItemIcon>
                                                <AccessTimeIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Время
                                        </MenuItem>
                                        <MenuItem value={QuestionTypes.order}>
                                            <ListItemIcon>
                                                <SortIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Порядковая шкала
                                        </MenuItem>зменить" для а
                                        <MenuItem value={QuestionTypes.intervals}>
                                            <ListItemIcon>
                                                <FormatListNumberedIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Интервальная шкала
                                        </MenuItem>
                                        <MenuItem value={QuestionTypes.rating}>
                                            <ListItemIcon>
                                                <StarIcon style={iconStyle} />
                                            </ListItemIcon>
                                            Рейтинговая шкала
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                {
                                    regInfo.isQuestion && couldBeAdditional(regInfo.id) ?
                                        <FormGroup style={{ marginTop: "15px" }}>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    id="is_additionalQ_checkbox"
                                                    checked={regInfo.isAdditionalQuestion}
                                                    onChange={handleChange}
                                                />}
                                                label="Дополнительный вопрос?"
                                            />
                                        </FormGroup>
                                        : <></>
                                }
                                {
                                    !isIdParent(regInfo.id) ?
                                        <Autocomplete
                                            sx={{ marginTop: "15px" }}
                                            disablePortal
                                            id="redirect_autocomplete"
                                            options={idList()}
                                            value={regInfo.redirectTo.string}
                                            renderInput={(params) => <TextField {...params} label="Переход к ..." />}
                                            noOptionsText="Не найдено"
                                            onChange={handleChange}
                                            isOptionEqualToValue = {(option, value)=>{
                                                return true;
                                            }}
                                        /> : <></>
                                }
                            </>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end", margin: "15px" }}>
                        <Button variant='contained' onClick={() => {
                            dispatch({ type: CONSTRUCTOR_MODIFY_QUESTIONNAIRE, payload: regInfo })
                        }}>Сохранить</Button>
                    </div>
                </div>) : <></>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        register: state.constructor.register,
        questionnaire: state.constructor.questionnaire
    }
}

export default connect(mapStateToProps)(AnswerEditor)