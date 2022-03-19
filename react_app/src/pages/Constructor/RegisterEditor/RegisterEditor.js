import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";


import EditorButton from "./EditorButton"
import { ButtonTypes } from '../ConstructorButtonBase';

export default function RegisterEditor() {

    const register = useSelector(state => state.constructor.register)

    const fields = () => {

        if (!register)
            return (<>Ашипка</>)

        return (
            <>
                <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                    <div style={{ padding: "10px" }}>
                        <Typography>
                            {register.id.string} : {register.text}
                        </Typography>
                    </div>

                    <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                        {
                            register.answersList.map((item, index) => (
                                <EditorButton key={index} parentRegister={JSON.stringify(item)} type={ButtonTypes.content}>
                                    {item.id.string}: {item.text}
                                </EditorButton>
                            ))
                        }
                    </div>
                    <EditorButton parentRegister={JSON.stringify(register)} type={ButtonTypes.add}>
                        *Добавить*
                    </EditorButton>
                </div>

            </>)
    }

    return (
        <>
            {
                fields()
            }
        </>
    )
}