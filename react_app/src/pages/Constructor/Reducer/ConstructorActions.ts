import { Question, QuestionId, Questionnaire } from "../Models/Models";

export function ModifyQuestionnaire(origin: string, element: string): Questionnaire{

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(origin))

    let elementQ: Question = new Question()
    Object.assign(elementQ, JSON.parse(element))

    originQ.modifyQuestionnaire(elementQ)
    
    return originQ;

}

export function AddParentQuestion(origin: string): Questionnaire{
    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(origin))

    originQ.addRootQuestion(new Question())

    return originQ;
}
export function AddQuestion(origin: string, id: string): Questionnaire{
    let originQID: QuestionId = new QuestionId()
    originQID.setWithString(id)

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(origin))

    originQ.addQuestionById(originQID)

    return originQ;
}