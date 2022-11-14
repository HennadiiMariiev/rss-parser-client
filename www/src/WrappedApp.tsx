import React from 'react';

import QueryProvider from './providers/QueryProvider';
import { ContextProvider } from './providers/ContextProvider';
import App from './App';

function WrappedApp() {
  return (
    <QueryProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
    </QueryProvider>
  )
}

export default React.memo(WrappedApp);