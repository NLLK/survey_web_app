import axios from "axios";

export const GetQuestionnaireById = (setQInfo, qId ) => {
    const data = {
        'id': Number(qId)
    }
    axios
        .post("/api/constructor/getQuestionnaire/", data)
        .then(response => {
            let dataR = response.data
            let q = {
                id: dataR.id,
                name: dataR.name,
                comment: dataR.comment,
                fields: dataR.fields
            }
            setQInfo(prevState => ({
                ...prevState,
                name: dataR.name
            }));
            setQInfo(q)
            console.log('got questionnaire', q)
        })
} 

export const QuestionnaireTemplate = {
    id: 0,
    name: "",
    comment: "",
    fields: "{}"
}