import axios, { AxiosRequestConfig } from 'axios';
let mockingEnabled = false;

const mocks: any = {};

export const addMockData = (url: string, data: any) => (mocks[url] = data);

export const enableMocking = (status: boolean) => (mockingEnabled = status);

const isUrlMocked = (url?: string) => (url ? url in mocks : false);
const isMockError = (error: any) => Boolean(error.mockData);
const getMockError = (config: AxiosRequestConfig) => {
  const mockError: any = new Error();
  if (config.url) {
    mockError.mockData = mocks[config.url];
  }
  mockError.config = config;
  return Promise.reject(mockError);
};
const getMockResponse = (mockError: any) => {
  const { mockData, config } = mockError;
  if (mockData.status && mockData.status.toString()[0] !== '2') {
    const err: any = new Error(mockData.message || 'mock error');
    err.code = mockData.status;
    return Promise.reject(err);
  }
  return Promise.resolve(
    Object.assign(
      {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
        isMock: true,
      },
      mockData,
    ),
  );
};

// Add a request interceptor
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

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isMockError(error)) {
      return getMockResponse(error);
    }
    return Promise.reject(error);
  },
);

export default { getMockResponse, getMockError };
