import axios from 'axios';
import { MODE } from '../../config/vars';
import { IAdminResponse } from '../interfaces/interfaces';

const API_URL = 'www.google.com';
const URL = MODE ? 'localhost:4000' : API_URL;


const instance = axios.create({
  withCredentials: true,
  baseURL: `http://${URL}/api`,
});

instance.interceptors.request.use((config) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const parsedToken: string | null = accessToken ? accessToken : '';

    if(parsedToken) {
      config!.headers!.Authorization = `Bearer ${parsedToken}`;
    }
  } catch (error) {
    console.log('axios request interceptor: ', error);
  }

  return config;
});

instance.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  
  if(error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
          let token = localStorage.getItem('refreshToken') as string;

          const response = await instance.post<IAdminResponse>(`/auth/refresh`, {refreshToken: token ? token : ''});

          if(response.status == 200) {
            const accessToken = response?.data?.data?.tokens?.accessToken;
            const refreshToken = response?.data?.data?.tokens?.refreshToken;

            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);

            return instance.request(originalRequest);
          } else {
            return new Error(`response?.data ${response?.data}`);
          }
        } catch (error) {
          console.log("Unauthorized:  ", error);
        }
    }
    throw error;
})


export default instance;
