
import axios, { AxiosRequestHeaders } from 'axios';

export const reportsApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

reportsApi.interceptors.request.use((config) => {
  const data = JSON.parse(localStorage.getItem('auth-storage') ||  '{}');
  let token: string='';
  if (data.state) {
    token = 'Bearer ' + data.state.jwt;
    config.headers = {
      ...config.headers,
      Authorization: token
    } as AxiosRequestHeaders;
  }

  return config;
});