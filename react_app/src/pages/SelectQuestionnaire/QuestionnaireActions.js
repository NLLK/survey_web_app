import axios from "axios";

export const GetQuestionnaireById = async (qId) => {
    const data = {
        'id': Number(qId)
    }
    let q = {
        id: 0,
        name: '',
        comment: '',
        fields: {}
    }
    await axios
        .post("/api/constructor/getQuestionnaire/", data)
        .then(response => {
            let dataR = response.data

            q.id = dataR.id
            q.name = dataR.name
            q.comment = dataR.comment
            q.fields = dataR.fields
            q.introduction = dataR.introduction
            q.hidden = dataR.hidden

            console.log('got questionnaire', q)
        })
    return q;
}