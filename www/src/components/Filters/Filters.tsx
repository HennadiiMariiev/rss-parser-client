import React, { useCallback, useState } from 'react';

import { IPagination, IFiltersProps } from '../../interfaces/interfaces';
import FiltersMarkup from './FiltersMarkup';

import './filters.module.css';

function Filters({
  setSortBy,
  setSortOrder,
  setSearch,
  pagination,
  setPagination,
}: IFiltersProps) {
  const [showModal, setShowModal] = useState(false);

  const onSortByChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value !== '0') setSortBy(e.target.value);
    },
    [setSortBy],
  );

  const onSortOrderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOrder(e.target.value);
    },
    [setSortOrder],
  );

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.trim() !== '' || text.length === 0) setSearch(text);
    },
    [setSearch],
  );

  const onLimitChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setPagination((prev: IPagination) => ({
        ...prev,
        page: 1,
        limit: Number(e.target.value),
      })),
    [setPagination],
  );

  return (
    <FiltersMarkup
      pagination={pagination}
      setShowModal={setShowModal}
      onLimitChange={onLimitChange}
      onSortByChange={onSortByChange}
      onSortOrderChange={onSortOrderChange}
      onSearch={onSearch}
      showModal={showModal}
    />
  );
}

export default React.memo(Filters);
