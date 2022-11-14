import React from 'react';

import classes from './layout.module.scss';

function Container({ children }: { children: React.ReactNode }) {
  return <div className={classes['custom-container']}>{children}</div>;
}

export default React.memo(Container);
