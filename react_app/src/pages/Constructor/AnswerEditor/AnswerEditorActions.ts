import { QuestionId } from "../Models/Models";

export function isIdParent(id: object): boolean{

    let originQId: QuestionId = new QuestionId()
    Object.assign(originQId, JSON.parse(JSON.stringify(id)))


    return originQId.isParentQuestion();
}

export function couldBeAdditional(id: object): boolean {
    let originQId: QuestionId = new QuestionId()
    Object.assign(originQId, JSON.parse(JSON.stringify(id)))


    return originQId.couldBeAdditional();
}