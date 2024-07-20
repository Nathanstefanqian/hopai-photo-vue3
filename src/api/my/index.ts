import request from '@/utils/request'

// 获取用户信息
export const getUserInfo = async () => {
  return await request.get('/member/photographer/get')
}

// 获取用户的设备列表
export const getDeviceList = async (userId: any) => {
  return await request.get(`/member/user-devices-pic/list?userId=${userId}`)
}

// 创建用户的设备图片
export const createDevicePic = async (params: any) => {
  return await request.post('/member/user-devices-pic/create', params)
}

// 删除用户的设备图片
export const deleteDevicePic = async (id: string) => {
  return await request.delete(`/member/user-devices-pic/delete?id=${id}`)
}

// 更新用户信息
export const updateUserInfo = async (data: any) => {
  return await request.put('/member/photographer/updatePhotographerInfo', data)
}

// 更新基本信息
export const updateBasicInfo = async (data: any) => {
  return await request.post('/member/photographer/update', data)
}

// 更新接单
export const updateOrderInfo = async (data: any) => {
  return await request.post('/member/photographer/updateOrderConfig', data)
}

// 获取地区树
export const getArea = async () => {
  return await request.get('/system/area/tree')
}

// 获取商品spu
export const getSpu = async (data: any) => {
  return await request.post('/product/spu/page', data)
}

// 获取用户代表作分页
export const getAlbumPage = async (data: any) => {
  return await request.post('/member/album/page', data)
}

// 获取照片分页
export const getPhotoPage = async (params: any) => {
  return await request.get(`/member/photo/page?pageNo=${params.pageNo}&pageSize=${params.pageSize}&albumId=${params.albumId}`)
}

// 获得单个代表作
export const getAlbum = async (id: any) => {
  return await request.get(`/member/album/get?id=${id}`)
}

// 获取单张照片详情
export const getPhoto = async (id: any) => {
  return await request.get(`/member/photo/get?id=${id}`)
}

// 更新代表作
export const updateAlbum = async (data: any) => {
  return await request.put('/member/album/update', data)
}

// 更新代表作中的照片 批量上传
export const updateAlbumPhoto = async (data: any) => {
  return await request.post('/member/photo/create', data)
}

// 删除代表作中的照片
export const deleteAlbumPhoto = async (id: any) => {
  return await request.delete(`/member/photo/delete?id=${id}`)
}

// 创建代表作
export const createAlbum = async (data: any) => {
  return await request.post('/member/album/create', data)
}


// 删除代表作
export const deleteAlbum = async (id: any) => {
  return await request.delete(`/member/album/delete?id=${id}`)
}

