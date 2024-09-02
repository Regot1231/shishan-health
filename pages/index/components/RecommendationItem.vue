<!-- RecommendationItem.vue -->
<template>
	<view class="item-container">
		<image :src="image" class="item-image" />
		<view class="item-content">
			<text class="item-title">{{ title }}</text>
			<text class="item-description">{{ description }}</text>
			<button class="view-button" @click="viewDetails(articleId)">立即查看</button>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		title: String,
		description: String,
		image: String,
		articleId: Number
	});

	const viewDetails = (articleId) => {
		console.log(articleId)
		uni.navigateTo({
			url: `/pages/detail/index?id=${articleId}`,
		});
	};
</script>

<style scoped>
	.item-container {
		display: flex;
		margin-bottom: 15rpx;
		border-radius: 15rpx;
		background-color: #ffffff;
		padding: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.item-image {
		width: 170rpx;
		height: 170rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}

	.item-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
	}

	.item-title {
		font-size: 16px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}

	.item-description {
		font-size: 13px;
		color: #777;
		margin-bottom: 10rpx;
	}

	.view-button {
		align-self: start;
		padding: 0px 15px;
		border-radius: 40rpx;
		border: 1px solid #68B69A;
		color: #68B69A;
		background-color: #f5fff5;
		font-size: 12px;
		margin-left: 0;
	}
</style>