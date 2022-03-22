import axios from "axios";
import { CONSTRUCTOR_SAVING_COMPLETE } from "../Reducer/ConstructorReducerTypes";

export const SaveQuestionnaire = (questionnaire, dispatch) => {

    axios
        .post("/api/constructor/editQuestionnaire/", questionnaire)
        .then(response => {
            dispatch({type: CONSTRUCTOR_SAVING_COMPLETE})
            console.log("Сохранено")
        })
        .catch(error => {
           console.error(error)
        });
}