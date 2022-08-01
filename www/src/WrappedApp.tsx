import React from 'react';

import QueryProvider from './providers/QueryProvider';
import { ContextProvider } from './providers/ContextProvider';
import App from './App';

function WrappedApp() {
  return (
    <React.StrictMode>
      <QueryProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
      </QueryProvider>
    </React.StrictMode>
  )
}

export default React.memo(WrappedApp);