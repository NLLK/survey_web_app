import * as React from 'react'
import TextField from '@mui/material/TextField';

import { Question, QuestionTypes } from "../Models/Models"
import { Button } from "@mui/material";

import "./styles.css"
import { connect, RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import {CONSTRUCTOR_MODIFY_QUESTIONNAIRE} from "../../Constructor/Reducer/ConstructorReducerTypes"

const RegisterTemplate = {
    text: "",
    type: QuestionTypes.string
}


function AnswerEditor(props) {

    const dispatch = useDispatch()

    const [regInfo, setRegInfo] = React.useState(new Question())

    //const register = useSelector((state: RootStateOrAny) => state.constructor.register)


    React.useEffect(()=>{ 
        setRegInfo(props.register)

    }, [props])


    const handleChange = e => {
        const { id, value } = e.target;

        switch(id){
            case "text_field":
                setRegInfo(prevState => ({
                    ...prevState,
                    text: value
                }));
                break;
        }       
    }

    const divStyle = { style: { position: "relative", width: "100%", flex: "0 0 48%", maxWidth: "48%"} }

    return (
        <>
            {
                regInfo? (<div style={{ display: "flex", flexDirection: "column"}}>
                <div style={{ display: "flex", margin: "10px" }}>
                    <div style={divStyle.style}>
                        <TextField
                            id="text_field"
                            label="Текст вопроса: "
                            type="text"
                            value = {regInfo.text}
                            onChange={handleChange}
                            multiline
                            fullWidth
                        />
                    </div>
                    <div style={{ width: "2px",  margin: "5px",marginTop: "0px", marginBottom: "0px", backgroundColor: "black" }}></div>
                    <div style={divStyle.style}>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "end", margin: "15px"}}>
                    <Button variant='contained' onClick={()=>{
                        dispatch({type: CONSTRUCTOR_MODIFY_QUESTIONNAIRE, payload: regInfo})
                    }}>Сохранить</Button>
                </div>
            </div>):<></>
            }
            

        </>
    )
}

 const mapStateToProps = (state) => {
    return{
        register: state.constructor.register
    }
}

export default connect(mapStateToProps)(AnswerEditor)