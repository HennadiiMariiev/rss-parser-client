import React from 'react';

import classes from './layout.module.scss';

function Main({ children }: { children: React.ReactNode }) {
  return <div className={classes.main}>{children}</div>;
}

export default Main;
