import React from 'react';
import cn from 'classnames';
import { Placeholder } from 'react-bootstrap';

import classes from './skeletons.module.scss';

function UserMenuSkeleton() {
  return (
    <div className={classes['user-menu-skeleton']}>
      <Placeholder as={'div'} className="d-flex w-100" animation="glow">
        <Placeholder className={classes['user-menu-skeleton-logo']} />
        <Placeholder
          className={cn(classes['user-menu-skeleton-text'], 'me-2')}
        />
        <Placeholder className={classes['user-menu-skeleton-text']} />
      </Placeholder>
    </div>
  );
}

export default React.memo(UserMenuSkeleton);
