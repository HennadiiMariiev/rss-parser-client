import { useMutation } from 'react-query';

import { IAdminResponse, IFormValues } from '../interfaces/interfaces';
import instance from './instance';

function sign({
  user,
  action,
}: {
  user: IFormValues;
  action: 'login' | 'registration';
}) {
  return instance.post<IAdminResponse>(`/auth/${action}`, user);
}

function logout(refreshToken: string) {
  return instance.post(`/auth/logout`, { refreshToken });
}

function refresh(refreshToken: string) {
  return instance.post<IAdminResponse>(`/auth/refresh`, { refreshToken });
}

export function useSignInAndSignUp() {
  return useMutation(sign);
}

export function useLogout() {
  return useMutation(logout);
}

export function useRefresh() {
  return useMutation(refresh);
}
