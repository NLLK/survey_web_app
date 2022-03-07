import * as React from 'react'
import { useDispatch } from 'react-redux';

import { Button } from "@mui/material";

import { ButtonSizes } from './Styling'

import {Question, QuestionTypes} from '../Models/Models'
import {CONSTRUCTOR_MODIFY_QUESTIONNAIRE} from '../../Constructor/Reducer/ConstructorReducerTypes'


export enum ButtonTypes {add = "add", content = "content"}

interface Props {
    //parentRegister?: Question;
    parentRegister?: string;
    type?: string;
    children?: string;
  }

export default function ViewerButton({parentRegister, type, children}:Props) {

    const dispatch = useDispatch()

    const onClick = () => {

        let parentReg: Question = Object.assign(new Question(), JSON.parse(parentRegister));
        switch (type) {
            case ButtonTypes.add:{
                
                console.log('add to', parentReg)
                parentReg.addAnswer("string", QuestionTypes.string)


                dispatch({type: CONSTRUCTOR_MODIFY_QUESTIONNAIRE, payload: JSON.stringify(parentReg)})

                break;
            }
            case ButtonTypes.content:{

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