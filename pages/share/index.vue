<template>
	<view class="page" :style="{ filter: isDarkened ? 'brightness(0.5)' : 'brightness(1)' }">
		<CustomNavbar title="交流分享" :bgSrc="bgImg" />
		<scroll-view scroll-y>
			<view class="content">
				<view class="content-separation" />
				<ArticleSection v-for="(item, index) in shareList" :article="item"
					@click="viewDetails(item.articleId)" />
				<view class="content-separation footer" />
			</view>
		</scroll-view>
	</view>
	<TabBar :selected="3" @chooseWay="handleChooseWay" />
</template>

<script setup>
	import {
		onShow,
		onHide
	} from "@dcloudio/uni-app";
	import CustomNavbar from '../../components/CustomNavbar.vue'
	import bgImg from '../../static/image/share-bg.png'
	import ShareItem from './components/ShareItem.vue'
	import ArticleSection from "@/components/ArticleSection.vue"
	import { getShareList } from "../../api/article";
	import {
		getCurrentInstance,
		ref,
		onMounted
	} from 'vue'
	const shareList = ref([])
	const article = ref({});
	const viewDetails = (articleId) => {
		console.log(articleId)
		uni.navigateTo({
			url: `/pages/detail/index?id=${articleId}`,
		});
	};
	onMounted(async () => {
		const res = await getShareList()
		if (res.code === 200) {
			shareList.value = res.rows
			uni.showToast({
				title: '获取分享信息成功',
				icon: 'success',
			});
		} else {
			uni.showToast({
				title: '获取分享信息失败',
				icon: 'none',
			});
		}
	})
	
	const isDarkened = ref(false);
	const handleChooseWay = () => {
		isDarkened.value = !isDarkened.value;
	}
	onShow(() => {
		const curPages = getCurrentPages()[0]; // 获取当前页面实例
		if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
			curPages.getTabBar().setData({
				selected: 3 // 表示当前菜单的索引，该值在不同的页面表示不同
			});
		}
	})
	onHide(() => {
		isDarkened.value = false
	})
</script>

<style lang="scss" scoped>
	.content {
		overflow: hidden;
		margin-top: 400rpx;
		background-color: #F6F8FA;
		border-radius: 60rpx;
		padding: 15px;

		.content-separation {
			height: 50rpx;
			margin-top: -20rpx;
		}

		.footer {
			height: 120rpx;
		}
	}

	.page {
		transition: filter 0.3s ease;
	}
</style>