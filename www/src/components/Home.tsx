import React, { useEffect, useState, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { isMobile } from '../helpers/isMobile';
import { useGetPosts } from '../api/posts';
import { POSTS_LIMIT } from '../../config/vars';
import { IPagination } from '../interfaces/interfaces';
import Main from '../layouts/Main';
import Wrapper from '../layouts/Wrapper';
import SideBar from '../layouts/SideBar';
import Header from '../layouts/Header';
import Logo from './NavBar/Logo';
import UserMenu from './NavBar/UserMenu';
import Loader from './Loader/Loader';
import useDebounce from '../hooks/useDebounce';
import Filters from './Filters/Filters';
import Posts from './Posts/Posts';
import Paginator from './Pagination/Paginator';
import MenuButton from './NavBar/MenuButton';
import MobileMenu from './NavBar/MobileMenu';

import '../index.css';

function Home() {
  const isMobileViewport = isMobile();
  const [showMenu, setShowMenu] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({ page: 1, pageCount: 1, total: 0, limit: POSTS_LIMIT });
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('publication_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, error, isFetching } = useGetPosts({
    pagination,
    sortBy,
    sortOrder,
    search: debouncedSearch,
    creators,
    categories,
  });

  const posts = data?.data?.data?.posts;
  const total = data?.data?.data?.pagination?.total;

  useEffect(() => {
    if (typeof total === 'number') {
      const totalValue = total > 0 ? total : 1;
      setPagination((prev) => ({ ...prev, pageCount: Math.ceil(totalValue / pagination.limit), totalValue }));
    } else {
      setPagination((prev) => ({ ...prev, pageCount: 1, total: 0 }));
    }
  }, [total, pagination.limit, setPagination]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [categories, creators, setPagination]);

  return (
    <Wrapper>
      <Header>
        <MenuButton setShow={setShowMenu} />
        <Logo />
        <UserMenu />
      </Header>
      {!isMobileViewport && (
        <SideBar>
          <Suspense fallback={<Loader />}>
            <Filters
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
              setSearch={setSearch}
              setCreators={setCreators}
              setCategories={setCategories}
              creators={creators}
              categories={categories}
              pagination={pagination}
              setPagination={setPagination}
            />
          </Suspense>
        </SideBar>
      )}
      <Main>
        <Suspense fallback={<Loader />}>
          <Paginator pagination={pagination} setPagination={setPagination} />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Posts isLoading={isLoading} isError={isError} posts={posts} error={error} isFetching={isFetching} />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <Paginator pagination={pagination} setPagination={setPagination} />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Main>
      <Suspense fallback={<Loader />}>
        {isMobileViewport && (
          <MobileMenu show={showMenu} setShow={setShowMenu}>
            <Filters
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
              setSearch={setSearch}
              setCreators={setCreators}
              setCategories={setCategories}
              creators={creators}
              categories={categories}
              pagination={pagination}
              setPagination={setPagination}
            />
          </MobileMenu>
        )}
      </Suspense>
    </Wrapper>
  );
}

export default Home;
