import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  IPost,
  IPostsProps,
  IResponseError,
} from '../../interfaces/interfaces';
import SinglePost from './SinglePost';
import SkeletonList from '../Skeletons/SkeletonList';
import NoItems from './NoItems';
import DialogModal from '../Modal/DialogModal';

import './post.module.css';
import { useDeleteSinglePost, useUpdatePost } from '../../api/posts';
import { useAppContext } from '../../providers/ContextProvider';
import { showError, showInfo } from '../../helpers/messageHelpers';
import EditPostModal from '../Modal/EditPostModal';
import {
  extractAddErrors,
  getErrorMessage,
} from '../../helpers/getErrorMessage';

function Posts({
  isLoading,
  isFetching,
  posts = [],
  isError = false,
  error = null,
}: IPostsProps) {
  const { setMessage } = useAppContext();

  const [modal, setModal] = useState({ show: false, _id: '' });
  const [editModal, setEditModal] = useState<{
    show: boolean;
    post: IPost | undefined;
  }>({ show: false, post: undefined });
  const postsList = useMemo(
    () =>
      posts?.map((post) => (
        <SinglePost
          key={post?._id}
          post={post}
          setModal={setModal}
          setShowEditModal={setEditModal}
          isLoading={isLoading || isFetching}
        />
      )),
    [posts, isLoading, isFetching],
  );
  const deletePost = useDeleteSinglePost();
  const updatePost = useUpdatePost();

  useEffect(() => {
    if (deletePost.isSuccess) {
      setModal({ show: false, _id: '' });
    }
    if (deletePost.isError && deletePost.error) {
      const error = deletePost.error as IResponseError;
      showError(setMessage, error.response?.data?.message);
    }
  }, [deletePost.isSuccess, deletePost.isError, setModal]);

  useEffect(() => {
    if (updatePost.isSuccess) {
      showInfo(setMessage, 'Post has been updated successfully 👌');
      onCloseEditModal();
    }
    if (updatePost.isError) {
      const errors = extractAddErrors(updatePost);
      const message = getErrorMessage(errors);
      showError(setMessage, message);
    }
  }, [updatePost.isSuccess, updatePost.isError]);

  const onPostDelete = useCallback(() => {
    if (modal._id) {
      deletePost.mutate(modal._id);
    }
  }, [modal._id, deletePost]);

  const onCloseModal = useCallback(() => {
    setModal((prev) => ({ ...prev, show: false }));
  }, [setModal]);

  const onCloseEditModal = useCallback(() => {
    setEditModal((prev) => ({ ...prev, show: false }));
  }, [setEditModal]);

  if (isLoading || isFetching) {
    return (
      <div className="posts-wrapper">
        <SkeletonList />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="posts-wrapper">
        <NoItems error={error} isError />
      </div>
    );
  }

  if (!postsList?.length) {
    return (
      <div className="posts-wrapper">
        <NoItems />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ul className="posts-wrapper">{postsList}</ul>
      <DialogModal
        showModal={modal.show}
        onCloseModal={onCloseModal}
        onConfirm={onPostDelete}
      />
      <EditPostModal
        editModal={editModal}
        onCloseModal={onCloseEditModal}
        updatePost={updatePost}
      />
    </React.Fragment>
  );
}

export default React.memo(Posts);
