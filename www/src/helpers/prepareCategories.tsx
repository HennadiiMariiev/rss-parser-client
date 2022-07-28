import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { isMobile } from './isMobile';
import { ICategory } from '../interfaces/interfaces';
import { MOBILE_SLICE_COUNT, DEFAULT_SLICE_COUNT } from '../../config/vars';

import '../components/Posts/post.module.css';

export function prepareCategories(categories: ICategory[] = []) {
  const cb = (item: ICategory, idx: number) => (
    <li key={idx} className="post-category">
      {item?.name}
    </li>
  );

  const SLICE_COUNT = isMobile() ? MOBILE_SLICE_COUNT : DEFAULT_SLICE_COUNT;

  const toolTip = (
    <Tooltip id="category-tooltip">
      {categories
        .slice(SLICE_COUNT)
        .map((item) => item?.name.toUpperCase())
        .join(', ')}
    </Tooltip>
  );

  const othersEl = (
    <OverlayTrigger key="category-tooltip" placement="bottom" overlay={toolTip}>
      <li className="post-category-others" key={'others'}>
        AND {categories.length - SLICE_COUNT} OTHER...
      </li>
    </OverlayTrigger>
  );

  const categoriesWithOther = categories.slice(0, SLICE_COUNT).map(cb).concat(othersEl);
  const categoriesElements = categories.length > SLICE_COUNT ? categoriesWithOther : categories?.map(cb);

  return categoriesElements;
}
