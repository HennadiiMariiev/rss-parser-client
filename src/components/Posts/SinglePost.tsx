import React from 'react';

import { extractDateAndTime } from '../../helpers/extractDateAndTime';
import { prepareCategories } from '../../helpers/prepareCategories';
import { IPost } from '../../interfaces/interfaces';

import './post.module.css';

function SinglePost({ post }: { post: IPost }) {
  const categories = prepareCategories(post?.categories);

  const pubDateAndTime = extractDateAndTime(post?.publication_date);

  return (
    <li className="post">
      <div className="post-left-wrapper">
        <img src={post?.image} alt={post?.title} className="post-image" />
      </div>
      <div className="post-meta">
        <p className="post-date">{pubDateAndTime}</p>
        <ul className="post-categories-list">{categories}</ul>
        <h6 className="post-title">{post?.title}</h6>
        <p className="post-description" dangerouslySetInnerHTML={{ __html: post?.description }} />
        <i className="post-creator">by {post?.creator?.name}</i>
        <a href={post?.link} className="post-link" target="__blank">
          Read on LifeHacker...
        </a>
      </div>
    </li>
  );
}

export default SinglePost;
