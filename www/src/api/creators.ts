import { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { QUERY_OPTIONS } from '../../config/vars';
import { preparePaginationParams } from '../helpers/prepareParams';
import { IGetOptionsResponse, IOptions } from '../interfaces/interfaces';
import instance from './instance';

function getAllCreators(options?: IOptions) {
  const params = preparePaginationParams(options);

  return instance.get<IGetOptionsResponse>('/creators', {
    params,
  } as AxiosRequestConfig);
}

export function useGetCreators(options?: IOptions) {
  const { page = 1, limit = 20 } = options ?? {};
  return useQuery(
    ['creators', page, limit],
    () => getAllCreators({ page, limit } as IOptions),
    QUERY_OPTIONS,
  );
}
