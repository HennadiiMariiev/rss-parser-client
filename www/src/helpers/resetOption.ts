import { AxiosResponse } from 'axios';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { IGetOptionsResponse } from '../interfaces/interfaces';

export const resetOption = (
  option: string[],
  setCallback: React.Dispatch<React.SetStateAction<string[]>>,
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<AxiosResponse<IGetOptionsResponse, any>, unknown>
  >,
) => {
  if (!option.length) {
    return;
  }
  setCallback([]);
  refetch();
};
