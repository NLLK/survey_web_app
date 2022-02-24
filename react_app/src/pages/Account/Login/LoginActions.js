import axios from "axios";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../../utils/Utils";

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
};

export const setCurrentUser = (user, redirectTo, dispatch, navigate) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });

  if (redirectTo !== "") {
    navigate(redirectTo)
  }
};

export const setToken = (token, dispatch) => {
  setAxiosAuthToken(token);
  localStorage.token = token
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};

export const unsetCurrentUser = (dispatch) => {
  console.log('deleting token')
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER
  });
};

export const logout = (dispatch, navigate) => {
  axios
    .get("/api/auth/logout/")
    .then(response => {
      unsetCurrentUser(dispatch);
      navigate('/')
    })
    .catch(error => {
      unsetCurrentUser(dispatch);
      toastOnError(error);
    });
};