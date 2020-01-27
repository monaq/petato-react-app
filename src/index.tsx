import axios, { AxiosRequestConfig } from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  addMockData,
  getMockError,
  getMockResponse,
  isMockError,
  isUrlMocked,
} from 'utils/MockInterceptor';
import App from './containers/App';
import './global.scss';
import * as serviceWorker from './serviceWorker';

// TODO: env setting
const mockingEnabled = true;

addMockData('https://dog.ceo/api/breeds/list/all', { data: { mock: 'dogs' } });
addMockData('https://dog.ceo/404-page', { status: 404, message: 'whoops' });

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (mockingEnabled && isUrlMocked(config.url)) {
      console.log('axios mocking ' + config.url);
      return getMockError(config);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isMockError(error)) {
      return getMockResponse(error);
    }
    return Promise.reject(error);
  },
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
