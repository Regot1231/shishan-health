<template>
	<view>
		<text>Hello, Vue!</text>
	</view>
</template>

<script setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from '@dcloudio/uni-app'

	onLaunch(() => {
		console.log('加载完毕')
		const token = uni.getStorageSync('token');
		if (!token) {
			uni.redirectTo({
				url: '/pages/login/index'
			});
		} else {
			uni.switchTab({
				url: '/pages/index/index'
			});

		}

	})
</script>

<style lang="scss">
	// 字体图标
	@import '@/styles/fonts.scss';
	// @import '/wxcomponents/dist/common/index.wxss';

	view,
	navigator,
	input,
	scroll-view {
		box-sizing: border-box;
	}

	button::after {
		border: none;
	}

	swiper,
	scroll-view {
		flex: 1;
		height: 100%;
		overflow: hidden;
	}

	image {
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}

	// 两行省略
	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>