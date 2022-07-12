import React from 'react';

import './layout.module.css';

function SideBar({ children }: { children: React.ReactNode }) {
  return <aside className="sideBar">{children}</aside>;
}

export default React.memo(SideBar);
