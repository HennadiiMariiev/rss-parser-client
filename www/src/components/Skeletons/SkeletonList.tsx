import React from 'react';

import PostSkeleton from './PostSkeleton';

import './skeletons.module.css';

function SkeletonList() {
  const skeletonList = Array.from({ length: 6 }, (_, idx) => <PostSkeleton key={idx} />);

  return <>{skeletonList}</>;
}

export default React.memo(SkeletonList);
