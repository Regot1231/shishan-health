<!-- components/HeaderInfo.vue -->
<template>
  <view class="header-info">
    <text class="header-title">{{ title }}</text>
    <text class="header-description">{{ description }}</text>
  </view>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: "问卷调查",
  },
  description: {
    type: String,
    default:
      "感谢您抽出宝贵的时间参与本次健康调查。请根据您的实际情况回答以下问题，所有信息将严格保密。",
  },
});
</script>

<style scoped>
.header-info {
  padding: 20rpx;
  background-color: #e6f2f1;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.header-description {
  margin-top: 10rpx;
  font-size: 28rpx;
  color: #666;
}
</style>
