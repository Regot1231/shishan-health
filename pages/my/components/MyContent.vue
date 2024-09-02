<template>
  <view class="content">
    <view class="my-info">
      <view class="avatar">
        <image
          style="width: 140rpx;height: 140rpx;"
          src="../../../static/image/avatar.png"
          mode="scaleToFill"
        />
      </view>
      <view class="info">
        <view class="name">健康小助手</view>
        <view class="account">ID：202021354648</view>
      </view>
    </view>
    <view class="my-score">
      <view class="history" @click = "goToHistory">
        <view class="icon">
          <image
            src="../../../static/svg/my/history.svg"
            mode="scaleToFill"
            style="width: 90rpx;height: 90rpx;"
          />
        </view>
        <view class="score-label">历史评分</view>
      </view>
      <view class="diversion"></view>
      <view class="score" @click="goToRanking">
        <view class="icon">
          <image
            src="../../../static/svg/my/list.svg"
            mode="scaleToFill"
            style="width: 90rpx;height: 90rpx;"
            />
        </view>
        <view class="score-label">排行榜</view>
      </view>
    </view>
    <view class="my-function">
      <view class="title">
        我的功能
      </view>
      <view 
        class="function-item" 
        v-for="item in functionList" 
        :key="item.label" 
        @click="goToPage(item.url)"
      >
        <image
          :src="item.img"
          mode="scaleToFill"
        />
        <text class="function-label">{{ item.label }}</text>
        <image
          class="enter-btn"
          src="../../../static/svg/my/arrow-right.svg"
          mode="scaleToFill"
          style="width: 25rpx;height: 25rpx;"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import commentSvg from '../../../static/svg/my/my-comment.svg'
import forwardSvg from '../../../static/svg/my/forward.svg'
import collectionSvg from '../../../static/svg/my/collection.svg'
import settingSvg from '../../../static/svg/my/setting.svg'

const functionList = ref([
  {
    img: commentSvg,
    label: '我的评论',
    url: '/pages/my/comment/index', // 替换为你的“我的评论”页面路径
  },
  {
    img: forwardSvg,
    label: '我的转发',
    url: '/pages/my/settings/index', // 替换为你的“我的转发”页面路径
  },
  {
    img: collectionSvg,
    label: '我的收藏',
    url: '/pages/my/settings/index', // 替换为你的“我的收藏”页面路径
  },
  {
    img: settingSvg,
    label: '设置',
    url: '/pages/my/settings/index', // 替换为你的设置页面路径
  }
])

const goToPage = (url) => {
  if (url) {
    uni.navigateTo({
      url: url,
    });
  }
}

const goToRanking = () => {
  uni.navigateTo({
    url: '/pages/ranking/index',
  });
}
const goToHistory = () => {
	uni.navigateTo({
		url: "/pages/history/index"
	})
}
</script>

<style lang="scss" scoped>
.content {
  float: left;
  width: 100%;
  height: 1000rpx;
  margin-top: 200rpx;
}

.my-info {
  display: flex;
  padding: 20rpx;
  .avatar {
    width: 140rpx;
    height: 140rpx;
    margin-right: 20rpx;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    margin-left: 5rpx;
    .name {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 15rpx;
    }
    .account {
      font-size: 28rpx;
    }
  }
}

.my-score {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 36rpx 0;
  width: 680rpx;
  border-radius: 26rpx;
  background-color: #fff;
  .diversion{
    width: 2rpx;
    height: 80rpx;
    background-color: #f0f0f0;
  }
  .history, .score {
    display: flex;
    width: 320rpx;
    align-items: center;
    justify-content: center;
    .score-label {
      color: #333;
      font-size: 32rpx;
      line-height: 30rpx;
      height: 30rpx;
    }
  }
  .icon{
    margin-right: 30rpx;
  }
}

.my-function {
  width: 680rpx;
  margin: 0 auto;
  padding: 20rpx;
  margin-top: 30rpx;
  border-radius: 20rpx;
  color: #333;
  background-color: #FFFFFF;
  .title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  .function-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #FFFFFF;
    margin: 70rpx 0;
    .function-label {
      font-size: 32rpx;
      color: #333;
      margin-left: 20rpx;
      height: 40rpx;
      line-height: 34rpx;
      flex-grow: 1;
    }
    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
</style>
