import { systemActionTypes } from "../types/system.types";

// systems
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

// system
export const getSystemStart = (systemName: string) => ({
  type: systemActionTypes.GET_SYSTEM_START,
  payload: systemName,
});

export const getSystemFailure = (err: any) => ({
  type: systemActionTypes.GET_SYSTEM_FAILURE,
  payload: err,
});

export const getSystemSuccess = (system: object) => ({
  type: systemActionTypes.GET_SYSTEM_SUCCESS,
  payload: system,
});

// update system
export const updateSystemStart = (systemName: string, formData: any) => ({
  type: systemActionTypes.UPDATE_SYSTEM_START,
  payload: { systemName, formData },
});

export const updateSystemFailure = (err: any) => ({
  type: systemActionTypes.UPDATE_SYSTEM_FAILURE,
  payload: err,
});

export const updateSystemSuccess = (system: any) => ({
  type: systemActionTypes.UPDATE_SYSTEM_SUCCESS,
  payload: system,
});
