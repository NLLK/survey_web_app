import * as React from 'react'
import { useDispatch } from 'react-redux';

import { Button, Typography } from "@mui/material";

import { ButtonSizes } from './Styling'

import { Question} from '../Models/Models'
import { CONSTRUCTOR_ADD_BLANK_QUESTION, CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION } from '../../Constructor/Reducer/ConstructorReducerTypes'
import {REGISTER_EDITOR_SET_REGISTER} from "../RegisterEditor/RegisterEditorReducer/RegisterEditorTypes"
import { HtmlTooltipViewerButton } from '../../Common/HtmlTooltip'

export enum ButtonTypes { add = "add", content = "content", addParent = "addParent" }

interface Props {
    //parentRegister?: Question;
    parentRegister?: string;
    type?: string;
    children?: string;
}

export default function ViewerButton({ parentRegister, type, children }: Props) {

    const dispatch = useDispatch()

    const [useToolTip, setUseToolTip] = React.useState(true);
    const [parentRegView, setParentRegView] = React.useState(new Question())

    let parentReg: Question;

    React.useEffect(() => {
        if (type === ButtonTypes.addParent || type === ButtonTypes.add) {
            setUseToolTip(false);
        }
        if (parentRegister !== undefined) {
             parentReg = Object.assign(new Question(), JSON.parse(parentRegister));
             setParentRegView(parentReg)
        }
    }, [])

    const onClick = () => {
        switch (type) {
            case ButtonTypes.add: {
                parentReg = Object.assign(new Question(), JSON.parse(parentRegister));
                // parentReg.addAnswer("string", QuestionTypes.string)
                
                //dispatch({ type: CONSTRUCTOR_MODIFY_QUESTIONNAIRE, payload: JSON.stringify(parentReg) })
                dispatch({ type: CONSTRUCTOR_ADD_BLANK_QUESTION, payload: parentReg.id.string})

                break;
            }
            case ButtonTypes.content: {
                dispatch({type: REGISTER_EDITOR_SET_REGISTER})
                break;
            }
            case ButtonTypes.addParent: {
                dispatch({type: CONSTRUCTOR_ADD_BLANK_PARENT_QUESTION})
                break;
            }
            default: break;
        }
    }

    return (
        <div style={{ margin: 10 + "px" }}>
            {useToolTip ?
                <HtmlTooltipViewerButton title={
                    <>
                        <Typography variant="body2">
                            {parentRegView.text}
                        </Typography>
                        <Typography variant="body2">
                            {parentRegView.subText}
                        </Typography>
                    </>
                }>
                    <Button variant="contained" style={ButtonSizes} onClick={onClick}>
                        {children}
                    </Button>
                </HtmlTooltipViewerButton>
                :
                <Button variant="contained" style={ButtonSizes} onClick={onClick}>
                    {children}
                </Button>
            }
        </div>

    );
}