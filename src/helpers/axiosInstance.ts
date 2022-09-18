import axios from 'axios';

import {env} from '../config/config';

let headers = {};

const axiosInstance = axios.create({
  baseURL: env.BASE_URL,
  headers,
});

axiosInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response =>
    new Promise(resolve => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise(reject => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;
