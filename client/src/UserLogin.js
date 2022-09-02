import React,  { createContext } from 'react';

export const UserContext = createContext();

export const UserLoginProvider = ({children, value}) => (
  <UserContext.Provider value={ value }>
    { children }
  </UserContext.Provider>
);
