import { IOptions } from '../interfaces/interfaces';

const isNotEmpty = (obj: string[]) => !!Object.keys(obj).length;

export function prepareParams(options: IOptions) {
  const { creators, categories, search, ...rest } = options;
  const preparedCreators = isNotEmpty(creators) ? creators.join(',') : null;
  const preparedCategories = isNotEmpty(categories) ? categories.join(',') : null;
  const preparedSearch = search ? { search } : null;

  return { ...rest, creator: preparedCreators, categories: preparedCategories, search: preparedSearch };
}
