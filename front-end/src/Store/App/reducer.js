import * as types from "./actionTypes";

const initState = {
  isLoading: false,
  error: "",
  blogs: [],
  blog: {},
  userBlogs: [],
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.CREATE_BLOG_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.CREATE_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case types.CREATE_BLOG_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }

    case types.GET_BLOGS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.GET_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        blogs: payload,
      };
    }

    case types.GET_BLOGS_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }

    case types.GET_BLOG_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.GET_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        blog: payload,
      };
    }

    case types.GET_BLOG_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }

    case types.GET_USER_BLOGS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.GET_USER_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userBlogs: payload,
      };
    }

    case types.GET_USER_BLOGS_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }

    case types.UPDATE_BLOG_REQUEST: {
        return {
          ...state,
          isLoading: true,
        };
      }
  
      case types.UPDATE_BLOG_SUCCESS: {
        return {
          ...state,
          isLoading: false,
        };
      }
  
      case types.UPDATE_BLOG_FAILURE: {
        return {
          ...state,
          error: payload,
        };
      }

    default: {
      return state;
    }
  }
};
