import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

import { isMobile } from '../../helpers/isMobile';
import { IPagination, IPaginationProps } from '../../interfaces/interfaces';

function Paginator({ pagination, setPagination }: IPaginationProps) {
  const { page, pageCount } = pagination;
  const isMobileView = isMobile();

  const paginationItems = useMemo(() => {
    const pages: JSX.Element[] = [];

    for (let n = 1; n <= pageCount; n++) {
      pages.push(
        <Pagination.Item key={n} active={n === page} onClick={() => onPaginationClick(n)}>
          {n}
        </Pagination.Item>
      );
    }

    return pages;
  }, [pageCount, page]);

  const onPaginationClick = (page: number) => setPagination((prev: IPagination) => ({ ...prev, page }));

  if (!pageCount) {
    return null;
  }

  if (pageCount > 13 || isMobileView) {
    return (
      <Pagination size="sm">
        <Pagination.First onClick={() => onPaginationClick(1)} disabled={page === 1} />
        <Pagination.Prev onClick={() => onPaginationClick(page !== 1 ? page - 1 : 1)} disabled={page === 1} />
        {page > 4 && <Pagination.Item onClick={() => onPaginationClick(1)}>{1}</Pagination.Item>}
        {page > 4 && <Pagination.Item onClick={() => onPaginationClick(2)}>{2}</Pagination.Item>}
        {page > 4 && <Pagination.Ellipsis onClick={() => onPaginationClick(Math.floor(pageCount / 4))} />}
        {page > 2 && <Pagination.Item onClick={() => onPaginationClick(page - 2)}>{page - 2} </Pagination.Item>}
        {page > 1 && (
          <Pagination.Item onClick={() => onPaginationClick(page !== 1 ? page - 1 : 1)}>{page - 1} </Pagination.Item>
        )}
        <Pagination.Item active>{page} </Pagination.Item>
        {page !== pageCount && (
          <Pagination.Item onClick={() => onPaginationClick(page + 1)}>{page + 1}</Pagination.Item>
        )}
        {page < pageCount - 1 && (
          <Pagination.Item onClick={() => onPaginationClick(page + 2)}>{page + 2}</Pagination.Item>
        )}
        {page < pageCount - 4 && (
          <Pagination.Ellipsis onClick={() => onPaginationClick(Math.ceil(pageCount / 2 + pageCount / 4))} />
        )}
        {page < pageCount - 4 && (
          <Pagination.Item onClick={() => onPaginationClick(pageCount - 1)}>{pageCount - 1}</Pagination.Item>
        )}
        {page < pageCount - 4 && (
          <Pagination.Item onClick={() => onPaginationClick(pageCount)}>{pageCount}</Pagination.Item>
        )}
        <Pagination.Next
          onClick={() => onPaginationClick(page !== pageCount ? page + 1 : pageCount)}
          disabled={page === pageCount}
        />
        <Pagination.Last onClick={() => onPaginationClick(pageCount)} disabled={page === pageCount} />
      </Pagination>
    );
  }

  return (
    <Pagination size="sm">
      <Pagination.First onClick={() => onPaginationClick(1)} disabled={page === 1} />
      <Pagination.Prev onClick={() => onPaginationClick(page !== 1 ? page - 1 : 1)} disabled={page === 1} />
      <Pagination>{paginationItems}</Pagination>
      <Pagination.Next
        onClick={() => onPaginationClick(page !== pageCount ? page + 1 : pageCount)}
        disabled={page === pageCount}
      />
      <Pagination.Last onClick={() => onPaginationClick(pageCount)} disabled={page === pageCount} />
    </Pagination>
  );
}

export default React.memo(Paginator);
