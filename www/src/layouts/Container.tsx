import React from 'react';

import './layout.module.css';

function Container({ children }: { children: React.ReactNode }) {
  return <div className="custom-container">{children}</div>;
}

export default React.memo(Container);
