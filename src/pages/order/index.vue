<template>
  <div class="order relative">
    <div class="redball"></div>
    <div class="blank w-100vw h-[1rpx]"></div>
    <div class="order-header">
      <div class="order-header-time">
        <div class="time-date">{{ currentDay.format('D') }}</div>
        <div class="time-other">
          <div class="time-other-week">{{ "星期" + weeks[currentDay.day()] }}</div>
          <div class="time-other-year">
            {{ currentYear }}
          </div>
        </div>
      </div>
    </div>
    <div class="order-main">
      <div class="calendar">
        <div class="calendar-header">
          <div class="calendar-header-year">
            <div class="year">{{ currentDay.format('YYYY年') }}</div>
            <div class="btn" @click="handleToggle">{{ isWeek ? '查看所有' : '查看本周' }}</div>
          </div>
          <div class="calendar-header-week">
            <div class="week">
              <div class="week-item" v-for="item, index  in weeks" :key="index">{{ item }}</div>
            </div>
            <div class="week relative" v-if="isWeek">
              <div class="week-item relative" :class="getWeekClass(item.date)" v-for="item,index in weekData" @click="handleWeekClick(item.date, index)" :key="index">
                <span>{{ +item.date.split('-')[2]}}</span>
                <div class="red-dot" v-if="item.hasOrder"></div>
              </div>
              <div class="week-item-active" :style="{ left: activeLeft + 'rpx' }"></div>
            </div>
          </div>
        </div>
        <div class="calendar-divider h-[100rpx]"></div>
        <scroll-view scroll-y="true" class="calendar-main-scrollview" v-if="!isWeek" scroll-with-animation scroll-into-view="active">
          <div class="calendar-main">
              <div class="month" v-for="item,index in monthData" :id="getId(item.month)" :key="index">
                <div class="month-header">{{ item.month }}</div>
                <div class="month-main">
                  <div class="day relative" :class="getClass(day.date)" v-for="day, index in item.days" :key="index" @click="handleDateClick(day.date)">
                    <span v-if="day.date != currentDate">{{ day.date ? + day.date.split('-')[2] : '' }}</span>
                    <div v-else class="text-white day-today">今日</div>
                    <div class="day-dot"></div>
                    <div class="day-dot day-dot-red" v-if="day.hasOrder"></div>
                  </div>
                </div>
              </div>
          </div>
        </scroll-view>
        <div class="calendar-main-order" v-else>
          <Schedule :loading="loading" :chooseDate="chooseDate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { getUserOrders, getUserOrdersTimeLine } from '@/api/order/index'
import { MonthData, DayInfo } from '@/api/order/types'
import {  getCurrentWeekDates } from '@/utils/days'
import Schedule from '@/components/order/Schedule.vue'
import { useTimeLine } from '@/hooks/useTimeLine'

const weeks  = ['日', '一', '二', '三', '四', '五', '六']
const isWeek = ref(false)
const loading = ref(false)
const activeLeft = ref(0)

const currentDate = dayjs().format('YYYY-MM-DD');
const chooseDate = ref(currentDate)
const currentDay = dayjs(currentDate)
const currentYear = ref(dayjs().format('YYYY年'))
const currentMonth = dayjs().format('YYYY-MM');
const monthData = useTimeLine('month').calendarData
const { calendarData: weekData, refreshWeekData } = useTimeLine('week')

const getWeekClass = (day:any) =>  dayjs(day).isBefore(currentDay) ? 'week-item-past' : ''

