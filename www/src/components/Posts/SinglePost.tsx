import React, { useCallback, useMemo } from 'react';

import { extractDateAndTime } from '../../helpers/extractDateAndTime';
import { isMobile } from '../../helpers/isMobile';
import { prepareCategories } from '../../helpers/prepareCategories';
import { ISinglePostProps } from '../../interfaces/interfaces';
import { useAppContext } from '../../providers/ContextProvider';
import LightButton from '../Buttons/LightButton';

import './post.module.css';

function SinglePost({
  post,
  setModal,
  setShowEditModal,
  isLoading = false,
}: ISinglePostProps) {
  const isMobileViewport = isMobile();
  const admin = useAppContext()?.admin;
  const pubDateAndTime = extractDateAndTime(post?.publication_date);
  const categories = useMemo(
    () => prepareCategories(post?.categories, !!isMobileViewport),
    [post?.categories, isMobileViewport],
  );

  const onDeleteClick = useCallback(() => {
    setModal({ show: true, _id: post._id });
  }, [setModal]);

  const onEditClick = useCallback(() => {
    setShowEditModal({ post, show: true });
  }, [setShowEditModal]);

  return (
    <li className="post">
      {admin?.isLoggedIn && (
        <div className="post-menu">
          <LightButton
            onClick={onDeleteClick}
            className="post-menu-button me-2"
            disabled={isLoading}
            text="❌ Delete"
          />
          <LightButton
            onClick={onEditClick}
            className="post-menu-button"
            disabled={isLoading}
            text="✍🏻 Edit"
          />
        </div>
      )}
      <div className="post-left-wrapper">
        <img src={post?.image} alt={post?.title} className="post-image" />
      </div>
      <div className="post-meta">
        <p className="post-date">{pubDateAndTime}</p>
        <ul className="post-categories-list">{categories}</ul>
        <h6 className="post-title">{post?.title}</h6>
        <p
          className="post-description"
          dangerouslySetInnerHTML={{ __html: post?.description }}
        />
        {post?.creator?.name && (
          <i className="post-creator">by {post?.creator?.name}</i>
        )}
        <a href={post?.link} className="post-link" target="__blank">
          Read on LifeHacker...
        </a>
      </div>
    </li>
  );
}

export default React.memo(SinglePost);
