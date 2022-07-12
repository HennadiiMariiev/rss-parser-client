import React from 'react';

import './navbar.module.css';

function UserMenu() {
  return (
    <div className="user-menu">
      <span className="logo-emoji">👤</span>Welcome,&nbsp;
      <a className="user-menu-name" href="/login">
        guest!
      </a>
    </div>
  );
}

export default UserMenu;
