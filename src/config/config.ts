export const env = {
  BASE_URL: 'https://api.unsplash.com/',
  ACCESS_KEY: 'l0cd366ec4qhzpZhcAz7pw9J2YHKn2d12K0_Lb56P4k',
};

import axios from 'axios';

export const ImageData = axios.create({
  baseURL: 'https://api.unsplash.com/',
});
