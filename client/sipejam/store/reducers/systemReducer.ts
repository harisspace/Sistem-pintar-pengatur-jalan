import { systemActionTypes } from "../types/system.types";

const initialState = {
  error: null,
  loading: true,
  system: null,
};

export const systemReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case systemActionTypes.GET_SYSTEM_START:
    case systemActionTypes.UPDATE_SYSTEM_START:
      return {
        ...state,
        loading: true,
      };

    case systemActionTypes.GET_SYSTEM_SUCCESS:
    case systemActionTypes.UPDATE_SYSTEM_SUCCESS:
      return {
        ...state,
        loading: false,
        system: action.payload,
      };

    case systemActionTypes.GET_SYSTEM_FAILURE:
    case systemActionTypes.UPDATE_SYSTEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
