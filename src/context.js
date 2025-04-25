import React, { createContext } from "react";
export const MyContext = createContext();

const AuthState = ({children}) => {
 
  return (
    <MyContext.Provider>
      {children}
    </MyContext.Provider>
  );
};

export default AuthState;
