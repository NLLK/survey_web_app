import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react'
import { connect, useDispatch, useSelector } from "react-redux";


import EditorButton from "./EditorButton"
import { ButtonTypes } from '../ConstructorButtonBase';

function RegisterEditor(props) {

    //const register = useSelector(state => state.constructor.register)

    React.useEffect(() => {

    }, [props])
    

    const fields = () => {

        if (!props.register)
            return (<></>)

        return (
            <>
                <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                    <div style={{ padding: "10px" }}>
                        <Typography>
                            {props.register.id.string} : {props.register.text} {(props.register.subText? "- " + props.register.subText : "")}
                        </Typography>
                    </div>

                    <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                        {
                            props.register.answersList.map((item, index) => (
                                <EditorButton key={index} parentRegister={JSON.stringify(item)} type={ButtonTypes.content}>
                                    {item.id.string}: {item.text}
                                </EditorButton>
                            ))
                        }
                    </div>
                    <EditorButton parentRegister={JSON.stringify(props.register)} type={ButtonTypes.add}>
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
const mapStateToProps = (state) => {
    return{
        register: state.constructor.register
    }
}

export default connect(mapStateToProps)(RegisterEditor)