export interface LoginVO {
  phoneCode: string // wx.getPhoneNumber获得
  loginCode: any // wx.login方法获得
  userType: number // 3 摄影师
}

export interface appPhotographerInfoBaseVO {
  littleRedBookId: string
  wechatId: string
  douYinId: string
  lightingEquipment: string
  camera: string
  zoomLens: string
  backgroundImageUrl: string
  userId: string
  orderType: boolean
  introduction: string
  fixedFocalLengthLens: string
  id: string
}
export interface UserVO {
  appPhotographerInfoBaseVO: appPhotographerInfoBaseVO
  avgRate: number
  totalOrderAmount: number
  orderCount: number
  userId: number
  id: number
  avatar: string | undefined
  birthday: number | undefined
  createTime: number | undefined
  areaIds: Array<string>
  loginDate: number | undefined
  loginIp: string
  mark: string
  mobile: string
  name: string | undefined
  nickname: string | undefined
  registerIp: string
  sex: number
  status: number
  areaId: number | undefined
  areaName: string | undefined
  areaNames: Array<string>
  levelName: string | null
  levelId: string
  bizList: Array<string>
  idCard: string
  categoryIds: Array<string>
}