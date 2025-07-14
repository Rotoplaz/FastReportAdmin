
import axios, { AxiosRequestHeaders } from 'axios';

export const reportsApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

reportsApi.interceptors.request.use((config) => {
  const access = localStorage.getItem('access') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyZmFmNjM5LWM3OGItNDA1MS1hNDExLTY5NDYxZmY3NDQxZCIsImlhdCI6MTc1MjQ2OTA2NCwiZXhwIjoxNzUyNDgzNDY0fQ.jjSNHl7V8d9QKBM2UZ4T65u36nWUrZp5LOev2BHguKQ';
  let token: string='';
  if (access) {
    token = 'Bearer ' + access;
    config.headers = {
      ...config.headers,
      Authorization: token
    } as AxiosRequestHeaders;
  }

  return config;
});