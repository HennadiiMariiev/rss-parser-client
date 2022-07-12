import React, { useEffect, useState, lazy, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { isMobile } from './helpers/isMobile';
import { usePosts } from './api/posts';
import { POSTS_LIMIT } from '../config/vars';

import './index.css';

import Main from './layouts/Main';
import Wrapper from './layouts/Wrapper';
import SideBar from './layouts/SideBar';
import Header from './layouts/Header';
import Logo from './components/NavBar/Logo';
import UserMenu from './components/NavBar/UserMenu';
import Loader from './components/Loader/Loader';

const Filters = lazy(() => import('./components/Filters/Filters'));
const Posts = lazy(() => import('./components/Posts/Posts'));
const Paginator = lazy(() => import('./components/Pagination/Paginator'));
const MenuButton = lazy(() => import('./components/NavBar/MenuButton'));
const MobileMenu = lazy(() => import('./components/NavBar/MobileMenu'));

function App() {
  const isMobileViewport = isMobile();
  const [showMenu, setShowMenu] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageCount: 1, total: 0, limit: POSTS_LIMIT });
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('publication_date');
  const [sortOrder, setSortOrder] = useState('desc');

  const { data, isLoading, isError, error, isFetching } = usePosts({
    pagination,
    sortBy,
    sortOrder,
    search,
    creators,
    categories,
  });

  const posts = data?.data?.data?.posts;
  const total = data?.data?.data?.pagination?.total;

  useEffect(() => {
    if (total >= 0) {
      setPagination((prev) => ({ ...prev, pageCount: Math.ceil(total / pagination.limit), total }));
    }
  }, [total, pagination.limit]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [categories, creators]);

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

export default App;
