import React from 'react';

import PostSkeleton from './PostSkeleton';

function SkeletonList() {
  const skeletonList = Array.from({ length: 6 }, (_, idx) => (
    <PostSkeleton key={idx} />
  ));

  return <React.Fragment>{skeletonList}</React.Fragment>;
}

export default React.memo(SkeletonList);
