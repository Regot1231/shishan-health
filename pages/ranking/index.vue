<template>
	<CustomNavbar position="center" title="排行榜" showBack="true" :isFixed="false"
		style="padding-top: 70px; font-size: 17px;" />
	<view class="container">
		<!-- 时间切换 -->
		<view class="time-selector">
			<view class="ranking-text">排行榜</view>
			<view class="time">
				<text :class="{ active: selectedTime === 'day' }" @click="changeTime('day')">日</text>
				<text :class="{ active: selectedTime === 'week' }" @click="changeTime('week')">周</text>
				<text :class="{ active: selectedTime === 'month' }" @click="changeTime('month')">月</text>
			</view>
		</view>

		<!-- 分类切换 -->
		<view class="category-selector">
			<text :class="{ active: selectedCategory === 'health' }" @click="changeCategory('health')">饮食健康</text>
			<text :class="{ active: selectedCategory === 'sport' }" @click="changeCategory('sport')">微信运动</text>
		</view>

		<!-- 排行榜 -->
		<view class="ranking-list">
			<view v-for="(item, index) in rankingList" :key="index"
				:class="['ranking-item', getBackgroundClass(index)]">
				<view class="left-content">
					<text class="rank-text" v-if="index > 2">{{ index + 1 }}</text>
					<image v-if="index < 3" :src="getMedal(index)" class="medal" />
					<image :src="getAvatar(index)" class="avatar" />
					<text class="name">{{ item.name }}</text>
				</view>
				<text class="score">{{ item.score }}分</text>
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
		fetchRankingData
	} from "../../services/ranking";
	import CustomNavbar from "@/components/CustomNavbar.vue";
	const selectedTime = ref("week"); // 默认周
	const selectedCategory = ref("health"); // 默认饮食健康
	const rankingList = ref([]);

	const changeTime = (time) => {
		selectedTime.value = time;
		fetchData();
	};

	const changeCategory = (category) => {
		selectedCategory.value = category;
		fetchData();
	};

	const fetchData = async () => {
		const params = {
			time: selectedTime.value,
			category: selectedCategory.value,
		};
		const response = await fetchRankingData(params);
		rankingList.value = response.data;
	};

	onMounted(() => {
		fetchData();
	});

	const getMedal = (index) => {
		const medals = [
			"../../static/image/ranking/gold.png",
			"../../static/image/ranking/silver.png",
			"../../static/image/ranking/bronze.png",
		];
		return medals[index];
	};
	const getAvatar = (index) => {
		const avatars = [
			"../../static/image/ranking/Ellipse1.png",
			"../../static/image/ranking/Ellipse2.png",
			"../../static/image/ranking/Ellipse3.png",
		];
		return avatars[index];
	};
	// 设置前三名背景样式
	const getBackgroundClass = (index) => {
		if (index === 0) return "first-place";
		if (index === 1) return "second-place";
		if (index === 2) return "third-place";
		return "";
	};
</script>

<style scoped>
	.container {
		padding: 0 20px;
		margin-top: 5%;
		position: relative;
	}

	.time-selector {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.time-selector .ranking-text {
		color: #ffffff;
		font-size: 26px;
		text-align: center;
		font-weight: bold;
	}

	.time-selector .time {
		background-color: #ffffff;
		border-radius: 45rpx;
		display: flex;
	}

	.category-selector {
		font-size: 20px;
		display: flex;
		justify-content: space-around;
		margin-bottom: 20px;
		background-color: #ffffff;
		border-radius: 15rpx;
	}

	.time-selector text {
		padding: 8px 17px;
		border-radius: 20px;
		border: 3px solid white;
		color: #777777;
	}

	.category-selector text {
		padding: 10px 40px;
		border-radius: 10px;
		border: 3px solid white;
		color: #777777;
	}

	.time-selector text.active,
	.category-selector text.active {
		background-color: #55B89A;
		color: white;
	}

	.ranking-list {
		border-radius: 10px;
		padding: 10px;
	}

	.ranking-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		border: 1px solid #ddd;
		margin-bottom: 40rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
	}
	.ranking-item:first-child {
				box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
	}
	.left-content {
		display: flex;
		align-items: center;
	}

	.rank-text {
		margin-left: 35rpx;
		font-size: 20px;
	}

	.medal {
		width: 50px;
		height: 40px;
		margin-right: 20rpx;
	}

	.avatar {
		width: 50px;
		height: 50px;
		margin-right: 20rpx;
		border-radius: 50%;
	}

	.name {
		font-size: 20px;
	}

	.score {
		font-size: 20px;
		margin-right: 10rpx;
	}

	/* 背景渐变样式 */
	.first-place {
		background: linear-gradient(to right, #f6d365, #fda085);
	}

	.second-place {
		background: linear-gradient(to right, #cfd9df, #e2ebf0);
	}

	.third-place {
		background: linear-gradient(to right, #fbc2eb, #a6c1ee);
	}
</style>