import * as React from 'react'
import TextField from '@mui/material/TextField';

import { Question, QuestionId, QuestionTypes } from "../Models/Models"
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, ListItemIcon, MenuItem, Select } from "@mui/material";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/Sort';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

import "./styles.css"
import { connect, useDispatch, useSelector } from 'react-redux';

import { CONSTRUCTOR_MODIFY_QUESTIONNAIRE } from "../../Constructor/Reducer/ConstructorReducerTypes"

import { isIdParent, couldBeAdditional } from "./AnswerEditorActions.ts"

const RegisterTemplate = {
    text: "",
    type: QuestionTypes.text
}


function AnswerEditor(props) {

    const dispatch = useDispatch()

    const [regInfo, setRegInfo] = React.useState(new Question())

    //const register = useSelector((state: RootStateOrAny) => state.constructor.register)


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

    return (
        <>
            {
                regInfo ? (<div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", margin: "10px" }}>
                        <div style={divStyle.style}>
                            <TextField
                                id="text_field"
                                label="Текст вопроса: "
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
                                    /> : <></>)
                            }

                        </div>
                        <div style={{ width: "2px", marginRight: "10px", marginLeft: "10px", marginTop: "0px", marginBottom: "0px", backgroundColor: "gray" }}></div>
                        <div style={divStyle.style}>
                            {
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
                                            </MenuItem>
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
                                       couldBeAdditional(regInfo.id) ?
                                        <FormGroup style={{ marginTop: "20px" }}>
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

                                </>

                            }

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
        register: state.constructor.register
    }
}

export default connect(mapStateToProps)(AnswerEditor)