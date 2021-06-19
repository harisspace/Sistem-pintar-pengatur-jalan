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

export const getSystemStart = (systemName: string) => ({
  type: systemActionTypes.GET_SYSTEM_START,
});

export const getSystemFailure = (err: any) => ({
  type: systemActionTypes.GET_SYSTEM_FAILURE,
  payload: err,
});

export const getSystemSuccess = (system: object) => ({
  type: systemActionTypes.GET_SYSTEM_SUCCESS,
  payload: system,
});
