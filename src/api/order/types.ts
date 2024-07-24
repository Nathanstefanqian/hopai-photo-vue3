export type DayInfo = {
  date: string | null; // 格式为 'YYYY-MM-DD'
  dayOfWeek: number; // 0: Sunday, 1: Monday, ..., 6: Saturday
}

export type MonthData = {
  month: string; // 格式为 'YYYY-MM'
  days: DayInfo[];
}

export type orderVO = {
  id: number
  memberId: number
  memberName: string
  memberPhone: string
  spuId: number
  spuCategoryId: number
  spuDescribe: string
  skuId: number
  photoNum: number
  photographerId: number
  photographerName: string
  photographerPhone: string
  appointmentStartTime: Date
  appointmentEndTime: Date
  orderStatus: byte
  orderAmt: number
  actualAmt: number
  location: string
  remark: string
  orderTime: Date
  expireTime: Date
  clientIp: string
  pingOrderId: string
  no: string
  successTime: string
  refundAmt: number
  cancellationReason: string
}
