import { all, call, put, takeLatest } from "redux-saga/effects";
import { getSystems } from "../api/system.request";
import { getSystemsFailure, getSystemsSuccess } from "../store/actions/system.action";
import { systemActionTypes } from "../store/types/system.types";

// === worker ===
function* workerGetSystems({ payload }: any): any {
  try {
    const data = yield getSystems(payload);
    yield put(getSystemsSuccess(data));
  } catch (err) {
    yield put(getSystemsFailure(err.response));
  }
}

// === watcher ===
function* watchGetSystemsStart() {
  yield takeLatest(systemActionTypes.GET_SYSTEMS_START, workerGetSystems);
}

export function* systemSagas() {
  yield all([call(watchGetSystemsStart)]);
}
