import React, { useEffect, useMemo, useState } from 'react';

import { IPost, IPostsProps, IResponseError } from '../../interfaces/interfaces';
import SinglePost from './SinglePost';
import SkeletonList from '../Skeletons/SkeletonList';
import NoItems from './NoItems';
import DialogModal from '../Modal/DialogModal';

import './post.module.css';
import { useDeleteSinglePost } from '../../api/posts';
import { useAppContext } from '../../providers/ContextProvider';
import { showError } from '../../helpers/messageHelpers';
import EditPostModal from '../Modal/EditPostModal';

function Posts({ isLoading, isFetching, posts = [], isError = false, error = null }: IPostsProps) {
  const {setMessage} = useAppContext();

  const [modal, setModal] = useState({show: false, _id: ""});
  const [showEditModal, setShowEditModal] = useState<{show: boolean, post: IPost | undefined}>({show: false, post: undefined});
  const postsList = useMemo(() => posts?.map((post) => <SinglePost key={post?._id} post={post} setModal={setModal} setShowEditModal={setShowEditModal} isLoading={isLoading || isFetching}/>), [posts, isLoading, isFetching]);
  const {mutate: deletePost, isError: isDeleteError, error: deleteError, isSuccess} = useDeleteSinglePost();

  useEffect(() => {
    if(isSuccess) {
      setModal({show: false, _id: ""});
    }
    if(isDeleteError && deleteError) {
      const error = deleteError as IResponseError;
      showError(setMessage, error.response?.data?.message)
    }
  }, [isSuccess, isDeleteError, setModal]);

  const onPostDelete = () => {
    if(modal._id) {
      deletePost(modal._id);
    }
  }

  const onCloseModal =() => {
    setModal((prev) => ({...prev, show: false}));
  }

  const onCloseEditModal =() => {
    setShowEditModal((prev) => ({...prev, show: false}));
  }

  if (isLoading || isFetching) {
    return <div className='posts-wrapper'><SkeletonList /></div>;
  }

  if (!postsList?.length) {
    return <NoItems />;
  }

  if (isError && error) {
    return (
      <div className="posts-wrapper">
        <NoItems error={error} isError />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ul className="posts-wrapper">{postsList}</ul>
      <DialogModal showModal={modal.show} onCloseModal={onCloseModal} onConfirm={onPostDelete}/>
      <EditPostModal showModal={showEditModal.show} onCloseModal={onCloseEditModal} post={showEditModal.post} />
    </React.Fragment>
  );
}

export default React.memo(Posts);
