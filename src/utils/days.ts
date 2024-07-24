import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Dayjs } from 'dayjs';

dayjs.extend(isoWeek);

type DayInfo = {
  date: string | null;
  dayOfWeek: number;
};

type MonthData = {
  month: string;
  days: DayInfo[];
};

// 获取给定月份的日期数据
const getMonthData = (date: Dayjs): MonthData => {
  const start = date.startOf('month');
  const end = date.endOf('month');
  
  // 获取当前月的所有日期
  const days = [];
  for (let current = start; current.isBefore(end.add(1, 'day')); current = current.add(1, 'day')) {
    days.push({
      date: current.format('YYYY-MM-DD'),
      dayOfWeek: current.day() // day() 返回周中的第几天（0-6）
    });
  }

  return {
    month: date.format('YYYY-MM'),
    days
  };
};

// 生成前一个月到后面六个月的数据
const generateCalendarData = (): MonthData[] => {
  const months: MonthData[] = [];
  const currentDate = dayjs();
  
  // 生成前一个月
  months.push(getMonthData(currentDate.subtract(1, 'month')));

  // 生成当前月份到后面六个月的数据
  for (let i = 0; i < 7; i++) {
    months.push(getMonthData(currentDate.add(i, 'month')));
  }

  return months;
};

// 导出生成的数据
export const calendarData: MonthData[] = generateCalendarData();



export const getCurrentWeekDates = (chooseDay?: string) => {
  const today = chooseDay ? dayjs(chooseDay) : dayjs(); // Use chooseDay if provided, otherwise use current date
  const currentDayOfWeek = today.day(); // Get the current day of the week

  // Calculate the start of the week (Sunday)
  const startOfWeek = today.subtract(currentDayOfWeek, 'day');

  // Generate the array of dates
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day'); // Add i days to the start of the week
    return {
      date: date.format('YYYY-MM-DD'),
      dayOfWeek: date.day() // Get the day of the week number
    };
  });

  return dates;
};


export const weekData = getCurrentWeekDates();