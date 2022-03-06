import * as React from 'react'

import { Question } from "../Models/Models";

import ViewerButton from "./ViewerButton"

export default function RegisterViewer(qFields: string): JSX.Element {
    if (qFields === '{}') {
        return (
            <div>
            </div>
        )
    }
    let fields: Array<Question> = JSON.parse(qFields)

    let returnPage: Array<JSX.Element> = [];

    fields.forEach(rootQuestion => {
        returnPage.push(RenderQuestion(rootQuestion))
    });

    return (
        <>
            {
                returnPage.map((item: JSX.Element, index: number) =>
                    <>
                        {item}
                    </>
                )
            }
        </>

    )

}

function RenderQuestion(question: Question): JSX.Element {
    

    return (
        <>
            <ViewerButton x={30} y={20}>
                {question.id.string}
            </ViewerButton> 
            {
                question.answersList.map((item: Question, index: number)=>(
                    <ViewerButton x={60} y={40+20*index}>
                        {item.id.string}
                    </ViewerButton>
                ))
            }
            
        </>
    )
} 