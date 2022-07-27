import React from 'react';

import './layout.module.css';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="wrapper">{children}</div>;
}

export default React.memo(Wrapper);
