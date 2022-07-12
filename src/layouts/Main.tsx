import React from 'react';

import './layout.module.css';

function Main({ children }: { children: React.ReactNode }) {
  return <div className="main">{children}</div>;
}

export default Main;
