import dayjs from 'dayjs';
import { getUserOrdersTimeLine } from '@/api/order';

type DayInfo = {
  date: string | null;
  dayOfWeek: number;
  hasOrder?: boolean;
};

type MonthData = {
  month: string;
  days: DayInfo[];
};

// 获取月份数据
const getMonthData = (date: dayjs.Dayjs): MonthData => {
  const start = date.startOf('month');
  const end = date.endOf('month');

  const days: DayInfo[] = [];
  for (let current = start; current.isBefore(end.add(1, 'day')); current = current.add(1, 'day')) {
    days.push({
      date: current.format('YYYY-MM-DD'),
      dayOfWeek: current.day()
    });
  }

  const firstDayOfWeek = days[0].dayOfWeek;
  const paddedDays: DayInfo[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    paddedDays.push({ date: null, dayOfWeek: i });
  }
  paddedDays.push(...days);

  const remainingDays = 7 - (paddedDays.length % 7);
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      paddedDays.push({ date: null, dayOfWeek: (firstDayOfWeek + days.length + i) % 7 });
    }
  }

  return {
    month: date.format('YYYY-MM'),
    days: paddedDays
  };
};

// 获取周数据
const getWeekData = (chooseDay?: string): DayInfo[] => {
  const today = chooseDay ? dayjs(chooseDay) : dayjs();
  const currentDayOfWeek = today.day();

  const startOfWeek = today.subtract(currentDayOfWeek, 'day');

  return Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day');
    return {
      date: date.format('YYYY-MM-DD'),
      dayOfWeek: date.day()
    };
  });
};

export const useTimeLine = (type: 'month' | 'week', chooseDay?: string) => {
  const calendarData = ref<MonthData[] | DayInfo[]>([]);
  const storedOrders = ref<Map<string, boolean>>(new Map()); // 用于存储订单数据

  // 将 Map 转换为普通对象
  const mapToObject = (map: Map<string, boolean>): Record<string, boolean> => {
    const obj: Record<string, boolean> = {};
    map.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  // 将普通对象转换为 Map
  const objectToMap = (obj: Record<string, boolean>): Map<string, boolean> => {
    return new Map(Object.entries(obj));
  };

  // 获取订单数据并更新 calendarData
  const fetchOrders = async (startTimestamp: number, endTimestamp: number) => {
    try {
      const response = await getUserOrdersTimeLine({ date: [startTimestamp, endTimestamp] });
      const orders = response.data;

      const ordersMap = new Map<string, boolean>();
      orders.forEach((order: { date: number }) => {
        const orderDate = dayjs(order.date).format('YYYY-MM-DD');
        ordersMap.set(orderDate, true);
      });

      storedOrders.value = ordersMap; // 存储订单数据
      uni.setStorageSync('storedOrders', mapToObject(storedOrders.value));

      if (type === 'month') {
        (calendarData.value as MonthData[]).forEach(month => {
          month.days.forEach(day => {
            if (day.date) {
              day.hasOrder = ordersMap.has(day.date);
            }
          });
        });
      } else {
        (calendarData.value as DayInfo[]).forEach(day => {
          if (day.date) {
            day.hasOrder = ordersMap.has(day.date);
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }

  // 初始化数据
  const initializeData = async () => {
    if (type === 'month') {
      const currentDate = dayjs();
      const startMonth = currentDate.subtract(1, 'month');
      const endMonth = currentDate.add(6, 'month'); // 获取未来六个月的数据
      calendarData.value = [
        getMonthData(startMonth),
        ...Array.from({ length: 7 }, (_, i) => getMonthData(currentDate.add(i, 'month')))
      ];
      const startTimestamp = startMonth.startOf('month').valueOf();
      const endTimestamp = endMonth.endOf('month').add(1, 'day').valueOf();
      await fetchOrders(startTimestamp, endTimestamp);
    } else {
      calendarData.value = getWeekData(chooseDay);
      // 同理
      const currentDate = dayjs();
      const startMonth = currentDate.subtract(1, 'month');
      const endMonth = currentDate.add(6, 'month'); 
      const startTimestamp = startMonth.startOf('month').valueOf();
      const endTimestamp = endMonth.endOf('month').add(1, 'day').valueOf();
      await fetchOrders(startTimestamp, endTimestamp);
    }
  }

  // 初始化数据
  onMounted(() => {
    initializeData();
  })

  // 重新生成周数据
  const refreshWeekData = (date: string) => {
    const storedOrdersObj = uni.getStorageSync('storedOrders');
    if (storedOrdersObj) {
      storedOrders.value = objectToMap(storedOrdersObj);
    }
    calendarData.value = getWeekData(date);
    (calendarData.value as DayInfo[]).forEach(day => {
      if (day.date) {
        day.hasOrder = storedOrders.value.has(day.date);
      }
    })
  }

  return {
    calendarData,
    refreshWeekData // 返回刷新周数据的函数
  }
}
