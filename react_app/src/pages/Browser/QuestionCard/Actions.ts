import { Question, QuestionId } from "../../Constructor/Models/Models";

export function getPureIdString(origin: string): string {

    let split = origin.split(' ');
    return split[0];
}

export function findRegisterInRegister(registerOrigin: object, qIdOrigin: string): Question {
    let qId = new QuestionId()
    qId.setWithString(qIdOrigin)

    let lastElementIndex = qId.getLastElement() - 1

    let register = new Question()
    Object.assign(register, JSON.parse(JSON.stringify(registerOrigin)))

    return register.answersList[lastElementIndex]

}