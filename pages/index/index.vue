<template>

	<view class="page" :style="{ filter: isDarkened ? 'brightness(0.5)' : 'brightness(1)' }">
		<CustomNavbar position="left" showLogo :isFixed="false" />
		<scroll-view @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
			<HomeContent :wxRunData="wxRunData" />
		</scroll-view>


	</view>
	<TabBar @chooseWay="handleChooseWay" :selected="0" />
</template>

<script setup>
	import {
		getCardList
	} from '../../api/card';
	import {
		getUserInfo
	} from '../../api/user';
	import CustomNavbar from '../../components/CustomNavbar.vue';
	import HomeContent from './components/HomeContent.vue';
	import {
		onShow,
		onHide
	} from "@dcloudio/uni-app";
	import {
		getCurrentInstance,
		ref,
		onMounted
	} from 'vue'

		function getWeRunData() {

			wx.getWeRunData({
				success(res) {
					console.log(res)
					const encryptedData = res.encryptedData;
					const iv = res.iv;
					const session_key = uni.getStorageSync("session_key")
					// 发送encryptedData和iv到服务器端进行解密，解密后得到步数等数据
					wx.request({
						url: 'http://47.115.213.253:3233/system/user/getWeRunData', // 替换为你自己的服务器地址
						method: 'POST',
						header: {
							'content-type': 'application/json' //自定义请求头信息
						},
						data: {
							encryptedData: encryptedData,
							iv: iv,
							session_key: session_key
						},
						success(response) {
							console.log('解密后的数据:', response.data);
							// response.data 包含解密后的微信步数数据
							stepInfoList.value = response.data.stepInfoList
							// 对 stepInfoList 按 timestamp 进行降序排序
							stepInfoList.value.sort((a, b) => b.timestamp - a.timestamp);

							wxRunData.value = stepInfoList.value[0]
							console.log('最新的步数记录:', wxRunData.value);
						},
						fail(error) {
							console.error('解密失败:', error);
						}
					});
				},
				fail(error) {
					console.error('获取微信运动数据失败:', error);
				}
			});
		}

	// 页面加载获取用户信息
	onMounted(async () => {
				isDarkened.value = false,
		// 获取用户微信运动步数
		wx.getSetting({
			success(res) {
				// 检查用户是否已授权微信运动数据
				if (!res.authSetting['scope.werun']) {
					// 如果未授权，请求授权
					wx.authorize({
						scope: 'scope.werun',
						success() {
							// 授权成功后获取微信运动步数数据
							getWeRunData();
						},
						fail() {
							console.log('用户拒绝了微信运动数据的授权');
						}
					});
				} else {
					// 已经授权，直接获取微信运动步数数据
					getWeRunData();
				}
			}
		});

		const res = await getUserInfo()
		if (res.code === 200) {
			const data = res.user
			uni.setStorageSync('userInfo', data);
		} else {
			uni.showToast({
				title: '获取用户信息失败',
				icon: 'error',
			});
		}
		const respond = await getCardList(res.user.userId)
		if (respond.code === 200) {
			uni.setStorageSync('cardList', respond.rows);
		} else {
			uni.showToast({
				title: '获取用户打卡记录失败',
				icon: 'error',
			});
		}
	})
	const isDarkened = ref(false);
	const wxRunData = ref(0) //给老师测试用
	const stepInfoList = ref([])
	const onScrolltolower = () => {
		console.log('触底了')
		uni.$emit('scrolltolower')
	}

	const handleChooseWay = () => {
		isDarkened.value = !isDarkened.value;
	}

	onShow(() => {
		const curPages = getCurrentPages()[0]; // 获取当前页面实例
		if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
			curPages.getTabBar().setData({
				selected: 0 // 表示当前菜单的索引，该值在不同的页面表示不同
			});
		}
	})
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f6f8fa;
	}

	.scroll-view {
		padding-bottom: 100rpx;
	}

	.page {
		transition: filter 0.3s ease;
	}
</style>