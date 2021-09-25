import React, { useState } from 'react';

/**
 * creaes a conext which can be used to globally store data
 */
export const GlobalContext = React.createContext(null);

/**
 * Global callable getter and setter state (hook)
 * 
 * @returns isAuthenticated, setAuthenticated
 */
export function useGlobalState() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return {
    isAuthenticated,
    setAuthenticated,
  }
}
