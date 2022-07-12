import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import QueryProvider from './providers/QueryProvider';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error();
}

const root = createRoot(rootElement);
root.render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
