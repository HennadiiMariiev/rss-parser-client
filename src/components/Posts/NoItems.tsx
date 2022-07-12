import React from 'react';

import './post.module.css';

function NoItems({ isError, error }: { isError?: boolean, error?: unknown }) {
  if (isError && error) {
    return (
      <div className="no-items">
        <span className="no-items-emoji">🤦</span>
        <span dangerouslySetInnerHTML={{__html: error as string}} />
      </div>
    );
  }

  return (
    <div className="no-items">
      <span className="no-items-emoji">🧐</span>
      Posts Not Found
    </div>
  );
}

export default React.memo(NoItems);
