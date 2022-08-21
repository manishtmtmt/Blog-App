import { getData, removeData, saveData } from "../../Utils/localStorage";
import * as types from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: getData("isAuth") || false,
  token: getData("token") || "",
  userId: getData("userId") || "",
  user: {},
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case types.REGISTER_FAILURE: {
      return {
        ...state,
        isError: true,
      };
    }

    case types.LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.LOGIN_SUCCESS: {
      saveData("isAuth", true);
      saveData("token", payload.token);
      saveData("userId", payload.userId);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        userId: payload.userId
      };
    }

    case types.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: "",
        isError: true,
      };
    }

    case types.GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case types.GET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: payload,
      }
    }

    case types.GET_USER_FAILURE: {
      return {
        ...state,
        isError: false
      }
    }

    case types.LOGOUT: {
      removeData("userId");
      removeData("token");
      removeData("isAuth")
      return {
        ...state,
        isAuth: false,
        token: "",
      };
    }

    default: {
      return state;
    }
  }
};
