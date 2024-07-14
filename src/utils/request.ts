import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import mpAdapter from "axios-miniprogram-adapter";

axios.defaults.adapter = mpAdapter as any

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

// 请求头的添加
instance.interceptors.request.use(
  (config: any) => {
    const token = '123'
    config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
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
