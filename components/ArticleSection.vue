<template>
	<!-- 文章内容部分 -->
	<view class="article-section" @click="handleClick">
		<text class="title">{{ article.titile }}</text>
		<view class="meta-info">
			<view class="left">
				<image :src="article.cover" class="article-avatar" /> <!-- //头像要用到用户的头像 -->
				<text class="author">{{ article.author }}</text> <!-- //要用到用户的昵称替换 -->
			</view>
			<view class="right">
				<text class="views">{{ article.viewCount }}次浏览</text>
				<view class="separator"></view>
				<text class="date">{{ article.createTime }}</text>
			</view>
		</view>
		<text class="content">{{ article.content }}</text>
		<image :src="article.cover" class="article-image" />
	</view>
</template>

<script setup>
	import {
		defineEmits
	} from 'vue';
	defineProps({
		article: {
			type: Object,
			required: true,
		},
	});
// 定义事件发射器 
const emit = defineEmits(['click']);
console.log('ArticleSection clicked');
	const handleClick = () => {
		emit('click');
	};
</script>

<style scoped>
	.article-section {
		margin-bottom: 50px;
	}

	.title {
		font-size: 20px;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10px;
	}

	.meta-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		color: #888;
		margin-top: 30rpx;
		line-height: 35px;
	}

	.meta-info .left {
		display: flex;
		align-items: center;
	}

	.meta-info .right {
		font-size: 14px;
		display: flex;
		align-items: center;
	}

	.meta-info .article-avatar {
		width: 70rpx;
		height: 70rpx;
		margin-right: 15rpx;
	}

	.meta-info .author {
		color: #333333;
	}

	.meta-info .separator {
		width: 1px;
		height: 30rpx;
		background-color: #777777;
		margin: 0 10rpx;
	}

	.article-image {
		width: 700rpx;
		height: 300rpx;
		border-radius: 10px;
		margin-top: 15px;
	}
</style>