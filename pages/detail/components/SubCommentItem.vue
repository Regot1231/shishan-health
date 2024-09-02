<template>
	<view class="sub-comment-item">
		<view class="sub-comment-item-top">
			<view class="sub-comment-item-top-left">
				<image :src="comment.avatar" mode="scaleToFill" class="sub-comment-image" />
				<view class="sub-comment-item-top-left-middle">
					<view class="sub-comment-user">{{ comment.user }}</view>
					<view class="sub-comment-date">{{ comment.date }}</view>
				</view>
			</view>
			<view class="sub-comment-item-top-right">
				<wd-icon name="thumb-up" size="22px" @click="handleLike(comment.commentId)"></wd-icon>
				<view>{{ comment.likes }}</view>
			</view>
		</view>
		<view class="sub-comment-content">{{ comment.content }}</view>
	</view>
</template>

<script setup>
	import {
		postLike
	} from '../../../api/article';

	defineProps({
		comment: {
			type: Object,
			required: true,
		},
	});

	const handleLike = async (id) => {
		const data = {
			id,
			status: 1
		};
		const res = await postLike(data);
		if (res.code === 200) {
			uni.showToast({
				title: '点赞成功',
				icon: 'success'
			});
		} else {
			uni.showToast({
				title: '点赞失败',
				icon: 'none'
			});
		}
	};
</script>

<style scoped>
	.sub-comment-item {
		padding: 10px 0;
		padding-left: 90rpx;
	}

	.sub-comment-user {
		font-weight: bold;
	}

	.sub-comment-date {
		font-size: 12px;
		color: #888;
	}
	.sub-comment-item-top {
		display: flex;
		justify-content: space-between;
	}
	.sub-comment-item-top-left {
		display: flex;
		width: 320rpx;
	}

	.sub-comment-item-top-right {
		display: flex;
		align-items: flex-start;
	}

	.sub-comment-content {
		margin-top: 5px;
		font-size: 16px;
		padding-left: 90rpx;
		padding-right: 35rpx;
	}

	.sub-comment-image {
		width: 50rpx;
		height: 50rpx;
	}

	.sub-comment-item-top-left-middle {
		margin-left: 20rpx;
	}
</style>