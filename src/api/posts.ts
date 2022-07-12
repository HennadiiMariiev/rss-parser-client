import { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { prepareParams } from '../helpers/prepareParams';
import { IOptions, IUsePostsProps } from '../interfaces/interfaces';
import { QUERY_OPTIONS } from '../../config/vars';
import instance from './instance';

function getAllPosts(options : IOptions) {
  const params = prepareParams(options);
  return instance.get('/posts', {params} as AxiosRequestConfig);
}

export function usePosts({pagination, sortBy, sortOrder, search, creators, categories} : IUsePostsProps) {
  const {page, limit} = pagination;
  return useQuery(
    ['posts', page, limit, sortBy, sortOrder, search, creators, categories],
    () =>
      getAllPosts({ page, limit, sortBy, sortOrder, search, creators, categories }),
      QUERY_OPTIONS
  );
}