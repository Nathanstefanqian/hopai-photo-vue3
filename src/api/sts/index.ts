import request from '@/utils/request'

// 摄影师上传作品的sts凭证
export const getWorkSpaceUpload = async () => {
  return await request.get('/infra/file/getSts/workspacePhotographer')
}

// 摄影师上传头像的sts凭证
export const getUserPortraitUpload = async () => {
  return await request.get('/infra/file/getSts/userPortraitUpload')
}

// 获取摄影师机密资料的sts凭证
export const getUserProfile = async () => {
  return await request.get('/infra/file/getSts/userProfile')
}