import React from 'react';

import './layout.module.css';

function Header({ children }: { children: React.ReactNode }) {
  return ( 
    <header className="header">
      <nav className='navigation'>
        {children}
      </nav>
    </header>
  )
}

export default React.memo(Header);
