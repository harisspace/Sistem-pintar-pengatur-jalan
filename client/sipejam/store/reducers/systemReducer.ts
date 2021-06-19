import { systemActionTypes } from "../types/system.types";

const initialState = {
  systems: null,
  error: null,
  loading: false,
};

export const systemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case systemActionTypes.GET_SYSTEMS_START:
    case systemActionTypes.GET_SYSTEM_START:
      return {
        ...state,
        loading: true,
      };

    case systemActionTypes.GET_SYSTEM_SUCCESS:
      return {
        ...state,
        loading: false,
        systems: action.payload,
      };

    case systemActionTypes.GET_SYSTEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        systems: action.payload,
      };

    case systemActionTypes.GET_SYSTEMS_FAILURE:
    case systemActionTypes.GET_SYSTEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