const handleWeekClick = (date: any, index: any) => {
  chooseDate.value = date
  loading.value = true
  activeLeft.value = index * 98 + 5
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const moveActive = (date?: any) => {
  const day = dayjs(date ? date : '').day();
  activeLeft.value = 0;
  loading.value = true;
  setTimeout(() => {
    activeLeft.value = day * 98 + 5;
  }, 200);
  loading.value = false
}


const handleDateClick = async (date: string) => {
  try {
    refreshWeekData(date)
    chooseDate.value = date
    currentYear.value = dayjs(date).format('YYYY年');
    isWeek.value = true
    moveActive(date)
  } catch (error) {
    console.error('Error handling date click:', error);
  }
};

const handleToggle = () => {
  isWeek.value = !isWeek.value
  refreshWeekData()
  moveActive()
}

const getClass= (dataStr: any) => {
  const data = dayjs(dataStr)
  const curData = dayjs(currentDate)
  if(data.isBefore(curData)) return 'day-before'
  else if(data.isAfter(curData)) return ''
}


const getId = (id: any) => {
  return currentMonth == id ? 'active' : ''
}


onMounted(async () => {
  moveActive()
})
</script>

<style lang="scss" scoped>
@import '@/styles/animation.scss';
.redball {
    position: absolute;
    z-index: 0;
    top: 248rpx;
    left: 122rpx;
    width: 266rpx;
    height: 160rpx;
    background-color: #ba2636;
    opacity: 0.2;
    filter: blur(70rpx);
    transform: scale(1); /* 初始大小为1 */
    animation: breathe-out 5s ease-in-out infinite alternate; /* 使用呼吸效果的动画 */
  }
.order {
  background-color: #f6f6f6;
  width: 100vw;
  min-height: 100vh;

  &-header {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-top: 166rpx;
    width: 100%;
    padding: 36rpx 48rpx;

      &-time {
        display: flex;
        align-items: center;
        .time-date {
          font-size: 88rpx;
          margin-right: 24rpx;
          color: #212525;
        }

        .time-other {
          font-weight: 200;
          display: flex;
          flex-direction: column;
          color: #bcc1cd;
          font-size: 28rpx;
        }
    }
  }

  &-main {
    background: #fff;
    border-radius: 48rpx 48rpx 0 0;

    .calendar-main-scrollview {
      width: 100%;
      height: 100%;
      white-space: nowrap;
    }
    .calendar {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 350rpx);
      &-header {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100vw;
        padding: 0 32rpx;
        margin-bottom: 20rpx;
        &-year {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 60rpx;
          .year {
            font-size: 40rpx;
            font-weight: 200;
            margin-left: 16rpx;
          }
          .btn {
            color: #ba2636;
            font-size: 28rpx;
            margin-right: 16rpx;
          }
        }

        &-week {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;

          .week {
            display: flex;
            width: 100%;
            justify-content: space-around;
            transition: all ease 0.5s;
          }
          .week-item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20rpx 0;
            color: #000;
            z-index: 2;
            width: 98rpx;

            &-past {
              color: rgba(0, 0, 0, 0.30);
            }

            &-active {
              position: absolute;
              z-index: 1;
              top: -2rpx;
              left: 0;
              width: 96rpx;
              height: 86rpx;
              background-color: #f2f2f2;
              border-radius: 12rpx;
              transition: all ease 0.5s;
            }

            .red-dot {
              position: absolute;
              top: 64rpx;
              left: 42rpx;
              width: 12rpx;
              height: 12rpx;
              border-radius: 50%;
              background-color: #ba2636;
            }
          }
        }
      }

      &-divider {
        width: 100vw;
        background: rgba(0, 0, 0, 0.12);
        height: 0.66rpx;
      }

      &-main {
        height: calc(100vh - 580rpx);
        padding: 32rpx;
        box-sizing: border-box;

        .month {
          width: 100%;
          box-sizing: border-box;
          padding-top: 64rpx;

          &-header {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 200;
          }

          &-main {
            display: flex;
            flex-wrap: wrap;
            margin-top: 28rpx;
            .day {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 28rpx 0;
              width: 99rpx;
              box-sizing: border-box;

              &-before {
                color: rgba(0, 0, 0, 0.30);
              }

              &-dot {
                position: absolute;
                top: 90rpx;
                left: 45rpx;
                width: 12rpx;
                height: 12rpx;
                background-color: #fff;
                border-radius: 50%;

                &-red {
                  top: 75rpx;
                  background-color: #ba2636;
                }
              }

              &-today {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                width: 80rpx;
                height: 80rpx;
                background-color: #ba2636;
              }
            }
          }
        }
      }
    }
  }
}
</style>