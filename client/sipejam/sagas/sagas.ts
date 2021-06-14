import { authSagas } from "./auth.sagas";
import { all, call } from "redux-saga/effects";
import { systemSagas } from "./systesm.sagas";

export default function* rootSaga() {
  yield all([call(authSagas), call(systemSagas)]);
}
