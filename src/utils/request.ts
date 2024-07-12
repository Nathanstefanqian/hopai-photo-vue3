import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import mpAdapter from "axios-miniprogram-adapter";

axios.defaults.adapter = mpAdapter;

import { netConfig } from '@/config/net.config';

interface NetConfig {
  baseURL: string;
  contentType: string;
  requestTimeout: number;
  successCode: number[];
}

const { baseURL, contentType, requestTimeout, successCode }: NetConfig = netConfig;

let tokenLose: boolean = true;

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
});

// request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('Request Config:', config);  // 添加日志
    // do something before request is sent
    return config;
  },
  (error) => {
    console.error('Request Error:', error);  // 添加日志
    // do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  (response: AxiosResponse) => {
    const res = response.data;
    console.log("Response", res)
    // 请求出错处理
    // -1 超时、token过期或者没有获得授权
    // if (res.status === -1 && tokenLose) {
    //   tokenLose = false;
    //   uni.showToast({
    //     title: '服务器异常',
    //     duration: 2000
    //   });
    //   return Promise.reject(res);
    // }
    // if (successCode.indexOf(res.status) !== -1) {
    //   return Promise.reject(res);
    // }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
