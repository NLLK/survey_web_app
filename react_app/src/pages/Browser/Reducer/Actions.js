function getTemplateForStorageItem(question){
    let array = []
    question.answersList.forEach(element => {
        array.push({id: element.id.string, data: null})

        if (element.answersList.length !== 0)
            array = array.concat(getTemplateForStorageItem(element))
    });
    return array
}

export function getTemplateForStorage(questionList){

    let array = []

    questionList.forEach(question => {
        array = array.concat(getTemplateForStorageItem(question))
    });

    let dataMap = {};

    array.forEach(element => {
        dataMap[element.id] = null;
    });
    
    return dataMap

}