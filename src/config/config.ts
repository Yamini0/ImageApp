export const env = {
  BASE_URL: 'https://api.unsplash.com/',
  ACCESS_KEY: 'Ahq6ttXmpZpHihnRIPTH3L7X70CK9C97yzY8REneYfQ',
};

import axios from 'axios';

export const ImageData = axios.create({
  baseURL: 'https://api.unsplash.com/',
});
