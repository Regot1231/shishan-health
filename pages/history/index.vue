<!-- pages/ScoreShare.vue -->
<template>
	<CustomNavbar position="center" title="历史评分" showBack="true" :isFixed="false" />
	<view class="score-share-page">
		<!-- 顶部图片 -->
		<image class="top-banner" src="/static/image/grade-top-banner.png" mode="widthFix" />
		<!-- 使用封装的通用组件 -->
		<ScoreShareComponent v-for="(item, index) in cardList" :description="item.createTime" :scoreDisplay="item.score" :mySrc="item.path" />
	</view>
</template>

<script setup>
	import CustomNavbar from '@/components/CustomNavbar.vue';
	import ScoreShareComponent from '@/components/ScoreShareComponent.vue';
	import { getCardList } from '../../api/card';
	import {
		ref
	} from 'vue';
	import {
		onShow
	} from "@dcloudio/uni-app";
	const cardList = ref([])
	// 封装获取用户打卡记录函数
	const sendGetCardList = async (id) => {
		const respond = await getCardList(id)
		if (respond.code === 200) {
			cardList.value = respond.rows
			uni.showToast({
				title: '获取用户打卡记录成功',
				icon: 'success',
			});
		} else {
			uni.showToast({
				title: '获取用户打卡记录失败',
				icon: 'error',
			});
		}
	
	}

	onShow(() => {
		const userInfo = uni.getStorageSync("userInfo")
		 sendGetCardList(userInfo.userId)
	})
	console.log(cardList)
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