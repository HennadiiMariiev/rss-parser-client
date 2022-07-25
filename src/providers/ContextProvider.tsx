import React, { createContext, useContext, useState, useEffect } from 'react';

import ToastMessage from '../components/ToastMessage/ToastMessage';
import { IAdminState, IAppContext, IMessage } from '../interfaces/interfaces';
import { defaultAdminValue, defaultContextValue, defaultMessageValue } from './data';

const AppContext = createContext<IAppContext>(defaultContextValue);

export const useAppContext = () => {
  return useContext(AppContext);
};

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<IAdminState>(defaultAdminValue);
  const [message, setMessage] = useState<IMessage>(defaultMessageValue);

  useEffect(() => {
    if(message.text !== "") {
      setMessage((prev) => ({...prev, show: true}))
    }
  }, [message.text]);

  return (
    <AppContext.Provider value={{ admin, setAdmin, message, setMessage, }}>
      {children}
      <ToastMessage />
    </AppContext.Provider>
  );
}
