<template>
	<NavBar title="我的评论" :showBack="true" :showShare="true" @back="handleBack" />
	<view class="science-container">
		<wd-card :title="item.createTime" custom-class="comment-card" custom-footer-class="comment-footer" v-for="(item, index) in comments">
			{{ item.content }}
			<template #footer>
				<button class="view-button" @click="viewDetails(item.articleId)">查看详情</button>
				<!-- <wd-button size="small" plain class="footer-button" style="background-color: #55B89A; color: #FFFFFF; border: 1px solid #55B89A	;" @click="viewDetails(item.articleId)">查看详情</wd-button> -->
			</template>
		</wd-card>
		<!-- Repeat for other wd-card components -->
	</view>
</template>

<script setup>
	import {	
		onMounted, ref
	} from "vue";
	import NavBar from "@/components/NavBar.vue";	
	import {
		getUserComments
	} from "../../../api/user";
	const comments = ref([])
	onMounted(async () => {
		const userInfo = uni.getStorageSync("userInfo");
		const res = await getUserComments(userInfo.userId);
		comments.value = res.rows
		if (res.code === 200) {
			uni.showToast({
				title: '获取用户评论信息成功',
				icon: 'success',
			});
		} else {
			uni.showToast({
				title: '获取用户评论信息失败',
				icon: 'error',
			});
		}
	});
	const viewDetails = (articleId) => {
		console.log(articleId)
		if(articleId !== null) {
			uni.navigateTo({
				url: `/pages/detail/index?id=${articleId}`,
			});
		} else {
			uni.showToast({
				title: '该评论无法跳转',
				icon: 'error',
			});
		}

	};
	const handleBack = () => {
		uni.navigateBack();
	};
</script>

<style scoped>
	.science-container {
		padding: 16px;
		background-color: #f5f7fa;
	}

	.comment-card {
		margin-bottom: 16px;
		border-radius: 20px;
		background-color: #ffffff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		
	}
	.footer-button {
		color: #fff;
		border-radius: 4px;
		padding: 4px 8px;
		font-size: 14px;
	}
	.comment-card .view-button {
		padding: 0px 15px;
		margin-left: 60%;
		border-radius: 40rpx;
		border: 1px solid #68B69A;
		color: #68B69A;
		background-color: #f5fff5;
		font-size: 12px;
	}
</style>