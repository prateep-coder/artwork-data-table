import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);