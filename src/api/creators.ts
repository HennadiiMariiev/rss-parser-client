import { useQuery } from 'react-query';

import { QUERY_OPTIONS } from '../../config/vars';
import instance from './instance';

function getAllCreators() {
  return instance.get('/creators');
}

export function useCreators() {
  return useQuery('creators', () => getAllCreators(), QUERY_OPTIONS);
}
