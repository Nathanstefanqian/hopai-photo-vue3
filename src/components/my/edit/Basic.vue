<template>
  <div class="basic w-100vw ">
    <up-skeleton rows="6" :loading="loading">
      <div class="basic-card" v-if="user && user.appPhotographerInfoBaseVO">
        <div class="basic-card-item" @click="handleClickPic(0)">
          <span class="basic-card-item-title">头像</span>
          <image class="basic-card-item-image" :src="user.avatar || netConfig.picURL + '/static/my/avatar.jpg'" mode="aspectFill"></image>
        </div>
        <div class="basic-card-item" @click="openPopup('昵称', user.nickname, 'nickname')">
          <span class="basic-card-item-title">昵称</span>
          <span class="content">{{ user.nickname }}</span>
        </div>
        <div class="basic-card-item" @click="openPopup('性别', user.sex, 'sex')">
          <span class="basic-card-item-title">性别</span>
          <span class="content">{{ user.sex == 1 ? '男' : '女' }}</span>
        </div>
        <!-- <div class="basic-card-item" @click="openPopup('手机号', user.mobile, 'mobile')">
          <span class="basic-card-item-title">手机号</span>
          <span class="content">{{ user.mobile }}</span>
        </div> -->
        <div class="basic-card-item" @click="openPopup('联系客户手机号', user.phone, 'phone')">
          <span class="basic-card-item-title">联系客户手机号</span>
          <span class="content">{{ user.phone }}</span>
        </div>
        <div class="basic-card-item" @click="handleLevel()">
          <span class="basic-card-item-title">摄影师等级</span>
          <span class="content">{{ user.levelName }}</span>
        </div>
        <div class="basic-card-item" @click="openPopup('生日', user.birthday, 'birthday')">
          <span class="basic-card-item-title">生日</span>
          <span class="content">{{ formatDate(user.birthday, 'YYYY-MM-DD') }}</span>
        </div>
        <div class="basic-card-item" @click="openAreaPicker">
          <span class="basic-card-item-title">所在地</span>
          <span class="content">{{ user.areaName }}</span>
        </div>
        <div class="basic-card-item" @click="openPopup('接单模式', user.appPhotographerInfoBaseVO.orderType, 'orderType')">
          <span class="basic-card-item-title">接单模式</span>
          <span class="content">{{ user.appPhotographerInfoBaseVO.orderType ? '全职' : '兼职' }}</span>
        </div>
        <div class="basic-card-item" @click="openPopup('小红书号', user.appPhotographerInfoBaseVO.littleRedBookId, 'littleRedBookId')">
          <span class="basic-card-item-title">小红书号</span>
          <span class="content">{{ user.appPhotographerInfoBaseVO.littleRedBookId }}</span>
        </div>
        <div class="basic-card-item" @click="openPopup('抖音号', user.appPhotographerInfoBaseVO.douYinId, 'douYinId')">
          <span class="basic-card-item-title">抖音号</span>
          <span class="content">{{ user.appPhotographerInfoBaseVO.douYinId }}</span>
        </div>
        <div class="basic-card-item no-border" @click="openPopup('简介', user.appPhotographerInfoBaseVO.introduction, 'introduction')">
          <span class="basic-card-item-title">简介</span>
          <span class="content introduction">{{ user.appPhotographerInfoBaseVO.introduction || '暂无' }}</span>
        </div>
        <!-- <div class="basic-card-item no-border">
          <span class="basic-card-item-title">背景图片</span>
          <image class="basic-card-item-bgc" :src="user.appPhotographerInfoBaseVO.backgroundImageUrl" mode="aspectFill" @click="handleClickPic(1)"></image>
        </div> -->
      </div>
    </up-skeleton>
  </div>
  <up-popup :show="show" @close="show = false" :round="10" closeable class="relative">
    <view class="popup">
      <div class="title">{{ popupTitle }}</div>
      <div v-if="currentField === 'sex'">
        <div class="desc-btn mb-[55rpx]" :class="{ 'active': popupContent == 1 }" @click="popupContent = 1">
          男
        </div>
        <div class="desc-btn" :class="{ 'active': popupContent == 2 }" @click="popupContent = 2">
          女
        </div>
      </div>
      <div v-else-if="currentField === 'orderType'">
        <div class="desc-btn mb-[55rpx]" :class="{ 'active': popupContent }" @click="popupContent = true">
          全职
        </div>
        <div class="desc-btn" :class="{ 'active': !popupContent }" @click="popupContent = false">
          兼职
        </div>
      </div>
      <div class="desc" v-else>
        <AreaPicker v-model="areaModel" v-if="currentField === 'area'" />
        <Calendar v-model="popupContent" v-else-if="currentField === 'birthday'" />
        <input v-model="popupContent" placeholder="请输入" v-else />
      </div>
      <div class="btn-group">
        <button class="btn btn-accept" @click="updateInfo">确定</button>
      </div>
    </view>
  </up-popup>
  <up-popup :show="picShow" @close="picShow = false" :round="10" closeable class="relative">
    <view class="popup">
      <div class="title !mb-[80rpx]">操作</div>
      <div class="desc-btn !text-color-[#ba2636] mb-[55rpx]" @click="previewPicture">
        查看图片
      </div>      
      <div class="desc-btn" @click="updatePicture">
        更新图片
      </div>
    </view>
  </up-popup>
  <up-popup :show="progressShow"  mode="center" :round="10" >
    <view class="popup-progress">
      <div v-for="(progress,index) in progressList" :key="index">
        <span>上传进度： {{ progress }}%</span>
        <progress :percent="progress" activeColor="#ba2636" show-info stroke-width="3" />
      </div>
    </view>
  </up-popup>
  <!-- <img-crop 
        v-if="chooseAvatarUrl"
        :url="chooseAvatarUrl"
        :width="200"
        :height="200"
        @cancel="chooseAvatarUrl = ''"
        @success="updateAvatar"
    /> -->
    <t-cropper
    mode="ratio"
    :imageUrl="chooseAvatarUrl"
    :width="500"
    :height="500"
    :radius="0"
    :delay="150"
    @cancel="chooseAvatarUrl = ''"
    @confirm="updateAvatar"
  ></t-cropper>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { netConfig } from '@/config/net.config'
