import { IOption } from '../interfaces/interfaces';

export const getOptionIndexes = (option: string[], data: IOption[]) =>
  option.map((item) =>
    data.findIndex(({ _id }: { _id: string }) => _id === item),
  );
