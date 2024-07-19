import dayjs from 'dayjs'

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
