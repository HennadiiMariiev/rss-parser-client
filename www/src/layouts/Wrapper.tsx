import React from 'react';

import classes from './layout.module.scss';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className={classes.wrapper}>{children}</div>;
}

export default React.memo(Wrapper);
