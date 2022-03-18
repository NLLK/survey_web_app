import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";


import EditorButton from "./EditorButton"
import { ButtonTypes } from '../RegisterViewer/ViewerButton';

export default function RegisterEditor() {

    const questionnaire = useSelector(state => state.regEdit.register)

    const fields = () => {

        if (!questionnaire)
            return (<>Ашипка</>)

        let qObj = JSON.parse(questionnaire)

        return (
            <>
                <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                    <div style={{padding: "10px"}}>
                        <Typography>
                            {qObj.id.string} : {qObj.text}
                        </Typography>
                    </div>

                    <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                        {
                            qObj.answersList.map((item, index) => (
                                <EditorButton key={index} parentRegister={JSON.stringify(item)} type={ButtonTypes.content}>
                                {item.text}
                                </EditorButton>
                            ))
                        }
                    </div>
                </div>

            </>)
    }

    return (
        <>

            <>
                {
                    fields()
                }
                {/* <div style={{ display: "flex", alignItems: "flex-start", justifyItems: "center" }}>
                        {questionnaire}
                    </div> */}
            </>


        </>
    )
}