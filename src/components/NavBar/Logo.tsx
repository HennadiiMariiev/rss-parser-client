import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.module.css';

function Logo() {
  return (
    <Link className="logo" to="/">
      <span className="logo-emoji">📰</span>LifeHacker
    </Link>
  );
}

export default Logo;
