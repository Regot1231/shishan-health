<!-- pages/ScoreShare.vue -->
<template>
	<CustomNavbar position="center" title="打卡分享" showBack="true" :isFixed="false" />
	<view class="score-share-page">
		<!-- 顶部图片 -->
		<image class="top-banner" src="/static/image/grade-top-banner.png"  mode="widthFix" />
		<!-- 使用封装的通用组件 -->
		<ScoreShareComponent :description="description" :scoreDisplay="scoreDisplay" :mySrc="mySrc" />
	</view>
</template>

<script setup>
	import CustomNavbar from '@/components/CustomNavbar.vue';
	import ScoreShareComponent from '@/components/ScoreShareComponent.vue';
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	// const currentRate = ref(0);
	// const text = 9374
	const description = ref("您的打卡记录已提交，请等待管理员评分~");
	const scoreDisplay = ref("？？");
	// 模拟从后端获取的评分数据
	const score = ref(97); // 假设评分由后端提供，静态页面先写死
	const mySrc = ref("/static/image/bottomBar/my.png")
	// consol.log(mySrc.value)
	// mySrc.value = uni.getStorageSync("imagePath")
	// consol.log(mySrc.value)
</script>

<style scoped>
	/* 页面整体样式 */
	.score-share-page {
		background-color: #f7f7f7;
		padding: 20rpx;
	}

	/* 顶部banner */
	.top-banner {
		position: relative;
		z-index: 20;
		margin-top: 20%;
		width: 100%;
		margin-bottom: 20rpx;
	}
</style>