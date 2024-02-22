"use client"
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [globalDocIsBlock, setGlobalDocIsBlock] = useState('disabled'); //state is used as css class!
  const [globalVariable2, setGlobalVariable2] = useState('valorInicial2'); 

  return (
    <GlobalContext.Provider value={{ 
        globalDocIsBlock, 
        setGlobalDocIsBlock, 
      globalVariable2, 
      setGlobalVariable2 
      // Agrega más variables aquí
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
