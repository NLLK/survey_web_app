import { Question, QuestionId, Questionnaire } from "../Models/Models";
import { TemplateTypes } from "../Templates/TemplateTypes";

export function ModifyQuestionnaire(origin: object, element: object): Questionnaire{

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(JSON.stringify(origin)))

    let elementQ: Question = new Question()
    Object.assign(elementQ, JSON.parse(JSON.stringify(element)))

    originQ.modifyQuestionnaire(elementQ)
    
    return originQ;

}
export function AddParentQuestion(origin: string): Questionnaire{
    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(origin))
    originQ.autoSetQuestionList();

    originQ.addRootQuestion()

    return originQ;
}
export function AddQuestion(origin: object, id: string): Questionnaire{
    let originQID: QuestionId = new QuestionId()
    originQID.setWithString(id)
    

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(JSON.stringify(origin)))
    
    originQ.addQuestionById(originQID)

    return originQ;
}
export function FindRegisterById(origin: object, idString: string): Question{

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(JSON.stringify(origin)))
    
    let originQID: QuestionId = new QuestionId()
    originQID.setWithString(idString)

    return originQ.findQuestionById(originQID);
}
export function FindRegisterByIdNext(origin: object, idString: string): Question{

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(JSON.stringify(origin)))
    
    let originQID: QuestionId = new QuestionId()
    originQID.setWithString(idString)

    let newQId = originQ.getLastChildIdById(originQID)

    return originQ.findQuestionById(newQId);
}
export function AddWithTemplate(origin: object, template: TemplateTypes, register: object): Questionnaire{

    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(JSON.stringify(origin)))
    
    let question = new Question()
    Object.assign(question, JSON.parse(JSON.stringify(register)))

    originQ.addQuestionsWithTemplate(template, question)

    return originQ;
}

export function DeleteQuestion(origin: object, questionId: object): Questionnaire {
    let originQ: Questionnaire = new Questionnaire()
    Object.assign(originQ, JSON.parse(JSON.stringify(origin)))
    
    let originId = new QuestionId()
    Object.assign(originId, JSON.parse(JSON.stringify(questionId)))

    originQ.deleteQuestion(originId)

    return originQ; 
}