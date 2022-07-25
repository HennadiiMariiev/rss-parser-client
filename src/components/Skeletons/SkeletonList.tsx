import React from 'react';

import PostSkeleton from './PostSkeleton';

import './skeletons.module.css';

function SkeletonList() {
  const skeletonList = Array.from({ length: 6 }, (_, idx) => <PostSkeleton key={idx} />);

  return <div className="skeleton-posts-wrapper">{skeletonList}</div>;
}

export default React.memo(SkeletonList);
