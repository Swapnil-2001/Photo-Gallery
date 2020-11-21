import React, { createContext, useContext, useReducer } from "react";

// Create data layer
export const StateContext = createContext();

// Build Provider, give it access to data layer
const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// This is how we use it inside a component
export const useStateValue = () => useContext(StateContext);

export default StateProvider;
