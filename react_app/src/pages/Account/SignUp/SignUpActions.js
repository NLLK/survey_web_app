import axios from "axios";
import { toastOnError } from "../../../utils/Utils";

export const signUp = (userData, redirectTo, navigate) => {
  axios
    .post("/api/auth/signUp/", userData)
    .then(response => {
      console.log(response.data)
      navigate(redirectTo)
    })
    .catch(error => {
      toastOnError(error);
      console.log(error.response.data)
    });
};