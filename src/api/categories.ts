import { useQuery } from 'react-query';

import { QUERY_OPTIONS } from '../../config/vars';
import { IGetOptionsResponse } from '../interfaces/interfaces';
import instance from './instance';

function getAllCategories() {
  return instance.get<IGetOptionsResponse>('/categories');
}

export function useGetCategories() {
  return useQuery('categories', () => getAllCategories(), QUERY_OPTIONS);
}
