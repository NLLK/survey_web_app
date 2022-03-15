import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";

export default function RegisterEditor() {

	const questionnaire = useSelector(state => state.regEdit.register)
    return (
        <>
            <div style={{ display: "flex", alignItems: "flex-start", justifyItems: "center" }}>
                {questionnaire}
            </div>
        </>
    )
}