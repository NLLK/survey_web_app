import axios from "axios";
import { push } from "connected-react-router";
//import { toast } from "react-toastify";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../../utils/Utils";

import { useNavigate } from "react-router-dom";

export const login = (userData, redirectTo, dispatch, navigate) => {
  axios
    .post("/api/auth/api-token-auth/", userData)
    .then(response => {
      const auth_token = response.data.token;
      setAxiosAuthToken(auth_token);
      setToken(auth_token, dispatch)
      getCurrentUser(redirectTo, dispatch, navigate);
    })
    .catch(error => {
      unsetCurrentUser(dispatch);
      toastOnError(error);
    });
};

export const getCurrentUser = (redirectTo, dispatch, navigate) => {
  setAxiosAuthToken(localStorage.token);
  axios
    .get("/api/auth/who-am-i/")
    .then(response => {
      const user = response.data;
      setCurrentUser(user, redirectTo, dispatch, navigate);
    })
    .catch(error => {
      unsetCurrentUser(dispatch);
      toastOnError(error);
    });
  console.log(localStorage.user)
};

export const setCurrentUser = (user, redirectTo, dispatch, navigate) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });

  if (redirectTo !== "") {
    console.log("Trying to redirect to: ", redirectTo)
    navigate(redirectTo)
  }
};

export const setToken = (token, dispatch) => {
  setAxiosAuthToken(token);
  //localStorage.setItem("token", token);
  localStorage.token = token
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};

export const unsetCurrentUser = (dispatch) => {
  console.log('deleting')
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER
  });
};

export const logout = () => dispatch => {
  axios
    .post("/api/v1/token/logout/")
    .then(response => {
      dispatch(unsetCurrentUser());
      dispatch(push("/"));
      alert("Bye bye")
      //toast.success("Logout successful.");
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};