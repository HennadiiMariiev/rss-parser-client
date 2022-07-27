import React from 'react';
import { createRoot } from 'react-dom/client';

import WrappedApp from './WrappedApp';

import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error();
}

const root = createRoot(rootElement);
root.render(<WrappedApp />);
