
import axios, { AxiosRequestHeaders } from 'axios';

export const reportsApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

reportsApi.interceptors.request.use((config) => {
  const access = localStorage.getItem('access') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmNGRkNDkxLTc0MDgtNDNjNC05YTU1LTFjZjlkMzY0NWY2ZCIsImlhdCI6MTc1MjIwNjEwOSwiZXhwIjoxNzUyMjIwNTA5fQ.qU0BPvOcayewmBm7MvuiNFrWXsxNrxgHX-xB6R_OA5w';
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