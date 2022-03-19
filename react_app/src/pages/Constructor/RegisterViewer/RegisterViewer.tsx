import * as React from 'react'



import { Question } from "../Models/Models";
import DivWithCoords from "./DivWithCoords"
import ViewerButton from "./ViewerButton"

import { ButtonTypes } from './ViewerButton'
import { start } from 'repl';

const X_DIV: number = 100;

// class Point {
//     x: number = 0;
//     y: number = 0;

//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
// }

export default function RegisterViewer(qFields: string, showAddButtons: boolean): JSX.Element {

    if (qFields === '{}' || qFields === undefined) {
        return (
            <div>
            </div>
        )
    }

    console.log('regViewer', qFields)
    let fields: Array<Question> = JSON.parse(qFields)
    let returnPage: Array<JSX.Element> = [];

    fields.forEach(rootQuestion => {
        returnPage.push(RenderQuestion(rootQuestion,showAddButtons))
    });

    return (
        <>
            <div style={{ position: "relative", paddingLeft: "10 px", display: "flex", flexDirection: 'column' }}>
                {
                    returnPage.map((item: JSX.Element, index: number) =>
                        <div key={index}>{item}</div>
                    )}
                {
                showAddButtons? 
                <ViewerButton type={ButtonTypes.addParent}>+</ViewerButton>
                : <></>
                }
            </div>
        </>
    )
}

function RenderQuestion(question: Question, showAddButtons: boolean): JSX.Element {

    return (
        <div style={{ position: "relative", display: "flex", flexDirection: 'column' }}>
            <ViewerButton parentRegister={JSON.stringify(question)} type={ButtonTypes.content}>
                {question.id.string}
            </ViewerButton>

            <div style={{ position: "relative", left: X_DIV + "px", display: "flex", flexDirection: 'column' }}>
                {question.isQuestion ?
                    <>
                        {
                            question.answersList.map((item: Question, index: number) => (
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