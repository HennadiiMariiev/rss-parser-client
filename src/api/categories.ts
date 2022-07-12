import { useQuery } from 'react-query';

import { QUERY_OPTIONS } from '../../config/vars';
import instance from './instance';

function getAllCategories() {
  return instance.get('/categories');
}

export function useCategories() {
  return useQuery('categories', () => getAllCategories(), QUERY_OPTIONS);
}
