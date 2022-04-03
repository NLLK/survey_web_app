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

export function getParent(qIdOrigin: object): QuestionId {
    let qId = new QuestionId()
    Object.assign(qId, JSON.parse(JSON.stringify(qIdOrigin)))

    return qId.whoIsParent()
}

const INTERVAL_SEPARATOR = '.'
export function getIntervalsArray(originString:string): Array<number>{
    let splitArray = originString.split(INTERVAL_SEPARATOR)
    let first = Number(splitArray[0])
    let last = Number(splitArray[splitArray.length - 1])
    let ret = new Array<number>()
    ret.push(first);
    ret.push(last) 
    return ret
}