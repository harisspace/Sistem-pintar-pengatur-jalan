import React, { createContext, ReactChild, ReactPropTypes, useReducer } from "react";

export const JoinContext = createContext({});

const initialState = {
  status: false,
  data: "",
};

const joinReducer = (state: any, action: any) => {
  switch (action.type) {
    case "REQUEST_JOIN":
      return { ...state, status: true, data: action.payload };

    default:
      return state;
  }
};

const JoinContextProvider: React.FC = (props) => {
  const [isJoin, dispatchJoin] = useReducer(joinReducer, initialState);

  return <JoinContext.Provider value={{ isJoin, dispatchJoin }}>{props.children}</JoinContext.Provider>;
};

export default JoinContextProvider;
