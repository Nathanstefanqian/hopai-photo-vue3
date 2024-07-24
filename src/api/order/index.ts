import request from '@/utils/request'

export const getUserOrders = async (data: any) => {
  return await request.post('/member/p/order/getUserOrders', data)
}

export const getUserOrdersTimeLine = async (data: any) => {
  return await request.post('/member/p/order/timeline', data)

}