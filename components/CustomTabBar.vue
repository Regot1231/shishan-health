<template>
	<view class="tabBar">
		<view class="cont">
			<view v-for="(item, index) in list" class="cont-item" :key="index">
				<view v-if="item.search" @click="chooseWay"
					:class="{ search: item.search, item: !item.search, on: selected === index ? true : false, off: selected != index ? true : false,}">
					<image v-if="item.search" :src="selected === index ? item.selectedIconPath : item.iconPath" mode="scaleToFill">
					</image>
					<view :class="{
            txt: true,
            selectedColor: selected === index ? true : false,
          }">{{ item.text }}
					</view>
				</view>
				
				
	
				<view v-else @click="switchTab(item.pagePath)" :class="{
          search: item.search ? true : false,
          item: !item.search,
          on: selected === index ? true : false,
          off: selected != index ? true : false,
        }">
					<image v-if="item.search" :src="selected === index ? item.selectedIconPath : item.iconPath" mode="scaleToFill">
					</image>
					<view :class="{
            txt: true,
            selectedColor: selected === index ? true : false,
          }">{{ item.text }}
					</view>
				</view>
			</view>
		</view>
		<uni-transition mode-class="fade" :show="isShow">
			<view class="way-container">
				<view class="sport" @touchstart="hoverSport = true" @touchend="hoverSport = false" @click="goToSport">
					<image :src="hoverSport ? activeSport : inactiveSport" mode="scaleToFill" />
				</view>
				<view class="food" @touchstart="hoverFood = true" @touchend="hoverFood = false" @click="goToFood">
					<image :src="hoverFood ? activeFood : inactiveFood" mode="scaleToFill" />
				</view>
			</view>
		</uni-transition>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onHide
	} from "@dcloudio/uni-app";
	import {
		postCard
	} from "../api/card";

	const emit = defineEmits(["chooseWay"]);
	const hoverSport = ref(false);
	const hoverFood = ref(false);

	// 图片路径
	const activeSport = "/static/image/bottomBar/sport.png";
	const inactiveSport = "/static/image/bottomBar/sport2.png";
	const activeFood = "/static/image/bottomBar/food2.png";
	const inactiveFood = "/static/image/bottomBar/food.png";
	const props = defineProps({
		selected: Number,
	});
	const goToSport = () => {
		uni.navigateTo({
			url: '/pages/sport/index',
		});
	};
	const imagePath = ref('');
	// 照相功能
	const goToFood = () => {
		// 使用 uni.chooseMedia 让用户选择媒体文件
		uni.chooseMedia({
			count: 1, // 限制为选择一个媒体文件
			mediaType: ['image'], // 支持图片和视频，你可以根据需求修改
			sourceType: ['album', 'camera'], // 支持从相册和相机中选择
			success: function(chooseMediaRes) {
				const tempFilePath = chooseMediaRes.tempFiles[0].tempFilePath;

				// 上传选择的文件
				uni.uploadFile({
					url: 'http://47.115.213.253:3233/common/upload', // 替换为你的服务器URL
					filePath: tempFilePath,
					name: 'file', // 对应于表单数据中的 'file'
					formData: {
						file: `${tempFilePath}`, // 可选参数，上传时携带的参数
					},
					success: async function(uploadFileRes) {
						// 解析响应数据来处理上传后的文件数据
						const data = JSON.parse(uploadFileRes.data);
						console.log("响应数据", data)
						if (data.code === 200) {
							uni.showToast({
								title: '上传成功',
								icon: 'success',
							});
							imagePath.value = data.url;
							uni.setStorageSync("imagePath", data.url)
							uni.navigateTo({
								url: `/pages/grade/index`
							})
							// 你可以根据需要使用 data.url 或其他字段  ???
							console.log("返回的图片地址", data.url)
							const res = await postCard({
								path: imagePath.value
							})
							if (res.code === 200) {
								uni.showToast({
									title: '提交成功',
									icon: 'success',
								});
							} else {
								uni.showToast({
									title: '上传失败',
									icon: 'none',
								});
							}

						} else {
							uni.showToast({
								title: '上传失败',
								icon: 'none',
							});
						}
					},
					fail: function(err) {
						console.error('上传出错:', err);
						uni.showToast({
							title: '上传失败',
							icon: 'none',
						});
					}
				});
			},
			fail: function(err) {
				console.error('选择媒体文件出错:', err);
			}
		});
	};

	// 选择方式是否弹出
	const isShow = ref(false);

	const color = ref("#fff");
	const list = ref([{
			text: "首页",
			pagePath: "/pages/index/index",
			iconPath: "/static/image/bottomBar/index.png",
			selectedIconPath: "/static/image/bottomBar/index-active.png",
		},
		{
			text: "科普",
			pagePath: "/pages/science/index",
			iconPath: "/static/image/bottomBar/index.png",
			selectedIconPath: "/static/image/bottomBar/index-active.png",
		},
		{
			pagePath: "/pages/ranking/ranking",
			iconPath: "/static/image/bottomBar/check-in.png",
			selectedIconPath: "/static/image/bottomBar/check-in.png",
			search: true,
		},
		{
			text: "分享",
			pagePath: "/pages/share/index",
			iconPath: "/static/image/bottomBar/index.png",
			selectedIconPath: "/static/image/bottomBar/index-active.png",
		},
		{
			text: "我的",
			pagePath: "/pages/my/my",
			iconPath: "/static/image/bottomBar/my.png",
			selectedIconPath: "/static/image/bottomBar/my-active.png",
		},
	]);

	const switchTab = (url) => {
		uni.switchTab({
			url,
		});
		console.log(props.selected);
	};

	const chooseWay = () => {
		isShow.value = !isShow.value;
		emit("chooseWay");
	};

	onHide(() => {
		isShow.value = false;
	});
</script>

<style lang="scss" scoped>
	.tabBar {
		z-index: 100;
		width: 100%;
		position: fixed;
		bottom: 0;
		font-size: 28rpx;
		background-color: #fff;
		color: #636363;
		border-radius: 50rpx 50rpx 0px 0px;
		box-shadow: 0px -2rpx 10rpx 0px rgba(0, 0, 0, 0.05);
		text-align: center;
	}

	.cont {
		z-index: 0;
		height: calc(110rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: 70rpx;
		display: flex;
		justify-content: space-around;

		.item {
			font-size: 28rpx;
			text-align: center;
			line-height: 1;
			padding-top: 10rpx;
		}

		.txt {
			margin-top: 20rpx;
		}

		.on {
			position: relative;
		}

		.search {
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
			top: -70rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.search image {
			width: 150rpx !important;
			height: 150rpx !important;
			z-index: 2;
			border-radius: 100%;
		}

		.search .txt {
			margin-top: 26rpx;
		}

		.selectedColor {
			color: #55b89a;
		}
	}

	.way-container {
		display: flex;
		width: 100%;
		justify-content: center;
		position: absolute;
		bottom: 160rpx;

		image {
			width: 100rpx;
			height: 100rpx;
		}

		.sport {
			margin-right: 150rpx;
		}
	}
</style>