import * as React from 'react'

import { Question } from "../Models/Models";
import DivWithCoords from "./DivWithCoords"
import ViewerButton from "./ViewerButton"

const X_DIV: number = 100;

class Point {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default function RegisterViewer(qFields: string): JSX.Element {
    if (qFields === '{}') {
        return (
            <div>
            </div>
        )
    }
    let fields: Array<Question> = JSON.parse(qFields)

    let returnPage: Array<JSX.Element> = [];

    let startPoint: Point = new Point(20, 20);

    fields.forEach(rootQuestion => {
        console.log(rootQuestion)
        returnPage.push(RenderQuestion(rootQuestion))
    });

    //returnPage.push(RenderQuestion(fields[0], startPoint))

    return (
        <>{
            returnPage.map((item: JSX.Element, index: number) =>
                <div key={index}>{item}</div>
            )}
        </>

    )

}

function RenderQuestion(question: Question): JSX.Element {

    // let parentIdArray: Array<number> = question.id.array
    // let parentId: number = parentIdArray[parentIdArray.length - 1]
    // let parentPoint: Point = new Point(0, 0);
    // parentPoint.x = startPoint.x + (parentIdArray.length - 1) * X_DIV
    // parentPoint.y = startPoint.y + (parentId - 1) * Y_DIV

    return (
        <div style={{ position: "relative"}}>
            <ViewerButton >
                {question.id.string}
            </ViewerButton>
            {question.answersList ? 
            <div style={{ position: "relative", left: 100 + "px" }}>
                {
                    question.answersList.map((item: Question, index: number) => (
                        !item.answersList? 
                        <ViewerButton key={index}>
                            {item.id.string}
                        </ViewerButton>
                        :
                        RenderQuestion(item)
                    ))
                }
            </div> : <p>a</p>}

        </div>
    )
} 