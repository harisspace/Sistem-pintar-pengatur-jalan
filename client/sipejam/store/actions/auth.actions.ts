import { authActionTypes } from "../types/auth.types";

export const signinStart = (emailAndPassword: object) => ({
  type: authActionTypes.SIGN_IN_START,
  payload: emailAndPassword,
});

export const signinSuccess = (user: object) => ({
  type: authActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signinFailure = (err: any) => ({
  type: authActionTypes.SIGN_IN_FAILURE,
  payload: err,
});

export const signupStart = (emailUsernamePassword: object) => ({
  type: authActionTypes.SIGN_UP_START,
  payload: emailUsernamePassword,
});

export const signupSuccess = (message: string) => ({
  type: authActionTypes.SIGN_UP_SUCCESS,
  payload: message,
});

export const signupFailure = (err: any) => ({
  type: authActionTypes.SIGN_UP_FAILURE,
  payload: err,
});

export const OAuthStart = (codeQueryString: string) => ({
  type: authActionTypes.OAUTH_START,
  payload: codeQueryString,
});

export const OAuthSuccess = (user: object) => ({
  type: authActionTypes.OAUTH_SUCCESS,
  payload: user,
});

export const OAuthFailure = (message: string) => ({
  type: authActionTypes.OAUTH_FAILURE,
  payload: message,
});
