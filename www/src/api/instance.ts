import axios from 'axios';
import { REACT_APP_MODE, REACT_APP_API_URL } from '../../config/vars';
import { IAdminResponse } from '../interfaces/interfaces';

const isDev = () => REACT_APP_MODE === 'development';

const URL = isDev() ? 'http://localhost:4000/api' : `${REACT_APP_API_URL}api`;

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
    const originalRequest = error.config;

    console.log('isRetry', originalRequest?._isRetry);
    if (error.response.status == 401 && originalRequest?._isRetry !== true) {
      originalRequest._isRetry = true;
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
