import { useMutation, useQueryClient } from 'react-query';
import { AxiosRequestConfig } from 'axios';

import {
  IAddOptionResponse,
  IDeleteOptionResponse,
  IOptionForm,
} from '../interfaces/interfaces';
import instance from './instance';

function addOption({
  option,
  optionName,
}: {
  option: IOptionForm;
  optionName: string;
}) {
  return instance.post<IAddOptionResponse>(
    `/${optionName}`,
    option as AxiosRequestConfig,
  );
}

function removeOptions({
  options,
  optionName,
}: {
  options: string[];
  optionName: string;
}) {
  return instance.delete<IDeleteOptionResponse>(
    `/${optionName}/${options.join(',')}`,
  );
}

export function useDeleteOptions(optionName: string) {
  const queryClient = useQueryClient();
  return useMutation(removeOptions, {
    onSuccess: () => queryClient.invalidateQueries(optionName),
  });
}

export function useAddOption(optionName: string) {
  const queryClient = useQueryClient();
  return useMutation(addOption, {
    onSuccess: () => queryClient.invalidateQueries(optionName),
  });
}
