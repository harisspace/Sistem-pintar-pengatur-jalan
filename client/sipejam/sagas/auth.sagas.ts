import { all, call, put, takeLatest } from "redux-saga/effects";
import { signin, signup, OAuthData } from "../api/auth.request";
import {
  OAuthFailure,
  OAuthSuccess,
  signinFailure,
  signinSuccess,
  signupFailure,
  signupSuccess,
} from "../store/actions/auth.actions";
import { authActionTypes } from "../store/types/auth.types";

// === worker ===

function* workerSignin({ payload }: any): any {
  try {
    const data = yield signin(payload);
    yield put(signinSuccess(data));
  } catch (err) {
    yield put(signinFailure(err.response.data.errors));
  }
}

function* workerSignup({ payload }: any): any {
  try {
    const data = yield signup(payload);
    yield put(signupSuccess(data));
  } catch (err) {
    yield put(signupFailure(err.response?.data.errors));
  }
}

function* workerOAuth({ payload }: any): any {
  try {
    const data = yield OAuthData(payload);
    yield put(OAuthSuccess(data));
  } catch (err) {
    yield put(OAuthFailure(err.response?.data));
  }
}

// === watcher ===
function* watchSigninStart() {
  yield takeLatest(authActionTypes.SIGN_IN_START, workerSignin);
}

function* watchSignupStart() {
  yield takeLatest(authActionTypes.SIGN_UP_START, workerSignup);
}

function* wathcOAuthStart() {
  yield takeLatest(authActionTypes.OAUTH_START, workerOAuth);
}

// root auth watcher
export function* authSagas() {
  yield all([call(watchSigninStart), call(watchSignupStart), call(wathcOAuthStart)]);
}
