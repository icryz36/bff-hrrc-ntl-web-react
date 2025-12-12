import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const BASE_URL_JOBPOST = import.meta.env.VITE_API_URL_JOBPOST || 'http://localhost:8000/api';
const BASE_URL_MASTERDATA = import.meta.env.VITE_API_URL_MASTERDATA || 'http://localhost:8000/api';
const BASE_URL_USER = import.meta.env.VITE_API_URL_USER || 'http://localhost:8000/api';
const BASE_URL_CANDIDATE = import.meta.env.VITE_API_URL_CANDIDATE || 'http://localhost:8000/api';
const BASE_URL_GATEWAY = import.meta.env.VITE_API_URL_GATEWAY || 'http://localhost:8000/api';
const KEY_ACCESS_TOKEN = import.meta.env.VITE_KEY_ACCESS_TOKEN || '';

class ApiError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const setupInterceptors = (instance: any) => {
  instance.interceptors.request.use(async (config: any) => {
    const authToken = KEY_ACCESS_TOKEN;
    if (authToken) {
      config.headers['authorization'] = `Bearer ${authToken}`;
    }

    if (!navigator.onLine) {
      window.dispatchEvent(new CustomEvent('network-offline'));
      return Promise.reject(new Error('No internet connection'));
    }

    config.headers['sender'] = 'ntlhrrecruit';
    config.headers['refer'] = 'ntlhrrecruit';
    config.headers['forward'] = '192.168.1.100';
    config.headers['sendDate'] = new Date().toISOString().split('T')[0];
    config.headers['clientid'] = 'web-app-client';

    return config;
  });

  instance.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError) => {
      if (error.response?.status && error.response.status >= 500) {
        window.dispatchEvent(new CustomEvent('network-error'));
      }

      const apiError = new ApiError(
        error.message || 'An error occurred',
        error.response?.status,
        error.response?.data,
      );

      return Promise.reject(apiError);
    },
  );
};

const axiosInstance = axios.create({ baseURL: BASE_URL });
setupInterceptors(axiosInstance);

const axiosJobPostInstance = axios.create({ baseURL: BASE_URL_JOBPOST });
setupInterceptors(axiosJobPostInstance);

const axiosCandidateInstance = axios.create({ baseURL: BASE_URL_CANDIDATE });
setupInterceptors(axiosCandidateInstance);

const axiosMasterDataInstance = axios.create({ baseURL: BASE_URL_MASTERDATA });
setupInterceptors(axiosMasterDataInstance);

const axiosUserInstance = axios.create({ baseURL: BASE_URL_USER });
setupInterceptors(axiosUserInstance);

const axiosGatewayInstance = axios.create({ baseURL: BASE_URL_GATEWAY });
setupInterceptors(axiosGatewayInstance);

export default axiosInstance;
export {
  axiosInstance,
  axiosJobPostInstance,
  axiosMasterDataInstance,
  axiosUserInstance,
  axiosCandidateInstance,
  axiosGatewayInstance,
  ApiError,
};
