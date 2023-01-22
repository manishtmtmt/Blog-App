import * as types from "./actionTypes";
import axios from "axios";
import { getData } from "../../Utils/localStorage";

export const register = (payload) => (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  return axios
    .post("https://rich-blue-tick-ring.cyclic.app/auth/register", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((r) => {
      dispatch({ type: types.REGISTER_SUCCESS, payload: r.data.message });
      return { status: types.REGISTER_SUCCESS, message: r.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.REGISTER_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.REGISTER_FAILURE,
        message: err.response.data.message,
      };
    });
};

export const login = (payload) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post("https://rich-blue-tick-ring.cyclic.app/auth/login", payload)
    .then((r) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { token: r.data.token, userId: r.data.userId },
      });
      return { status: types.LOGIN_SUCCESS, message: r.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.LOGIN_FAILURE,
        message: err.response.data.message,
      };
    });
};

export const resetPassword = (payload) => (dispatch) => {
  dispatch({ type: types.RESET_PASSWORD_REQUEST });
  return axios
    .patch(
      "https://rich-blue-tick-ring.cyclic.app/auth/forgetpassword",
      payload
    )
    .then((r) => {
      dispatch({ type: types.RESET_PASSWORD_SUCCESS, payload: r.data.message });
      return { status: types.RESET_PASSWORD_SUCCESS, message: r.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.RESET_PASSWORD_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.RESET_PASSWORD_FAILURE,
        message: err.response.data.message,
      };
    });
};

export const getUser = (params) => (dispatch) => {
  const token = getData("token");
  dispatch({ type: types.GET_USER_REQUEST });
  return axios
    .get(`https://rich-blue-tick-ring.cyclic.app/profile/${params}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      dispatch({ type: types.GET_USER_SUCCESS, payload: r.data });
      return { status: types.GET_USER_SUCCESS, payload: r.data };
    })
    .catch((err) => {
      dispatch({
        type: types.GET_USER_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.GET_USER_FAILURE,
        message: err.response.data.message,
      };
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: types.LOGOUT });
};
