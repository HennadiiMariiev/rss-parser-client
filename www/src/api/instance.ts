import axios from 'axios';
import { VITE_APP_MODE, VITE_APP_API_URL } from '../../config/vars';
import { IAdminResponse } from '../interfaces/interfaces';

const isDev = () => VITE_APP_MODE === 'development';
//
const URL = isDev() ? 'http://localhost:4000/api' : `${VITE_APP_API_URL}api`;

const instance = axios.create({
  baseURL: URL,
});

instance.interceptors.request.use((config) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const parsedToken: string | null = accessToken ? accessToken : '';

    if (parsedToken) {
      config!.headers!.Authorization = `Bearer ${parsedToken}`;
    }
  } catch (error) {
    console.log('axios request interceptor: ', error);
  }

  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.response;
    console.log('isRetry', error.response.statusText);
    if (
      error.response.status == 401 &&
      error &&
      localStorage &&
      localStorage.getItem('isRetry') !== 'true'
    ) {
      originalRequest.isRetry = true;
      localStorage.setItem('isRetry', 'true');
      try {
        let token = localStorage.getItem('refreshToken') as string;

        const response = await instance.post<IAdminResponse>(`/auth/refresh`, {
          refreshToken: token ? token : '',
        });

        if (response.status == 200) {
          const accessToken = response?.data?.data?.tokens?.accessToken;
          const refreshToken = response?.data?.data?.tokens?.refreshToken;

          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('isRetry', 'false');

          return instance.request(originalRequest);
        } else {
          return new Error(`response?.data ${response?.data}`);
        }
      } catch (error) {
        console.log('Unauthorized:  ', error);
      }
    }
    throw error;
  },
);

export default instance;
