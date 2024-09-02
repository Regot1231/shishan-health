<template>
	<view class="page" :style="{ filter: isDarkened ? 'brightness(0.5)' : 'brightness(1)' }">
		<CustomNavbar showLogo position="left" />
		<Mycontent />
	</view>

	<TabBar @chooseWay="handleChooseWay" :selected="4" />
</template>

<script setup>
	import CustomNavbar from '../../components/CustomNavbar.vue'
	import Mycontent from './components/MyContent.vue'
	import {
		onShow,
		onHide
	} from "@dcloudio/uni-app";
	import {
		getCurrentInstance,
		ref
	} from 'vue'
	const isDarkened = ref(false);
	const handleChooseWay = () => {
		isDarkened.value = !isDarkened.value;
	}
	onShow(() => {
		const curPages = getCurrentPages()[0]; // 获取当前页面实例
		if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
			curPages.getTabBar().setData({
				selected: 4 // 表示当前菜单的索引，该值在不同的页面表示不同
			});
		}
	})
	onHide(() => {
		isDarkened.value = false
	})
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f6f8fa;
	}

	.page {
		transition: filter 0.3s ease;
	}
</style>