import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { IQueryProviderProps } from '../interfaces/interfaces';

const queryClient = new QueryClient();

function QueryProvider(props: IQueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}

export default QueryProvider;
