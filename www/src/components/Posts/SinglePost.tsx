import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';

import { extractDateAndTime } from '../../helpers/extractDateAndTime';
import { isMobile } from '../../helpers/isMobile';
import { prepareCategories } from '../../helpers/prepareCategories';
import { ISinglePostProps } from '../../interfaces/interfaces';
import { useAppContext } from '../../providers/ContextProvider';
import LightButton from '../Buttons/LightButton';

import classes from './post.module.scss';

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
    <li className={classes.post}>
      {admin?.isLoggedIn && (
        <div className={classes['post-menu']}>
          <LightButton
            onClick={onDeleteClick}
            className={cn(classes['post-menu-button'], 'me-2')}
            disabled={isLoading}
            text="❌ Delete"
          />
          <LightButton
            onClick={onEditClick}
            className={classes['post-menu-button']}
            disabled={isLoading}
            text="✍🏻 Edit"
          />
        </div>
      )}
      <div className={classes['post-left-wrapper']}>
        <img
          src={post?.image}
          alt={post?.title}
          className={classes['post-image']}
          width="630"
          height="353"
          loading="lazy"
        />
      </div>
      <div className={classes['post-meta']}>
        <h6 className={classes['post-title']}>{post?.title}</h6>
        <p
          className={classes['post-description']}
          dangerouslySetInnerHTML={{ __html: post?.description }}
        />
        {post?.creator?.name && (
          <i className={classes['post-creator']}>by {post?.creator?.name}</i>
        )}
        <ul className={classes['post-categories-list']}>{categories}</ul>
        <p className={classes['post-date']}>{pubDateAndTime}</p>
        <a href={post?.link} className={classes['post-link']} target="__blank">
          Read on LifeHacker...
        </a>
      </div>
    </li>
  );
}

export default React.memo(SinglePost);
