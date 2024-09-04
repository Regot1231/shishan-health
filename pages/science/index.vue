<template>
	<view class="page" :style="{ filter: isDarkened ? 'brightness(0.5)' : 'brightness(1)' }">

		<NavBar title="科普" :showBack="true" :showShare="true" @back="handleBack" />
		<view class="science-container">
			<ArticleSection v-for="(item, index) in articleList" :article="item" @click="viewDetails(item.articleId)" />
		</view>

	</view>
	<TabBar :selected="1" @chooseWay="handleChooseWay" />
</template>

<script setup>
	import {
		onShow,
		onHide
	} from "@dcloudio/uni-app";
	import {
		getCurrentInstance,
		onMounted,
		ref
	} from "vue";
	import ArticleSection from "@/components/ArticleSection.vue";
	import NavBar from "@/components/NavBar.vue";
	import {
		getScienceList
	} from "../../api/article";
	const articleList = ref([])
	const article = ref({});

	const viewDetails = (articleId) => {
		console.log('点击的 articleId:', articleId);
		uni.navigateTo({
			url: `/pages/detail/index?id=${articleId}`,
		});
	};
	// 封装获取科普信息函数
	const sendGetScienceList = async () => {
		const res = await getScienceList()
		if (res.code === 200) {
			articleList.value = res.rows
			uni.showToast({
				title: '获取科普信息成功',
				icon: 'success',
			});
		} else {
			uni.showToast({
				title: '获取科普信息失败',
				icon: 'none',
			});
		}
	}


	// article.value = {
	// 	avatar: "/static/image/detail/healthy-hand.png",
	// 	title: "合理控制热量，预防超重和肥胖",
	// 	author: "健康小能手",
	// 	views: 36734,
	// 	date: "2024-07-15",
	// 	content: "热量是人体所需能量的单位，摄入热量过多会导致体重增加。成年人每天所需热量一般在1800-2500千卡之间，视个人情况而定...",
	// 	image: "/static/image/detail/healthy-image.png",
	// };
	const isDarkened = ref(false);
	const handleChooseWay = () => {
		isDarkened.value = !isDarkened.value;
	}
	onShow(() => {
		sendGetScienceList()
		const curPages = getCurrentPages()[0]; // 获取当前页面实例
		if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
			curPages.getTabBar().setData({
				selected: 1, // 表示当前菜单的索引，该值在不同的页面表示不同
			});
		}
	});
	onHide(() => {
		isDarkened.value = false
	})
	const handleBack = () => {
		uni.navigateBack();
	};
</script>

<style scoped>
	.science-container {
		padding: 15px;
		background-color: #ffffff;
		overflow-y: scroll;
		scroll-padding-bottom: 100px;
		/* 与底部评论区高度相等 */
	}

	.page {
		transition: filter 0.3s ease;
	}
</style>