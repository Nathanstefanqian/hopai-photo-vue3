import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 如果需要中文星期几
import weekOfYear from 'dayjs/plugin/weekOfYear'; // 如果需要插件支持
dayjs.extend(weekOfYear);
dayjs.locale('zh-cn')

export const makeUUID = () => {
  // 获取当前时间戳
  const timestamp = Date.now()

  // 生成一个随机数作为后缀，这里使用了 Math.random() 方法
  const randomSuffix = Math.random().toString(36).substring(2, 8)

  // 结合时间戳和随机数生成唯一的文件名
  const fileName = `${timestamp}_${randomSuffix}`

  return fileName
}


/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @param format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @returns 返回拼接后的时间字符串
 */
export function formatDate(date: dayjs.ConfigType, format?: string): string {
  // 日期不存在，则返回空
  if (!date) {
    return ''
  }
  // 日期存在，则进行格式化
  if (format === undefined) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  return dayjs(date).format(format)
}


export const validatePhoneNumber = (phoneNumber: any) => {
  // 定义中国大陆手机号码的正则表达式
  const regex = /^(?:\+86)?1[3-9]\d{9}$/;
  
  // 测试手机号是否符合正则表达式
  return regex.test(phoneNumber);
}

export const hasDuplicates = (array: any) => {
  console.log(array)
  console.log(new Set(array).size)
  console.log(array.length)
  return new Set(array).size !== array.length;
}

export const formatDateWeek = (inputDate: any) => {
  // 解析输入的日期字符串
  const date = dayjs(inputDate);

  // 格式化为 YYYY-MM-DD 星期几
  const formattedDate = date.format('YYYY-MM-DD dddd'); // 'dddd' 依据语言环境会显示为完整的星期几

  return formattedDate;
}

export const formatTime = (inputDate: any) => {
  const date = dayjs(inputDate)
  const formattedTime = date.format('HH:mm')
  return formattedTime
}

export const getStatus = (statusCode: any) => {
  switch (statusCode) {
    case 0:
      return '待支付'
    case 1:
      return '待确认'
    case 2:
      return '待拍摄'
    case 3:
      return '已拍摄'
    case 4:
      return '待选图'
    case 5:
      return '修图中'
    case 6:
      return '待交付'
    case 7:
      return '待评价'
    case 100:
      return '已完成'
    case 10:
      return '订单已取消'
    case 20:
      return '退款中'
    case 30:
      return '退款成功'
    default:
      return '未知状态'
  }
}

export const activeStatus =  [[1], [2], [3,4,5,6,7], [100, 10], [30, 20]]

export const getStatusBtn = (status: any) => {
  switch(status) {
    case 1:
      return '确认接单'
    case 2:
      return '去扫码'
    case 3:
      return '去传图'
    case 4:
      return '等待客户选图'
    case 5:
      return '去修图'
    case 6:
      return '等待客户确认'
    case 7:
      return '等待客户评价'
    case 100:
      return '已完成'
    case 20:
      return '退款中'
    case 30:
      return '退款成功'
    case 10:
      return '订单已取消'
  }
}