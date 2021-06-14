import { systemActionTypes } from "../types/system.types";

export const getSystemsStart = () => ({
  type: systemActionTypes.GET_SYSTEMS_START,
});

export const getSystemsFailure = (err: any) => ({
  type: systemActionTypes.GET_SYSTEMS_FAILURE,
  payload: err,
});

export const getSystemsSuccess = (systems: object[]) => ({
  type: systemActionTypes.GET_SYSTEMS_SUCCESS,
  payload: systems,
});
