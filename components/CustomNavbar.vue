<template>
  <!-- 顶部占位 -->
  <view :class="'navbar-wrapper ' + (isFixed ? 'fixed' : '')" :style="{ paddingTop: safeAreaInsets.top + 8 + 'px' }">
    <view class="back-button" @click="handleBack">
      <image class="back-icon" v-if="showBack" src="/static/image/Left-back.png" />
    </view>
    <view :class="'navbar ' + position">
      <image v-if="showLogo" class="check-icon" src="/static/image/logo.png" mode="scaleToFill" />
      {{ title }}
    </view>
    <view class="img">
      <image :src="bgSrc" mode="widthFix" />
    </view>
  </view>
</template>

<script setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)

import bgImage from '../static/image/top-background.png'
const { position, title, showBack, showLogo, bgSrc } = defineProps({
  position: {
    type: String,
    default: 'center'
  },
  title: {
    type: String,
    default: '狮山健康'
  },
  showBack: {
    type: Boolean,
    default: false
  },
  showLogo: {
    type: Boolean,
    default: false,	
  },
  bgSrc: {
    type: String,
    default: bgImage
  },
  isFixed: {
    type: Boolean,
    default: true
  }
})

const handleBack = () => {
  uni.navigateBack()
}


</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
}

.navbar-wrapper {
  width: 100%;
  height: 200rpx;
  z-index: -1;
  height: fit-content;

  .navbar {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    padding-bottom: 30rpx;
    color: #fff;
    background-color: transparent;
    font-size: 38rpx;

    .check-icon {
      width: 50rpx;
      height: 50rpx;
      margin-right: 10rpx;
    }
  }

  .img {
    position: absolute;
    width: 100%;
    top: 0;
  }
}

.left {
  padding-left: 30rpx;
}

.center {
  justify-content: center;
}

.back-button {
  position: absolute;
  left: 30rpx;
  z-index: 3;

  .back-icon {
    width: 50rpx;
    height: 50rpx;
  }
}
</style>
