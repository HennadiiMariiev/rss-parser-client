import React from 'react';

import classes from './layout.module.scss';

function SideBar({ children }: { children: React.ReactNode }) {
  return <aside className={classes.sideBar}>{children}</aside>;
}

export default React.memo(SideBar);
