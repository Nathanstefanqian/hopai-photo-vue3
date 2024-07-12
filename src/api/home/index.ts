import request from '@/utils/request'

export const sendSms = async (params: any) => {
  return await request.post('/member/auth/send-sms-code', params)
}