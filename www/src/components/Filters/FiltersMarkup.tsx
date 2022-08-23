import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

import { IFiltersMarkupProps } from '../../interfaces/interfaces';
import { useAppContext } from '../../providers/ContextProvider';
import NewPostModal from '../Modal/NewPostModal';
import FilterOption from './FilterOption';

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
    <div className="filters-wrapper">
      <div className="w-100 d-flex align-items-center justify-content-between mb-1">
        <Form.Label id="creators" className="d-block fw-bold mb-1">
          Posts 📰&nbsp;<sup>({pagination.total})</sup>
        </Form.Label>
        {admin.isLoggedIn && (
          <Button variant="light" size="sm" onClick={() => setShowModal(true)}>
            ➕ New post
          </Button>
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

      <InputGroup className="filters-item">
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

      <InputGroup className="filters-item mb-2">
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

      <InputGroup className="filters-item mb-2" onChange={onSearch}>
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
