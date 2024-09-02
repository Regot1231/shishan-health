<template>
	<view class="main">
		<view class="sport-content">
			<!-- 左侧圆形步数统计 -->
			<view class="step-num">
				<l-circle :percent="wxRunData / 200" v-model:current="modelVale" :stroke-width="13"
					strokeColor="#55B89A" :trailWidth="13" trailColor="#D8F9EF" :dashboard="true">
					<!-- 居中内容 -->
					<view class="circle-content">
						<view class="step-number">{{ wxRunData }}</view>
						<view class="bottom-text">今日步数</view>
					</view>
				</l-circle>

			</view>
			<!-- 右侧其他内容 -->
			<view class="main-content">
				<view class="other-content">
					<view class="item">
						<text class="score-label">今日积分</text>
						<text class="score-value">{{ runningRecordsToday.totalPoints }}</text>
					</view>
					<view class="item">
						<text class="rank-label">队内排名</text>
						<text class="rank-value">no.1</text>
					</view>
				</view>
				<view class="exercise-prescription">
					<text class="exercise-label">运动处方</text>
					<view class="exercise-steps" :style="{ backgroundColor: isActive ? '#55B89A' :  '#D8F9EF'}">
						<view :class="{'step': true, 'active': (runningRecordsToday.totalCount >= 1)}"></view>
						<view :class="{'step': true, 'big_active': (runningRecordsToday.totalCount >= 2)}"></view>
						<view class="step"  :style="{ backgroundImage: isActive ? `url('/static/image/index/Group 43.png')` : `url('/static/image/index/Group 42.png')` }"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="search">
			<view class="search-content">
				<image src="../../../static/image/index-question-icon(1).png" class="icon" />
				<text class="text-main">问卷调查 去查看~</text>
			</view>
			<view class="search-button" @click="goToQuestion">查看</view>
		</view>
		<view class="recommend">
			<view class="container">
				<view class="header">
					<text class="header-title">热门推荐</text>
					<text class="more-button" @click="goToScience">更多 ></text>
				</view>
				<view class="recommendation-list">
					<RecommendationItem v-for="(item, index) in recommendations" :key="index" :title="item.titile"
						:description="item.content" :image="item.cover" :articleId="item.articleId" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed
	} from "vue";
	import RecommendationItem from "../components/RecommendationItem.vue";
	import {
		getHotInfo
	} from "../../../api/article";
	defineProps({
		wxRunData: Number,
	});
	// 写circle的逻辑
	// 还要算进度
	const modelVale = ref(0)
	const runningRecords = ref([])
	const runningRecordsToday = ref({
		totalPoints: 0, // 当天总积分
		totalCount: 0, // 当天总次数
	})
	const isActive = ref(false)
	// const newRecord = {
	// 	date: new Date().toLocaleDateString(), // 当前日期
	// 	time: formattedTime.value,
	// 	distance: distance.value,
	// 	points: earnedScore,
	// 	scheme: earnedScore === 3 ? 2 : 1, // 根据得分判断使用的方案
	// 	totalPoints: score.value, // 当天总积分
	// 	totalCount: combinedCount, // 当天总次数
	// };

	// const currentRate = ref(0);
	// const text = 9374 //编辑微信步数
	//得到微信步数之后
	// const text = ref(''); // 显示的文本
	// const steps = 9374;

	//   // 假设目标步数为 10000 步
	//   const targetSteps = 10000;

	//   // 计算步数的百分比
	//   const percentage = (steps / targetSteps) * 100;

	//   currentRate.value = percentage;
	//   text.value = steps.toString(); // 设置显示文本为步数

	const goToQuestion = () => {
		uni.navigateTo({
			url: "/pages/question/index",
		});
	};
	const goToGrade = () => {
		uni.navigateTo({
			url: "/pages/ranking/index",
		});
	};
	const goToScience = () => {
		uni.switchTab({
			url: "/pages/science/index",
		});
	};

	const recommendations = ref([]);
	const fetchRecommendations = async () => {
		const res = await getHotInfo()
		if (res.code === 200) {
			recommendations.value = res.rows
		} else {
			uni.showToast({
				title: res.msg || '获取热推荐失败',
				icon: 'error'
			});
		}
	};
	onMounted(() => {
		fetchRecommendations();
		runningRecords.value = uni.getStorageSync("runningRecords")
		if (runningRecords.value[0]) {
			runningRecordsToday.value = runningRecords.value[0]
		} else {
			uni.showToast({
				title: "获取跑步记录失败",
				icon: 'error'
			});
		}
		if(runningRecordsToday.value.totalCount >=3) {
			isActive.value = true
		} 
	});
