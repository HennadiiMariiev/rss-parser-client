import React from 'react';

import classes from './layout.module.scss';

function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>{children}</nav>
    </header>
  );
}

export default React.memo(Header);
