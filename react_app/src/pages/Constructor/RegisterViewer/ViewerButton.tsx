import * as React from 'react'
import { useDispatch } from 'react-redux';

import { Button } from "@mui/material";

import { ButtonSizes } from './Styling'

import { Question, QuestionTypes } from '../Models/Models'
import { CONSTRUCTOR_MODIFY_QUESTIONNAIRE, CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION } from '../../Constructor/Reducer/ConstructorReducerTypes'


export enum ButtonTypes { add = "add", content = "content", addParent = "addParent" }

interface Props {
    //parentRegister?: Question;
    parentRegister?: string;
    type?: string;
    children?: string;
}

export default function ViewerButton({ parentRegister, type, children }: Props) {



    const dispatch = useDispatch()

    const onClick = () => {
        

        switch (type) {
            case ButtonTypes.add: {
                let parentReg: Question = Object.assign(new Question(), JSON.parse(parentRegister));
                parentReg.addAnswer("string", QuestionTypes.string)

                dispatch({ type: CONSTRUCTOR_MODIFY_QUESTIONNAIRE, payload: JSON.stringify(parentReg) })


                console.log('add')
                break;
            }
            case ButtonTypes.content: {

                break;
            }
            case ButtonTypes.addParent: {
                dispatch({ type: CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION})
                break;
            }
            default: break;
        }
        //console.log(parentRegister, type)
    }

    return (
        <div style={{ margin: 10 + "px" }}>
            <Button variant="contained" style={ButtonSizes} onClick={onClick}>
                {children}
            </Button>
        </div>

    );
}