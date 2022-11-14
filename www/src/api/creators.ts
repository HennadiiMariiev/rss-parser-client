import { useQuery } from 'react-query';

import { QUERY_OPTIONS } from '../../config/vars';
import { IGetOptionsResponse } from '../interfaces/interfaces';
import instance from './instance';

function getAllCreators() {
  return instance.get<IGetOptionsResponse>('/creators');
}

export function useGetCreators() {
  return useQuery('creators', () => getAllCreators(), QUERY_OPTIONS);
}
