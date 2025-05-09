import request from '@/utils/request'

export const getUserOrders = async (data: any) => {
  return await request.post('/member/p/order/getUserOrders', data)
}

export const getUserOrdersTimeLine = async (data: any) => {
  return await request.post('/member/p/order/timeline', data)
}

export const getTmpPhone = async (id: number) => {
  return await request.get(`/member/order/getTmpPhone?id=${id}`)
}

export const getBankCode = async () => {
  return await request.get('/pay/bankcode/getList')
}


