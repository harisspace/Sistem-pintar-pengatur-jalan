import { authSagas } from "./auth.sagas";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([call(authSagas)]);
}
