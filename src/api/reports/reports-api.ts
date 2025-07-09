
import axios from 'axios';

export const reportsApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});