</script>

<style lang="scss" scoped>
	.main {
		margin-top: 70rpx;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;

		.sport-content {
			display: flex;
			justify-content: space-between;

			.step-num {
				width: 300rpx;
				height: 300rpx;
				background-image: linear-gradient(to right, #e5f9f2, #f7faf9);
				border-radius: 20rpx;
				border: 1px solid #fff;
				margin-right: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.circle-content {
				width: 80px;
				text-align: center;
			}

			.circle {
				width: 260rpx;
				height: 260rpx;
				background-color: #fff;
				border-radius: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);

				.step-count {
					font-size: 50rpx;
					color: #333;
					font-weight: bold;
				}

				.step-label {
					font-size: 26rpx;
					color: #999;
					margin-top: 10rpx;
				}
			}

			.main-content {
				flex: 1;
				height: 300rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.other-content {
					display: flex;
					justify-content: space-between;

					.item {
						width: 170rpx;
						height: 140rpx;
						background-image: linear-gradient(to right, #e5f9f2, #f7faf9);
						border-radius: 20rpx;
						border: 1px solid #fff;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.score-label,
						.rank-label {
							font-size: 26rpx;
							color: #999;
						}

						.score-value,
						.rank-value {
							font-size: 36rpx;
							color: #333;
							font-weight: bold;
							margin-top: 10rpx;
						}
					}
				}

				.exercise-prescription {
					height: 140rpx;
					background-image: linear-gradient(to right, #e5f9f2, #f7faf9);
					border-radius: 20rpx;
					border: 1px solid #fff;
					padding: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.exercise-label {
						font-size: 26rpx;
						color: #999;
					}

					.exercise-steps {
						display: flex;
						justify-content: space-between;
						background-color: #D8F9EF;
						border-radius: 50rpx;
						

						.step {
							position: relative;
							width: 40rpx;
							height: 40rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 26rpx;
							color: red;
							box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
							margin-left: 35px;
							z-index: 2;
							background-image: url("/static/image/index/Group 42.png");
							background-size: cover;
							// background-color: red;
						}

						.step::before {
							content: '';
							position: absolute;
							left: -35px;
							/* 距离左边的距离等于 margin-left 的值 */
							top: 0;
							width: 35px;
							/* 宽度等于 margin-left 的值 */
							height: 100%;
							background-color: transparent;
							/* 默认透明 */
						}

						.step.active::before {
							background-color: #55B89A;
							border-radius: 20px 0px 0px 20px;
						}

						.step.active {
							background-color: #55B89A;
							border-radius: 0 20px 20px 0;
							background-image: url("/static/image/index/Group 43.png");
							border-left: 1px solid #55B89A;
						}

						.step.big_active::before, .step.active {
							background-color: #55B89A;
							border-radius: 0 0 0 0;
						}

						.step.big_active {
							background-color: #55B89A;
							border-radius: 0 20px 20px 0;
							background-image: url("/static/image/index/Group 43.png");
							
						}

					}
				}
			}
		}

		.search {
			height: 100rpx;
			background-color: rgb(190, 188, 188);
			border-radius: 20rpx;
			margin-top: 30rpx;
		}

		.recommend {
			height: 45vh;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 30rpx;
		}
	}

	.search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		background: linear-gradient(to right, #e94e77, #d94f6a);
		border-radius: 50rpx;
		box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.2);
	}

	.search-content {
		display: flex;
		align-items: center;
	}

	.icon {
		width: 70rpx;
		height: 70rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
	}

	.text-main {
		font-size: 30rpx;
		color: #fff;
		font-weight: bold;
	}

	.search-button {
		font-size: 26rpx;
		color: #ffffff;
		padding: 10rpx 30rpx;
		border-radius: 50rpx;
		border: 2rpx solid rgba(255, 255, 255, 0.5);
	}

	.container {
		padding: 20px;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.header-title {
		font-size: 20px;
		font-weight: bold;
		color: #333;
	}

	.more-button {
		font-size: 14px;
		color: #999999;
	}

	.recommendation-list {
		display: flex;
		flex-direction: column;
	}

	.circle-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.step-number {
		font-size: 22px;
		/* 根据需求调整数字大小 */
		font-weight: bold;
		z-index: 1;
		color: #55B89A;
		/* 确保数字在文字上方 */
	}

	.bottom-text {
		position: absolute;
		bottom: 10px;
		/* 根据需求调整底部的距离 */
		font-size: 12px;
		/* 根据需求调整文字大小 */
		color: #55B89A;
		font-weight: bold;
		/* 文字颜色 */
		margin-left: 12%;
	}
</style>