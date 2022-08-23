import React from 'react';
import { Placeholder } from 'react-bootstrap';

import './skeletons.module.css';

function UserMenuSkeleton() {
  return (
    <div className="user-menu-skeleton">
      <Placeholder as={'div'} className="d-flex w-100" animation="glow">
        <Placeholder className="user-menu-skeleton-logo" />
        <Placeholder className="user-menu-skeleton-text me-2" />
        <Placeholder className="user-menu-skeleton-text" />
      </Placeholder>
    </div>
  );
}

export default React.memo(UserMenuSkeleton);
