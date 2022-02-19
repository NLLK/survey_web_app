import axios from "axios";
import { SET_QUESTIONNAIRES_CARDS } from "./SelectQuestionnaireTypes";
import { toastOnError } from "../../utils/Utils";

export const getQuestionnaireList = (dispatch) => {
    axios
        .get("/api/constructor/getQuestionnaireList/")
        .then(response => {
            const questionnaires = response.data;
            dispatch({
                type: SET_QUESTIONNAIRES_CARDS,
                payload: questionnaires
            })
        })
        .catch(error => {
            toastOnError(error);
        });
};
