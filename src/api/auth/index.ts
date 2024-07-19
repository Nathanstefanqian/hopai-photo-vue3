import request from '@/utils/request'
import { LoginVO } from './types'

// 发送短信验证码
export const sendSms = async (params: any) => {
  return await request.post('/member/auth/send-sms-code', params)
}

// 微信小程序一键登录
export const Login = async (params: LoginVO) => {
  return await request.post('/member/auth/weixin-mini-app-login', params)
}

// 登出系统
export const logOut = async () => {
  return await request.post('/member/auth/logout')
}

// 刷新令牌
export const refreshToken = async (token: any) => {
  return await request.post('/member/auth/refresh-token')
}