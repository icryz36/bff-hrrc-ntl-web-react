import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const KEY_ACCESS_TOKEN = import.meta.env.VITE_KEY_ACCESS_TOKEN || '';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

// Adding authorization header to axios instance if session exists
axiosInstance.interceptors.request.use(async (config) => {
  // const authToken = localStorage.getItem('auth_token');
  const authToken = KEY_ACCESS_TOKEN;

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  // if (authToken) {
  //   config.headers.token = `Bearer ${authToken}`;
  // }
  config.headers['Content-Type'] = 'application/json';
  config.headers['sender'] = 'ntlhrrecruit';
  config.headers['refer'] = 'ntlhrrecruit';
  config.headers['forward'] = '192.168.1.100';
  config.headers['sendDate'] = new Date().toISOString().split('T')[0];
  // config.headers['branch'] = '0001';
  config.headers['clientid'] = 'web-app-client';
  config.headers['Accept'] = 'application/json, text/plain, */*';
  config.headers['Referer'] = 'http://localhost:5001/';

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => (response.data.data ? response.data.data : response.data),
  (error) => {
    return Promise.reject({
      status: error.response?.status,
      data: error.response?.data || error.message,
    });
  },
);

export default axiosInstance;
