import { all, call, put, takeLatest } from "redux-saga/effects";
import { getSystem, getSystems, updateSystem } from "../api/system.request";
import {
  getSystemFailure,
  getSystemsFailure,
  getSystemsSuccess,
  getSystemSuccess,
  updateSystemFailure,
  updateSystemSuccess,
} from "../store/actions/system.action";
import { systemActionTypes } from "../store/types/system.types";

// === worker ===
function* workerGetSystems(): any {
  try {
    const data = yield getSystems();
    yield put(getSystemsSuccess(data));
  } catch (err) {
    yield put(getSystemsFailure(err.response));
  }
}

function* workerGetSystem({ payload }: any): any {
  try {
    const data = yield getSystem(payload);
    yield put(getSystemSuccess(data));
  } catch (err) {
    yield put(getSystemFailure(err.response));
  }
}

function* workerUpdateSystem({ payload: { systemName, formData } }: any): any {
  try {
    const data = yield updateSystem(systemName, formData);
    yield put(updateSystemSuccess(data));
  } catch (err) {
    yield put(updateSystemFailure(err.response));
  }
}

// === watcher ===
function* watchGetSystemsStart() {
  yield takeLatest(systemActionTypes.GET_SYSTEMS_START, workerGetSystems);
}

function* watchGetSystemStart() {
  yield takeLatest(systemActionTypes.GET_SYSTEM_START, workerGetSystem);
}

function* watchUpdateSystemStart() {
  yield takeLatest(systemActionTypes.UPDATE_SYSTEM_START, workerUpdateSystem);
}

export function* systemSagas() {
  yield all([call(watchGetSystemsStart), call(watchGetSystemStart), call(watchUpdateSystemStart)]);
}
