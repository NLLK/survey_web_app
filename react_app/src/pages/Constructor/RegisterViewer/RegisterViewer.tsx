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

    // fields.forEach(rootQuestion => {
    //     returnPage.push(RenderQuestion(rootQuestion, startPoint))
    // });

    returnPage.push(RenderQuestion(fields[0], startPoint))

    return (
        <>{
            returnPage.map((item: JSX.Element, index: number) =>
                <>{item}</>
            )}
        </>

    )

}

function RenderQuestion(question: Question, startPoint: Point): JSX.Element {

    // let parentIdArray: Array<number> = question.id.array
    // let parentId: number = parentIdArray[parentIdArray.length - 1]
    // let parentPoint: Point = new Point(0, 0);
    // parentPoint.x = startPoint.x + (parentIdArray.length - 1) * X_DIV
    // parentPoint.y = startPoint.y + (parentId - 1) * Y_DIV

    return (
        <div>
            <ViewerButton >
                {question.id.string}
            </ViewerButton>
            <div style={{ position: "relative", left: X_DIV + "px" }}>
                {
                    question.answersList.map((item: Question, index: number) => (
                        <ViewerButton>
                            {item.id.string}
                        </ViewerButton>
                    ))
                }
            </div>

        </div>
    )
} 