	<template>
		<NavBar title="详情" :showBack="true" :showShare="true" @back="handleBack" />
		<view class="detail-container">
			<ArticleSection :article="article" />
			<!-- 评论区 -->
			<view class="comments-section">
				<view class="comments-top">
					<text class="comments-title">全部评论</text>
					<view class="comments-news">
						<text class="comments-early" @click="commentLikeLists(options.id)">最火</text>
						<view class="separator"></view>
						<text class="comments-new" @click="commentNewLists(options.id)">全新</text>
					</view>
				</view>

				<CommentItem v-for="(comment, index) in comments" :key="index" :comment="comment"/>

			</view>
		</view>
		<!-- 底部评论功能 -->
		<view class="comment-bar">
			<view class="input-box">
				<input confirm-type="send" v-model="commentText" @confirm="sendComment" type="text" placeholder="评论点什么" />
			</view>
			<view class="icons">
				<view class="comment-icon">
					<wd-icon name="chat1" size="22px"></wd-icon>
					<text class="count">{{ commentTotal }}</text>
				</view>
				<view class="like-icon">
					<wd-icon name="thumb-up" size="22px" @click="handleLike(article.articleId)"></wd-icon>
					<text class="count">{{ article.like }}</text>
				</view>
			</view>
		</view>
	</template>

	<script setup>
		import {
			ref,
			onMounted
		} from "vue";
		import {
			onLoad
		} from '@dcloudio/uni-app'
		import CommentItem from "./components/CommentItem.vue";
		import NavBar from "@/components/NavBar.vue";
		import ArticleSection from "@/components/ArticleSection.vue"
		import {
			getOtherUser
		} from "../../api/user";
		import { postComment, postLike, postView } from "../../api/article";
		import {
			getArticleDetail,
			getCommentLikeLists,
			getCommentNewLists
		} from "../../api/article";
		const handleBack = () => {
			uni.navigateBack();
		};
		const handleLike = async(id) => {
			console.log("开始点赞了！")
			const data = { id, status: 0}
			console.log("开始点赞了！", data)
			const res = await postLike(data)
			if(res.code === 200) {
				uni.showToast({
					title: '点赞成功',
					icon: 'success',
				});
			} else {
				uni.showToast({
					title: '点赞失败',
					icon: 'none',
				});
			}
		}
		const commentText = ref('')
		const article = ref({});
		const options = ref({})
		const commentTotal = ref()
		const comments = ref([]);
		// const parentId = ref()  //后面再加
		// 获取用户信息
		const updateUserInfo = async (rows) => {
			for (const [index, row] of rows.entries()) {
				const respond = await getOtherUser(row.userId);
				if (respond.code === 200) {
					comments.value[index].user = respond.user.userName;
				} else {
					uni.showToast({
						title: respond.msg || '请求失败',
						icon: 'none'
					});
				}
			}
		}
		
		
		// 处理评论发送逻辑
		const sendComment = async() => {
			if (commentText.value.trim() === '') {
				uni.showToast({
					title: '评论不能为空',
					icon: 'none',
				});
				return;
			}
			console.log('用户发送的评论:', commentText.value);
			const userInfo = uni.getStorageSync("userInfo")
			// 在这里你可以调用接口来发送评论内容
			const data = {
				content: commentText.value,
				parentId: 0,
				userId: `${userInfo.userId}`,
				articleId: options.value.id
			}
		    const res = await postComment(data)
			// 发送成功后清空输入框
			commentText.value = '';
		};
		// 封装一个点赞量列表函数
		const commentLikeLists = async (id) => {

			options.value.id = id
			console.log("跳转之前的id", id)
			const res = await getCommentLikeLists(id)
			if (res.code === 200) {
				commentTotal.value = res.total
				
				comments.value = res.rows.map(row => {
					return {
						date: row.createTime || '',
						content: row.content || '',
						likes: row.like || 0,
						avatar: "/static/image/detail/healthy-hand.png",
						user: '???',
						commentId: row.commentId,
						replies: row.replies,
						articleId: row.articleId
					}

				});
				await updateUserInfo(res.rows);
			} else {
				uni.showToast({
					title: res.msg || '请求失败',
					icon: 'none'
				});
			}

		}
		// 封装一个最新列表函数
		const commentNewLists = async (id) => {

			options.value.id = id //还需要研究：options.value的设置时机不对！！
			console.log("跳转之前的id", id)
			const res = await getCommentNewLists(id)
			if (res.code === 200) {
				commentTotal.value = res.total
				comments.value = res.rows.map(row => {
					return {
						date: row.createTime || '',
						content: row.content || '',
						likes: row.like || 0,
						avatar: "/static/image/detail/healthy-hand.png",
						user: '???',
						commentId: row.commentId,
						replies: row.replies,
						articleId: row.articleId
					}
				});
				await updateUserInfo(res.rows);
			} else {
				uni.showToast({
					title: res.msg || '请求失败',
					icon: 'none'
				});
			}

		}

		onMounted(async() => {

			// 模拟数据
			// article.value = {
			// avatar: "/static/image/detail/healthy-hand.png",
			//   title: "合理控制热量，预防超重和肥胖",
			//   author: "健康小能手",
			//   views: 36734,
			//   date: "2024-07-15",
			//   content:
			//     "热量是人体所需能量的单位，摄入热量过多会导致体重增加。成年人每天所需热量一般在1800-2500千卡之间，视个人情况而定...",
			//   image: "/static/image/detail/healthy-image.png",
			// };

			// comments.value = [{
			// 		avatar: "/static/image/detail/healthy-hand.png",
			// 		user: "健康中心",
			// 		date: "2024-07-15",
			// 		content: "呼吸道疾病不仅仅是个人健康问题，也影响整个社会的公共卫生。",
			// 		likes: 98,
			// 	},
			// 	{
			// 		avatar: "/static/image/detail/healthy-hand.png",
			// 		user: "营养专家",
			// 		date: "2024-07-16",
			// 		content: "适当控制热量摄入是保持健康的关键，特别是对于减肥人士。",
			// 		likes: 54,
			// 	},
			// ];
		});

		onLoad(async (options) => {
			// 只提取必要的属性
			const {
				id
			} = options;

			options.value = {
				id
			}; // 或者其他必要的属性

			const articleId = options.value.id;
			console.log("传过来的id", articleId) // 获取传递过来的id
			commentLikeLists(articleId)
			const res = await getArticleDetail(articleId)
			if (res.code === 200) {
				article.value = res.data
				
				// 加载页面的时候增加浏览量
				console.log(article.value.viewCount)
				const data = {id: article.value.viewCount}
				    postView(data)
				const respond = await getOtherUser(res.data.author)
				if (respond.code === 200) {
					article.value.author = respond.user.userName
				} else {
					uni.showToast({
						title: respond.msg || '请求失败',
						icon: 'none'
					});
				}
			} else {
				uni.showToast({
					title: res.msg || '请求失败',
					icon: 'none'
				});
			}
		});
	</script>

	<style scoped>
		.detail-container {
			padding: 15px;
			background-color: #ffffff;
			height: 80vh;
			overflow-y: scroll;
			scroll-padding-bottom: 100px;
			/* 与底部评论区高度相等 */
		}

		.comments-section {
			margin-top: 20px;
		}

		.comments-section .comments-top {
			display: flex;
			justify-content: space-between;
		}

		.comments-title {
			font-size: 20px;
			font-weight: bold;
		}

		.comments-top .comments-news {
			font-size: 14px;
			display: flex;
			align-items: center;
		}

		.comments-top .comments-news .separator {
			width: 1px;
			height: 25rpx;
			background-color: #777777;
			margin: 0 10rpx;
		}

		.comment-input {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			border-top: 1px solid #ddd;
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #ffffff;
		}

		.comment-bar {
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			align-items: flex-start;
			padding: 10px 15px;
			background-color: white;
			border-top: 1px solid #ddd;
			border-radius: 60rpx 60rpx 0rpx 0rpx;
			height: 200rpx;
			box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
		}

		.input-box {
			flex: 1;
			background-color: #f6f8fa;
			border-radius: 20px;
			padding: 8px 15px;
			margin-right: 10px;
		}

		.input-box input {
			border: none;
			outline: none;
			width: 100%;
			font-size: 14px;
			color: #888;
		}

		.icons {
			display: flex;
			align-items: center;
		}

		.icons .comment-icon,
		.icons .like-icon {
			display: flex;
			align-items: center;
			margin-left: 15px;
			position: relative;
		}

		.icons image {
			width: 25px;
			height: 25px;
		}

		.icons .count {
			font-size: 12px;
			color: #ff3b30;
			background-color: #fff;
			border-radius: 50%;
			padding: 2px 5px;
			position: absolute;
			top: -10px;
			right: -10px;
		}
	</style>