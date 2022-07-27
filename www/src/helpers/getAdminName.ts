import { IAdminState } from '../interfaces/interfaces';

export const getAdminName = (admin: IAdminState) => {
  const idx = admin.email.indexOf('@');
  const preparedName = admin.email.slice(0, idx);
  return admin?.name ? admin?.name : preparedName;
};
