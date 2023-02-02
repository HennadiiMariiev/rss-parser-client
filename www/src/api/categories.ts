import { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { QUERY_OPTIONS } from '../../config/vars';
import { preparePaginationParams } from '../helpers/prepareParams';
import { IGetOptionsResponse, IOptions } from '../interfaces/interfaces';
import instance from './instance';

function getAllCategories(options?: IOptions) {
  const params = preparePaginationParams(options);

  return instance.get<IGetOptionsResponse>('/categories', {
    params,
  } as AxiosRequestConfig);
}

export function useGetCategories(options?: IOptions) {
  const { page = 1, limit = 20 } = options ?? {};

  return useQuery(
    ['categories', page, limit],
    () => getAllCategories({ page, limit } as IOptions),
    QUERY_OPTIONS,
  );
}
