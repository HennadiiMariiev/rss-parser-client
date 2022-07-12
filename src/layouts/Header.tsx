import React from 'react';

import './layout.module.css';

function Header({ children }: { children: React.ReactNode }) {
  return <header className="header">{children}</header>;
}

export default React.memo(Header);
