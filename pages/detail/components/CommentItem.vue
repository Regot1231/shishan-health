<template>
	<view class="comment-item">
		<view class="comment-item-top">
			<view class="comment-item-top-left">
				<image :src="comment.avatar" mode="scaleToFill" class="comment-image" />
				<view class="comment-item-top-left-middle">
					<view class="comment-user">{{ comment.user }}</view>
					<view class="comment-date">{{ comment.date }}</view>
				</view>
			</view>
			<view class="comment-item-top-right">
				<wd-icon name="chat1" size="22px" @click="showReplyInput = !showReplyInput"></wd-icon>
				<view class="comment-actions" @click="showReplyInput = !showReplyInput">回复</view>
				<view class="separator"></view>
				<wd-icon name="thumb-up" size="22px" @click="handleLike(comment.commentId)"></wd-icon>
				<view>{{ comment.likes }}</view>
			</view>
		</view>
		<view class="comment-content">{{ comment.content }}</view>
		<view v-if="comment.replies.length" class="replay" @click="toggleSubComments">
			—— 展开 {{ comment.replies.length }} 条回复 <wd-icon v-if="!showSubComments" name="arrow-down"
				size="15px"></wd-icon><wd-icon v-if="showSubComments" name="arrow-up" size="15px"></wd-icon>
		</view>
		<!-- 二级评论区域 -->
		<view v-if="showSubComments">
			<SubCommentItem v-for="(subComment, index) in subComments" :key="index" :comment="subComment" />
		</view>
		<!-- 回复输入框 -->
		<view v-if="showReplyInput" class="reply-input">
			<input class="input" v-model="replyText" type="text" placeholder="输入回复..." />
			<button class="submit-button" @click="submitReply">提交</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		postComment,
		postLike
	} from '../../../api/article';
	import SubCommentItem from './SubCommentItem.vue';
	import {
		getOtherUser
	} from '../../../api/user';
	const showReplyInput = ref(false); // 控制回复输入框的显示
	const replyText = ref(''); // 回复内容

	const props = defineProps({
		comment: {
			type: Object,
			required: true,
		}
	});
	console.log("拿到的props是", props.comment)
	const replies = ref([])
	replies.value = props.comment.replies //不知道能不能拿到
	const subComments = ref([])
	const showSubComments = ref(false);


	const submitReply = async () => {
		if (replyText.value.trim() === '') {
			uni.showToast({
				title: '回复内容不能为空',
				icon: 'none'
			});
			return;
		}
		// 这里可以处理提交回复的逻辑，比如调用 API 将回复保存到服务器
		const userInfo = uni.getStorageSync("userInfo")
		const data = {
			content: replyText.value,
			userId: `${userInfo.userId}`,
			parentId: props.comment.commentId,
			articleId: props.comment.articleId
		}
		const res = await postComment(data)
		if (res.code === 200) {
			uni.showToast({
				title: "提交成功",
				icon: "success"
			})
			replyText.value = ''; // 清空输入框
			showReplyInput.value = false; // 隐藏输入框
		} else {
			uni.showToast({
				title: "提交失败",
				icon: "error"
			})
		}
		console.log('提交回复:', replyText.value);
		replyText.value = ''; // 清空输入框
		showReplyInput.value = false; // 隐藏输入框
	}
	const updateUserInfo = async () => {
		if (replies.value && replies.value.length > 0) {
			console.log("获取二级评论成功", replies.value)
			for (const [index, reply] of replies.value.entries()) {
				const respond = await getOtherUser(reply.userId);
				if (respond.code === 200) {
					subComments.value[index].user = respond.user.userName;
				} else {
					uni.showToast({
						title: respond.msg || '请求失败',
						icon: 'none'
					});
				}
			}
		}
	}
	// 封装一个更改二级评论的函数
	const changeSubComments = async () => {
		if (replies.value && replies.value.length > 0) {
			subComments.value = replies.value.map(reply => {
				return {
					date: reply.createTime || '',
					content: reply.content || '',
					likes: reply.like || 0,
					avatar: "/static/image/detail/healthy-hand.png",
					user: '???',
					commentId: reply.commentId
				}

			});
			await updateUserInfo();
		}

	}


	onMounted(() => {
		changeSubComments()
	})


	const toggleSubComments = () => {
		showSubComments.value = !showSubComments.value;
	};

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
	.comment-item {
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
	}

	.comment-user {
		font-weight: bold;
	}

	.comment-date {
		font-size: 12px;
		color: #888;
	}

	.comment-item-top-left {
		display: flex;
		width: 350rpx;
	}

	.comment-item-top-right {
		display: flex;
		align-items: flex-start;
	}

	.comment-content {
		margin-top: 5px;
		font-size: 16px;
		padding-left: 90rpx;
		padding-right: 35rpx;
	}

	.comment-image {
		width: 70rpx;
		height: 70rpx;
	}

	.comment-actions {
		font-size: 14px;
		color: black;
	}

	.comment-item-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.comment-item-top-left-middle {
		margin-left: 20rpx;
	}

	.separator {
		width: 1px;
		height: 30rpx;
		background-color: white;
		margin: 0 10rpx;
	}

	.replay {
		margin-top: 10rpx;
		color: #999;
		font-size: 14px;
		text-align: right;
		padding-right: 10rpx;
	}

	.reply-input .input {
		margin: 100rpx;
	}

	.reply-input .submit-button {
		background-color: #55B89A;
		color: #FFFFFF;
	}
</style>