import React from 'react';
import { OverlayTrigger, Popover, PopoverProps } from 'react-bootstrap';

import { ICategory } from '../interfaces/interfaces';
import { MOBILE_SLICE_COUNT, DEFAULT_SLICE_COUNT } from '../../config/vars';

import '../components/Posts/post.module.css';

export function prepareCategories(categories: ICategory[] = [], isMobile: boolean) {
  const SLICE_COUNT = isMobile ? MOBILE_SLICE_COUNT : DEFAULT_SLICE_COUNT;

  const cb = (item: ICategory, idx: number) => (
    <li key={idx} className="post-category">
      {item?.name}
    </li>
  );

  const popover = (props: PopoverProps) => (
    <Popover id="category-tooltip" {...props}>
      <Popover.Header className="popover-header">Other categories</Popover.Header>
      <Popover.Body>
        {categories
          .slice(SLICE_COUNT)
          .map((item) => item?.name.toUpperCase())
          .join(', ')}
      </Popover.Body>
    </Popover>
  );

  const othersEl = (
    <OverlayTrigger key="category-tooltip" placement="bottom" overlay={popover}>
      <li className="post-category-others">
        <span className="post-category-text">AND {categories.length - SLICE_COUNT} OTHER...</span>
      </li>
    </OverlayTrigger>
  );

  const categoriesWithOther = categories.slice(0, SLICE_COUNT).map(cb).concat(othersEl);
  const categoriesElements = categories.length > SLICE_COUNT ? categoriesWithOther : categories?.map(cb);

  return categoriesElements;
}
