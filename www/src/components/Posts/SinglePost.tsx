import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';

import { extractDateAndTime } from '../../helpers/extractDateAndTime';
import { isMobile } from '../../helpers/isMobile';
import { prepareCategories } from '../../helpers/prepareCategories';
import { ISinglePostProps } from '../../interfaces/interfaces';
import { useAppContext } from '../../providers/ContextProvider';

import './post.module.css';

function SinglePost({ post, setModal, setShowEditModal, isLoading = false }: ISinglePostProps) {
  const isMobileViewport = isMobile();
  const admin = useAppContext()?.admin;
  const pubDateAndTime = extractDateAndTime(post?.publication_date);
  const categories = useMemo(
    () => prepareCategories(post?.categories, !!isMobileViewport),
    [post?.categories, isMobileViewport]
  );

  const onDeleteClick = () => {
    setModal({ show: true, _id: post._id });
  };

  const onEditClick = () => {
    setShowEditModal({ post, show: true });
  };

  return (
    <li className="post">
      {admin?.isLoggedIn && (
        <div className="post-menu">
          <Button
            variant="light"
            size="sm"
            className="post-menu-button me-2"
            onClick={onDeleteClick}
            disabled={isLoading}
          >
            ❌ Delete
          </Button>
          <Button variant="light" size="sm" className="post-menu-button" onClick={onEditClick} disabled={isLoading}>
            ✍🏻 Edit
          </Button>
        </div>
      )}
      <div className="post-left-wrapper">
        <img src={post?.image} alt={post?.title} className="post-image" />
      </div>
      <div className="post-meta">
        <p className="post-date">{pubDateAndTime}</p>
        <ul className="post-categories-list">{categories}</ul>
        <h6 className="post-title">{post?.title}</h6>
        <p className="post-description" dangerouslySetInnerHTML={{ __html: post?.description }} />
        {post?.creator?.name && <i className="post-creator">by {post?.creator?.name}</i>}
        <a href={post?.link} className="post-link" target="__blank">
          Read on LifeHacker...
        </a>
      </div>
    </li>
  );
}

export default React.memo(SinglePost);
