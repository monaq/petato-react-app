/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosRequestConfig } from 'axios';

const mocks: any = {};

export const addMockData = (url: string, data: any) => (mocks[url] = data);

export const isUrlMocked = (url?: string) => (url ? url in mocks : false);
export const isMockError = (error: any) => Boolean(error.mockData);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getMockError = (config: AxiosRequestConfig) => {
  const mockError: any = new Error();
  if (config.url) {
    mockError.mockData = mocks[config.url];
  }
  mockError.config = config;
  return Promise.reject(mockError);
};
export const getMockResponse = (mockError: any) => {
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
