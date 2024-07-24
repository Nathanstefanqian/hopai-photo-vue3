import request from '@/utils/request';

export const getUserOrders = async (data: any) => {
  return await request.post('/member/p/order/getUserOrders', data)
}

export const updateOrderStatus = async (data: any) => {
  return await request.post('/member/p/order/updateStatus', data)
}

export const scanQrCode = async (data: any) => {
  return await request.post('/member/p/order/scanQrCode', data)
}

export const cancelOrder = async (data: any) => {
  return await request.post('/member/p/order/cancel', data)
}