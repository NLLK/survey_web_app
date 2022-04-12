import * as React from 'react'
import ViewerButton from "./ViewerButton"

import { ButtonTypes } from './ViewerButton'
import { connect } from 'react-redux';
import { QuestionTypes } from '../Models/Models';

const X_DIV = 100;

function RegisterViewer(props) {

    React.useEffect(() => {
    }, [props])

    let returnPage = [];

    if (props.qFields !== '{}' && props.qFields !== undefined) {
        console.log('regViewer', props.qFields)
        let fields = JSON.parse(props.qFields)

        fields.forEach(rootQuestion => {
            returnPage.push(RenderQuestion(rootQuestion, props.showAddButtons, props.register ? props.register.id.string : ""))
        });
    }

    return (
        <>
            <div style={{ position: "relative", paddingLeft: "10 px", display: "flex", flexDirection: 'column' }}>
                {
                    returnPage.map((item, index) =>
                        <div style={{ display: "flex" }} key={index}>{item}</div>
                    )}
                {
                    props.showAddButtons ?
                        <ViewerButton type={ButtonTypes.addParent}>+</ViewerButton>
                        : <></>
                }
            </div>
        </>
    )
}

function RenderQuestion(question, showAddButtons, registerId) {

    const isAdditional = () => {
        if (question.type === QuestionTypes.radio_button ||
            question.type === QuestionTypes.check_box ||
            question.type === QuestionTypes.intervals ||
            question.type === QuestionTypes.order)
            return false
        else if (question.answersList.length < 1)
            return false
        return true
    }

    return (
        <div style={{ position: "relative", display: "flex", flexDirection: 'column' }} key={question.id.string + "r"}>
            <ViewerButton
                key={question.id.string}
                parentRegister={JSON.stringify(question)}
                type={ButtonTypes.content}
                colorIt={question.id.string === registerId}>
                {question.id.string}
            </ViewerButton>

            <div style={{ position: "relative", left: X_DIV + "px", display: "flex", flexDirection: 'column' }}>
                {question.isQuestion ?
                    <>
                        {
                            question.answersList.map((item, index) => (
                                !item.isQuestion ?
                                    <ViewerButton
                                        key={item.id.string}
                                        parentRegister={JSON.stringify(item)}
                                        type={ButtonTypes.content}
                                        colorIt={item.id.string === registerId}>
                                        {item.id.string}
                                    </ViewerButton>
                                    :
                                    RenderQuestion(item, showAddButtons, registerId)
                            ))
                        }
                        {showAddButtons ?
                            <ViewerButton type={ButtonTypes.add} key={question.id.string + "+"} parentRegister={JSON.stringify(question)}>
                                + {isAdditional() ? "доп." : ""}
                            </ViewerButton>
                            : <></>}
                    </>
                    :
                    showAddButtons ? <ViewerButton type={ButtonTypes.add} key={question.id.string + "+"} parentRegister={JSON.stringify(question)}>+</ViewerButton> : <></>
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        qFields: state.constructor.questionnaire.fields,
        showAddButtons: state.constructor.showAddButtons,
        register: state.constructor.register
    }
}

export default connect(mapStateToProps)(RegisterViewer)