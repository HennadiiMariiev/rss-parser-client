import React, { useMemo } from 'react';

import SinglePost from './SinglePost';
import SkeletonList from '../Skeletons/SkeletonList';
import NoItems from './NoItems';
import { IPostsProps } from '../../interfaces/interfaces';

import './post.module.css';

function Posts({ isLoading, isFetching, posts = [], isError = false, error = null }: IPostsProps) {
  if (isLoading || isFetching) {
    return <SkeletonList />;
  }

  if (isError && error) {
    return (
      <div className="posts-wrapper">
        <NoItems error={error} isError />;
      </div>
    );
  }

  const postsList = useMemo(() => posts?.map((post, idx) => <SinglePost key={idx} post={post} />), [posts]);

  if (!postsList?.length) {
    return <NoItems />;
  }

  return <ul className="posts-wrapper">{postsList}</ul>;
}

export default React.memo(Posts);
