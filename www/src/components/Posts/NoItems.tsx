import React from 'react';

import classes from './post.module.scss';

function NoItems({ isError, error }: { isError?: boolean; error?: unknown }) {
  if (isError && error) {
    return (
      <div className={classes['no-items']}>
        <span className={classes['no-items-emoji']}>🤦</span>
        <span dangerouslySetInnerHTML={{ __html: error as string }} />
      </div>
    );
  }

  return (
    <div className={classes['no-items']}>
      <span className={classes['no-items-emoji']}>🧐</span>
      Posts Not Found
    </div>
  );
}

export default React.memo(NoItems);
