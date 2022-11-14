import React from 'react';
import { Link } from 'react-router-dom';

import classes from './navbar.module.scss';

function Logo() {
  return (
    <Link className={classes.logo} to="/">
      <span className={classes['logo-emoji']}>📰</span>LifeHacker
    </Link>
  );
}

export default React.memo(Logo);
