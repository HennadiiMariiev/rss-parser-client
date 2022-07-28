import React, { LegacyRef, Ref, useCallback, useRef, useState } from 'react';
import { OverlayTrigger, Overlay, Tooltip } from 'react-bootstrap';

import { isMobile } from './isMobile';
import { ICategory } from '../interfaces/interfaces';
import { MOBILE_SLICE_COUNT, DEFAULT_SLICE_COUNT } from '../../config/vars';

import '../components/Posts/post.module.css';

export function prepareCategories(categories: ICategory[] = []) {
  const target = useRef<HTMLLIElement | null>(null);
  const [show, setShow] = useState(false);

  const cb = (item: ICategory, idx: number) => (
    <li key={idx} className="post-category">
      {item?.name}
    </li>
  );

  const SLICE_COUNT = isMobile() ? MOBILE_SLICE_COUNT : DEFAULT_SLICE_COUNT;

  const ToolTip = React.forwardRef((props, ref) => (
      <Tooltip id="category-tooltip" {...props} ref={ref as Ref<HTMLDivElement>}>
        {categories
          .slice(SLICE_COUNT)
          .map((item) => item?.name.toUpperCase())
          .join(', ')}
      </Tooltip>
  ));

  const toggleShow = () => setShow(!show);

  const othersEl = (
    <React.Fragment key="category-tooltip">
      <Overlay
        show={show}
        placement='bottom'
        target={target.current}
      >
        <ToolTip />
      </Overlay>
      <li className="post-category-others" key={'others'} ref={target} onMouseEnter={toggleShow} onMouseLeave={toggleShow}>
        AND {categories.length - SLICE_COUNT} OTHER...
      </li>
    </React.Fragment>
  );

  const categoriesWithOther = categories.slice(0, SLICE_COUNT).map(cb).concat(othersEl);
  const categoriesElements = categories.length > SLICE_COUNT ? categoriesWithOther : categories?.map(cb);

  return categoriesElements;
}
