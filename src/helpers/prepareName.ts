import { OPTION_NAME_SLICE_COUNT } from '../../config/vars';

export const prepareName = (name: string) => {
  if (typeof name !== 'string') return '';

  return name.length > OPTION_NAME_SLICE_COUNT ? name.slice(0, OPTION_NAME_SLICE_COUNT) + '...' : name;
};