import { getUserInfo, updateBasicInfo } from '@/api/my/index';
import AreaPicker from './AreaPicker.vue';
import Calendar from './Calendar.vue'
import { UserVO } from '@/api/auth/types';
import { formatDate, validatePhoneNumber } from '@/utils/tools';
import { useNotification } from '@/hooks/useNotification'
import { useUpload } from '@/hooks/useUpload'

const chooseAvatarUrl = ref('')
const user = ref<UserVO>({} as UserVO);
const loading = ref(false);
const show = ref(false);
const picShow = ref(false)
const progressShow = ref(false)
const picId = ref() // 用来判别选择的是背景图还是头像
const popupTitle = ref('');
const popupContent = ref();
const currentField = ref('');
const areaModel = ref({ areaId: null, areaName: '' });
const { message } = useNotification()
const progressList = ref<any>([])
const active = ref()

const handleLevel = () => {
  message({ title: '联系客服评定等级哦' })
}

const updateAvatar = async (filePath: any) => {
  const path =  filePath.tempFilePath
  chooseAvatarUrl.value = ''
  loading.value = true;
  progressList.value = [0]
  progressShow.value = true
  const { uploadFile, getConfig } = useUpload(0)
  try {
    await getConfig()
    const picUrl = await uploadFile(path, progress => {
      progressList.value[0] = progress
    })
    progressShow.value = false
    if(!picId.value) {
      await updateBasicInfo({avatar: picUrl, userId: user.value.appPhotographerInfoBaseVO.userId })
    } else {
      await updateBasicInfo({ backgroundImageUrl: picUrl, userId: user.value.appPhotographerInfoBaseVO.userId })
    }
  } finally {
    await getData()
    loading.value = false
    progressShow.value= false
  }
}

const getData = async () => {
  loading.value = true;
  try {
    user.value = (await getUserInfo()).data;
    active.value = user.value.sex
    if(user.value.birthday == null) user.value.birthday = dayjs().valueOf()
  } finally {
    loading.value = false;
  }
};

const previewPicture = () => {
  const urls = ref<any>([])
  const url = picId.value ? user.value.appPhotographerInfoBaseVO.backgroundImageUrl : user.value.avatar
  urls.value.push(url)
  uni.previewImage({
    urls: urls.value,
    current: url
  });
}

const handleClickPic = (id: number) => {
  picShow.value = true
  picId.value = id
}

const openPopup = (title: string, content: any, field: string) => {
  active.value = user.value.sex
  popupTitle.value = title;
  popupContent.value = content;
  currentField.value = field;
  show.value = true;
};

const openAreaPicker = () => {
  popupTitle.value = '所在地';
  currentField.value = 'area';
  areaModel.value = { areaId: user.value.areaId as string, areaName: user.value.areaName };
  show.value = true;
};

const updatePicture = async () => {
  uni.chooseImage({
    count: 1,
    success: async (res) => {
      picShow.value = false
      const tempFilePaths:any = res.tempFilePaths;
      chooseAvatarUrl.value = tempFilePaths[0]
    }
  })
}

const updateInfo = async () => {
  if(!popupContent.value && currentField.value !== 'orderType' && currentField.value !=='area') {
    message({"title": "该信息不能为空哦！"})
    return
  }
  if(currentField.value == 'mobile' && !validatePhoneNumber(popupContent.value)) {
    message({"title": "不是合法手机号哦！"})
    return
  }
  try {
    let updateData = {};
    if (currentField.value === 'area') {
      updateData = { areaId: areaModel.value.areaId, userId: user.value.appPhotographerInfoBaseVO.userId };
    } else {
      updateData = { [currentField.value]: popupContent.value, userId: user.value.appPhotographerInfoBaseVO.userId };
    }
    const res = await updateBasicInfo(updateData);
    if(!res.data) {
      message({ title: res.msg })
      return
    }
    await getData();
    message({ title: '更新成功' })
    show.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getData();
});
</script>

<style lang="scss" scoped>
.basic {
  background-color: #f6f6f6;
  padding: 32rpx;
  box-sizing: border-box;
  min-height: 100vh;
  &-card {
    box-sizing: border-box;
    width: 100%;
    // min-height: 1100rpx; /* 可选：限制卡片的最大宽度 */
    background-color: #fff;
    padding: 32rpx;
    border-radius: 24rpx;
    
    &-item {
      display: flex;
      justify-content: space-between;
      padding: 40rpx 0;
      border-bottom: 0.3rpx solid rgba(0,0,0,0.1);
      align-items: center;
      .content {
        display: flex;
        justify-content: flex-end;
        font-size: 28rpx;
        margin-right: 10rpx;
        width: 400rpx;
        word-wrap: break-word;
      }

      &-title {
        font-weight: 200;
      }

      &-bgc {
        width: 300rpx;
        height: 150rpx;
        border-radius: 32rpx;
      }

      &-image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
    }
  }
}
.active {
  background-color: #ba2636 !important;
  color: #fff !important;
}
.popup-progress {
  width: 500rpx;
  border-radius: 32rpx;
  padding: 32rpx;
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
.no-border {
  border: 0;
}
</style>