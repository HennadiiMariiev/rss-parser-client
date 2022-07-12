import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import debounce from 'lodash.debounce';

import {IPagination, IFiltersProps} from '../../interfaces/interfaces';
import FilterOption from './FilterOption';

import './filters.module.css';

function Filters({ setSortBy, setSortOrder, setSearch,setCreators, setCategories, creators, categories, pagination, setPagination }: IFiltersProps) {
  const onSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== '0') setSortBy(e.target.value);
  };
  const onSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if(text.trim() !== '' || text.length === 0)
        debouncedSearch(e.target.value);
  };

  const onLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
  setPagination((prev: IPagination) => ({ ...prev, page: 1, limit: Number(e.target.value) }));


  const debouncedSearch = useCallback(debounce(setSearch as any, 300), []);

  return (
    <div className="filters-wrapper">
      <Form.Label id="creators" className="d-block fw-bold mb-1">
        Posts 📰&nbsp;<sup>({pagination.total})</sup>
      </Form.Label>
      <InputGroup className='mb-2'>
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

      <InputGroup className="filters-item" >
        <InputGroup.Text id="sort_by">Sort by</InputGroup.Text>
        <Form.Select aria-label="Sort by field" onChange={onSortByChange} aria-describedby="sort_by" >
            <option value="publication_date">📅 Date</option>
            <option value="title">📋 Title</option>
        </Form.Select>
      </InputGroup>
      
      <InputGroup className="filters-item mb-2">
        <InputGroup.Text id="sort_order">Order by</InputGroup.Text>
        <Form.Select aria-label="Sort order" onChange={onSortOrderChange} aria-describedby="sort_order">
            <option value="desc">⬇️ desc</option>
            <option value="asc">⬆️ asc</option>
        </Form.Select>
      </InputGroup>

      <InputGroup className="filters-item  mb-2" onChange={onSearch}>
        <InputGroup.Text id="search">🔍</InputGroup.Text>
        <Form.Control placeholder="Search..." aria-label="Search" aria-describedby="search" />
      </InputGroup>

      <FilterOption setOption={setCreators} option={creators} optionName="creators" />

      <FilterOption setOption={setCategories} option={categories} optionName="categories" />
    </div>
  );
}

export default React.memo(Filters);
