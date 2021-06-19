import { authSagas } from "./auth.sagas";
import { all, call } from "redux-saga/effects";
import { systemSagas } from "./systems.sagas";

export default function* rootSaga() {
  yield all([call(authSagas), call(systemSagas)]);
}
