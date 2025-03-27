<template>
  <div class="order">
    <div class="order-main">
      <div class="order-main-area">
        <div class="order-main-area-header">
          <div class="title">选择接单区域</div>
          <div class="btn-add" @click="show = true">+ 增加</div>
        </div>
        <up-skeleton :loading="loading" rows="3">
          <div class="order-main-area-main" v-if="user">
            <div class="order-main-area-main-item" v-for="item,index in user.areaNames" :key="index">
              <div class="content">{{ item }}</div>
                <div class="delete" @click="deleteArea(index)">
                  <div class="delete-center"></div>
                </div>
            </div>
          </div>
        </up-skeleton>
      </div>
      <div class="order-main-type">
        <div class="order-main-type-header">
          <div class="title">选择接单类型</div>
          <div class="btn-add" :class="{ 'btn-disable' : !change } " @click="change ? updateBizList() : null">更新</div>
        </div>
        <up-skeleton :loading="loading" rows="3">
          <div class="order-main-type-main" v-if="user">
            <up-checkbox-group v-model="user.categoryIds" @change="change = true">
              <up-checkbox 
                class="order-main-type-main-item" 
                v-for="(item, index) in spuList"
                :key="index"
                :label="item.name"
                :name="item.categoryId"
                active-color="#ba2636" 
              />
            </up-checkbox-group>
          </div>
        </up-skeleton>
      </div>
    </div>
  </div>
  <up-popup :show="show" @close="show = false" :round="10" closeable class="relative">
    <view class="popup">
      <div class="title">接单区域</div>
      <div class="desc">
        <AreaPicker v-model="areaModel" />
      </div>
      <div class="btn-group">
        <button class="btn btn-accept" @click="updateArea">确定</button>
      </div>
    </view>
  </up-popup>
</template>

<script setup lang="ts">
import AreaPicker from './AreaPicker.vue'
import { getSpu, getUserInfo, updateBasicInfo, updateOrderInfo } from '@/api/my'
import { useNotification } from '@/hooks/useNotification' 
import { UserVO } from '@/api/auth/types' 
import { hasDuplicates } from '@/utils/tools'
const loading = ref(false)
const spuList = ref<any>([])
const user = ref<UserVO>()
const show = ref(false)
const change = ref(false)
const areaModel = ref({ areaName: '' , areaId: '' })
const { message,modal } = useNotification()

const updateBizList = async () => {
  if(!user.value?.categoryIds.length) {
    message({ title: '至少保留一个接单类型哦！' })
    return
  }
  const updateData = { categoryIds: user.value?.categoryIds, userId: user.value?.appPhotographerInfoBaseVO.userId, areaIds: user.value?.areaIds }
  await updateOrderInfo(updateData)
  await getData()
  message({ title: '更新成功' })
  change.value = false
}

const updateArea = async () => {
  if(!areaModel.value.areaId) {
    message({ title: '请选择地区'})
    return
  }
  if(user.value?.areaIds.includes(areaModel.value.areaId)) {
    message({ title: '该地区已存在啦！'})
    return
  }
  user.value?.areaIds.unshift(areaModel.value.areaId)
  const updateData = { areaIds: user.value?.areaIds, userId: user.value?.appPhotographerInfoBaseVO.userId,  categoryIds: user.value?.categoryIds}
  await updateOrderInfo(updateData)
  await getData()
  message({ title: '更新成功' })
  show.value = false
}

const deleteArea = async (index: number) => {
  if(user.value?.areaIds.length == 1) {
    message({ title: '至少保留一个接单区域哦！' })
    return
  }
  modal({ title: '确认删除吗', content: '删除没法撤回噢'}).then(async () => {
    user.value?.areaIds.splice(index, 1)
    const updateData = { areaIds: user.value?.areaIds, userId: user.value?.appPhotographerInfoBaseVO.userId, categoryIds: user.value?.categoryIds }
    await updateOrderInfo(updateData)
    await getData()
    message({ title: '删除成功' })
  }).catch(() => message({ title: '删除取消' }))

}

const getData = async () => {
  loading.value = true
  try {
    user.value = (await getUserInfo()).data
    spuList.value = (await getSpu({ pageNo: 1, pageSize: 30 })).data.list
  } finally {
    loading.value = false
  }
}
onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.order {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding: 32rpx;


  &-main {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-area {

      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 32rpx;
        margin-bottom: 20rpx;

        .title {
          font-size: 32rpx;
          font-weight: 400 !important;
        }

        .btn-add {
          color: #ba2636;
          border-radius: 12rpx;
          border: 2rpx solid #BA2636;
          padding: 8rpx 16rpx;
          font-size: 24rpx;
        }
      }

      &-main {
        &-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30rpx 32rpx;
          background-color: #fff;
          border-radius: 12rpx;
          margin-bottom: 32rpx;
          .content {
            font-weight: 400 !important;
            font-size: 28rpx;
          }
          .delete {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ba2636;
            border-radius: 50%;
            width: 48rpx;
            height: 48rpx;

            &-center {
              background-color: #fff;
              width: 32rpx;
              height: 6rpx;
              border-radius: 4rpx;
            }
          }
        }
      }
    }

    &-type {
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 32rpx;
        margin-bottom: 20rpx;
        
        .title {
          font-size: 32rpx;
          font-weight: 400 !important;
        }

        .btn-add {
          color: #ba2636;
          border-radius: 12rpx;
          border: 2rpx solid #BA2636;
          padding: 8rpx 16rpx;
          font-size: 24rpx;
        }

        .btn-disable {
          pointer-events: none; /* 禁用点击事件 */
          opacity: 0.5; /* 可选：使按钮看起来禁用 */
        }
      }

      &-main {
        background-color: #fff;
        border-radius: 24rpx;
        padding: 48rpx 32rpx;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.popup {
  display: flex;
  flex-direction: column;
  margin-top: 28rpx;
  padding: 54rpx;

  .title {
    font-size: 36rpx;
    font-weight: 500;
    margin-bottom: 49rpx;
  }

  .desc {
    background-color: #f6f6f6;
    font-size: 28rpx;
    padding: 32rpx 32rpx;
    border-radius: 32rpx;
    color: rgba(40, 40, 40, 0.5);
    word-wrap: break-word;
  }

  .desc-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    color: rgba(40, 40, 40, 0.5);
    padding: 32rpx 32rpx;
    border-radius: 32rpx;
    background-color: #f6f6f6;
  }

  .btn-group {
    display: flex;
    justify-content: space-around;
    margin-top: 49rpx;
    padding: 0rpx 96rpx;

    .btn {
      font-size: 32rpx;
      padding: 0 96rpx;
      border-radius: 32rpx;

      &-accept {
        color: #fff;
        background-color: #ba2636;
      }
    }
  }
}
::v-deep .u-checkbox-group--row {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 32rpx 200rpx;
}

::v-deep .u-checkbox text {
  font-size: 28rpx !important;
  font-weight: 400 !important !important;
}
@font-face {
  font-family: 'Abel';
  src: url('@/static/fonts/Abel.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
</style>