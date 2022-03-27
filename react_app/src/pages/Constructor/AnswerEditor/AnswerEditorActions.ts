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

export function getQuestionIdByString(idStr: string): QuestionId{
    let newQid = new QuestionId()
    newQid.setWithString(idStr)
    return newQid
}

export function getRootQuestion(idObj: object): QuestionId{
    let id = new QuestionId()
    Object.assign(id, idObj)

    let parent = id.getRootQuestion()

    return parent
}