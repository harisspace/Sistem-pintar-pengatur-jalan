import { authActionTypes } from "../types/auth.types";

const initialState = {
  user: null,
  authenticated: false,
  loading: false,
  message: "",
  error: null,
};

export const authReducer = (state = initialState, action: any) => {
  console.log(action);

  switch (action.type) {
    case authActionTypes.SIGN_IN_START:
    case authActionTypes.SIGN_UP_START:
    case authActionTypes.OAUTH_START:
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case authActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        authenticated: false,
        loading: false,
        user: null,
        error: null,
        message: action.payload,
      };
    case authActionTypes.OAUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload,
        error: null,
        message: "",
      };
    case authActionTypes.SIGN_IN_FAILURE:
    case authActionTypes.SIGN_UP_FAILURE:
    case authActionTypes.OAUTH_FAILURE:
      return {
        ...state,
        authenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
