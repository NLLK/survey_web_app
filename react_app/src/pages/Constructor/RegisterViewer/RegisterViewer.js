import * as React from 'react'

import { Question } from "../Models/Models";
import DivWithCoords from "./DivWithCoords"
import ViewerButton from "./ViewerButton"

import { ButtonTypes } from './ViewerButton'
import { connect } from 'react-redux';

const X_DIV = 100;

function RegisterViewer(props) {

    React.useEffect(()=>{

        console.log("registerViewer rerender")

    }, [props])

    let returnPage  = [];

    if (props.qFields !== '{}' && props.qFields !== undefined) {
        console.log('regViewer', props.qFields)
        let fields = JSON.parse(props.qFields)
    
        fields.forEach(rootQuestion => {
            returnPage.push(RenderQuestion(rootQuestion,props.showAddButtons))
        });
    }



    return (
        <>
            <div style={{ position: "relative", paddingLeft: "10 px", display: "flex", flexDirection: 'column' }}>
                {
                    returnPage.map((item, index) =>
                        <div key={index}>{item}</div>
                    )}
                {
                props.showAddButtons? 
                <ViewerButton type={ButtonTypes.addParent}>+</ViewerButton>
                : <></>
                }
            </div>
        </>
    )
}

function RenderQuestion(question, showAddButtons) {

    return (
        <div style={{ position: "relative", display: "flex", flexDirection: 'column' }}>
            <ViewerButton parentRegister={JSON.stringify(question)} type={ButtonTypes.content}>
                {question.id.string}
            </ViewerButton>

            <div style={{ position: "relative", left: X_DIV + "px", display: "flex", flexDirection: 'column' }}>
                {question.isQuestion ?
                    <>
                        {
                            question.answersList.map((item, index) => (
                                !item.isQuestion ?
                                    <ViewerButton key={index} parentRegister={JSON.stringify(item)} type={ButtonTypes.content}>
                                        {item.id.string}
                                    </ViewerButton>
                                    :
                                    RenderQuestion(item, showAddButtons)
                            ))
                        }
                        {showAddButtons? <ViewerButton type={ButtonTypes.add} parentRegister={JSON.stringify(question)}>+</ViewerButton> : <></>}
                    </>
                    :
                    showAddButtons? <ViewerButton type={ButtonTypes.add} parentRegister={JSON.stringify(question)}>+</ViewerButton> : <></>
                }
            </div>


        </div>
    )
} 
const mapStateToProps = (state) => {
    return{
        qFields: state.constructor.questionnaire.fields,
        showAddButtons: state.constructor.showAddButtons
    }
}

export default connect(mapStateToProps)(RegisterViewer)