import React from 'react';
import cn from 'classnames';
import { Form, InputGroup } from 'react-bootstrap';

import { IFiltersMarkupProps } from '../../interfaces/interfaces';
import { useAppContext } from '../../providers/ContextProvider';
import LightButton from '../Buttons/LightButton';
import NewPostModal from '../Modal/NewPostModal';
import FilterOption from './FilterOption';

import classes from './filters.module.scss';

function FiltersMarkup({
  pagination,
  setShowModal,
  onLimitChange,
  onSortByChange,
  onSortOrderChange,
  onSearch,
  showModal,
}: IFiltersMarkupProps) {
  const { admin } = useAppContext();
  return (
    <div className={classes['filters-wrapper']}>
      <div className={classes['filters-header']}>
        <Form.Label id="creators" className="d-block fw-bold mb-0">
          Posts 📰&nbsp;
          <sup className={classes['filters-sup']}>({pagination.total})</sup>
        </Form.Label>
        {admin.isLoggedIn && (
          <LightButton onClick={() => setShowModal(true)} text="➕ New post" />
        )}
      </div>
      <InputGroup className="mb-2">
        <InputGroup.Text id="posts_per_page">Per page</InputGroup.Text>
        <Form.Select
          aria-label="Items per page"
          onChange={onLimitChange}
          aria-describedby="posts_per_page"
          defaultValue={12}
        >
          <option value="6">🔢 6</option>
          <option value="12">🔢 12</option>
          <option value="24">🔢 24</option>
        </Form.Select>
      </InputGroup>

      <InputGroup className={classes['filters-item']}>
        <InputGroup.Text id="sort_by">Sort by</InputGroup.Text>
        <Form.Select
          aria-label="Sort by field"
          onChange={onSortByChange}
          aria-describedby="sort_by"
        >
          <option value="publication_date">📅 Date</option>
          <option value="title">📋 Title</option>
        </Form.Select>
      </InputGroup>

      <InputGroup className={cn(classes['filters-item'], 'mb-2')}>
        <InputGroup.Text id="sort_order">Order by</InputGroup.Text>
        <Form.Select
          aria-label="Sort order"
          onChange={onSortOrderChange}
          aria-describedby="sort_order"
        >
          <option value="desc">⬇️ desc</option>
          <option value="asc">⬆️ asc</option>
        </Form.Select>
      </InputGroup>

      <InputGroup
        className={cn(classes['filters-item'], 'mb-2')}
        onChange={onSearch}
      >
        <InputGroup.Text id="search">🔍</InputGroup.Text>
        <Form.Control
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search"
        />
      </InputGroup>

      <FilterOption optionName="creators" />
      <FilterOption optionName="categories" />

      <NewPostModal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
      />
    </div>
  );
}

export default FiltersMarkup;
