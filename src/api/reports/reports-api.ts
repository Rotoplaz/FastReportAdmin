
import axios, { AxiosRequestHeaders } from 'axios';

export const reportsApi = axios.create({
  baseURL: 'http://localhost:3000/api',
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