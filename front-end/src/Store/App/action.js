import axios from "axios";
import { getData } from "../../Utils/localStorage";
import * as types from "./actionTypes";

export const createBlog = (params, payload) => (dispatch) => {
  const token = getData("token");
  dispatch({ type: types.CREATE_BLOG_REQUEST });
  return axios
    .post(
      `https://rich-blue-tick-ring.cyclic.app/blog/create/${params}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch({ type: types.CREATE_BLOG_SUCCESS, payload: res.data.message });
      return { status: types.CREATE_BLOG_SUCCESS, payload: res.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.CREATE_BLOG_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.CREATE_BLOG_FAILURE,
        payload: err.response.data.message,
      };
    });
};

export const getBlogs = (payload) => (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST });
  return axios
    .get("https://rich-blue-tick-ring.cyclic.app/blogs")
    .then((r) => {
      dispatch({ type: types.GET_BLOGS_SUCCESS, payload: r.data });
      return { status: types.GET_BLOGS_SUCCESS, message: r.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.GET_BLOGS_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.GET_BLOGS_FAILURE,
        payload: err.response.data.message,
      };
    });
};

export const getBlog = (params) => (dispatch) => {
  dispatch({ type: types.GET_BLOG_REQUEST });
  return axios
    .get(`https://rich-blue-tick-ring.cyclic.app/blog/${params}`)
    .then((r) => {
      dispatch({ type: types.GET_BLOG_SUCCESS, payload: r.data });
      return { status: types.GET_BLOG_SUCCESS, message: r.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.GET_BLOG_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.GET_BLOG_FAILURE,
        payload: err.response.data.message,
      };
    });
};

export const getUserBlogs = (params) => (dispatch) => {
  dispatch({ type: types.GET_BLOG_REQUEST });
  return axios
    .get(`https://rich-blue-tick-ring.cyclic.app/blogs/${params}`)
    .then((r) => {
      dispatch({ type: types.GET_USER_BLOGS_SUCCESS, payload: r.data });
      return { status: types.GET_USER_BLOGS_SUCCESS, message: r.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.GET_USER_BLOGS_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.GET_USER_BLOGS_FAILURE,
        payload: err.response.data.message,
      };
    });
};

export const updateBlog = (params, payload) => (dispatch) => {
  const token = getData("token");
  dispatch({ type: types.UPDATE_BLOG_REQUEST });
  return axios
    .patch(`https://rich-blue-tick-ring.cyclic.app/blog/${params}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      dispatch({ type: types.UPDATE_BLOG_SUCCESS, payload: r.data.message });
      return { status: types.UPDATE_BLOG_SUCCESS, message: r.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_BLOG_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.UPDATE_BLOG_FAILURE,
        message: err.response.data.message,
      };
    });
};

export const deleteBlog = (params) => (dispatch) => {
  const token = getData("token");
  dispatch({ type: types.DELETE_BLOG_REQUEST });
  return axios
    .delete(`https://rich-blue-tick-ring.cyclic.app/blog/${params}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: res.data.message });
      return { status: types.DELETE_BLOG_SUCCESS, message: res.data.message };
    })
    .catch((err) => {
      dispatch({
        type: types.DELETE_BLOG_FAILURE,
        payload: err.response.data.message,
      });
      return {
        status: types.DELETE_BLOG_FAILURE,
        message: err.response.data.message,
      };
    });
};
