<template>
	<view class="container">
		<!-- 地图 -->
		<map :latitude="latitude" :longitude="longitude" :markers="markers" :show-location="true" :scale="16"
			class="map"></map>

		<!-- 运动数据浮动层，调整到“GO”按钮上方 -->
		<view class="overlay running-info">
			<view class="data-item">
				<text class="data-value">{{ speed }}</text>
				<text class="data-label">速度 m/分</text>
			</view>
			<view class="data-item">
				<text class="data-value">{{ formattedTime }}</text>
				<text class="data-label">步行时长</text>
			</view>
			<view class="data-item">
				<text class="data-value">{{ distance }}</text>
				<text class="data-label">步行距离</text>
			</view>
		</view>

		<!-- 底部控制按钮 -->
		<view class="overlay control-buttons">
			<!-- 运动记录 -->
			<view class="icon-button" @click="viewHistory">
				<wd-icon name="list" size="22px" color="#55B89A" class="icon"></wd-icon> <!-- 这里假设你有一个历史记录图标 -->
				<text class="button-label">运动记录</text>
			</view>
			<button :class="goButtonClass" @click="toggleRunning">{{ goButtonText }}</button>
			<!-- 设置 -->
			<view class="icon-button" @click="openSettings">
				<wd-icon name="setting" size="22px" color="#55B89A" class="icon"></wd-icon> <!-- 这里假设你有一个设置图标 -->
				<text class="button-label">设置</text>
			</view>
		</view>
	</view>
</template>



<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue';

	const latitude = ref(0);
	const longitude = ref(0);
	const markers = ref([]);
	const speed = ref(0); // 平均速度
	const distance = ref(0.0);
	const formattedTime = ref('00:00:00');
	const debugInfo = ref('调试信息：');
	const goButtonText = ref('GO'); // 初始按钮文字
	const goButtonClass = ref('go-button'); // 初始按钮样式
	const totalDuration = ref(0); // 总运动时长（秒）
	const score = ref(0); // 最终得分
	const runningRecords = ref([]);  	//收集的数据结构

	let scheme1Count = 0; // 方案1得分次数
	let scheme2Count = 0; // 方案2得分次数
	let combinedCount = 0; // 两种方案有效得分次数之和

	let timer = null;
	let startTime = null;
	let startLocation = null;
	let lastLocation = null;
	let lastTimestamp = null;
	let interval = 5; // 计算平均速度的时间间隔（秒）
	let watchId = null;
	let isCounting = false; // 是否在计时
	let gender = 'male'; // 根据用户选择设置性别，假设为 'male' 或 'female'
	const maleSpeedRange = {
		min: 80,
		max: 120
	};
	const femaleSpeedRange = {
		min: 75,
		max: 112
	};
	const speedRange = gender === 'male' ? maleSpeedRange : femaleSpeedRange;

	const toggleRunning = () => {
		if (goButtonText.value === 'GO') {
			startRunning();
		} else {
			stopRunning();
		}
	};

	// 获取用户地理位置
	const getUserLocation = () => {
		debugInfo.value += '\n开始获取用户定位权限';
		uni.getSetting({
			success(res) {
				if (!res.authSetting['scope.userLocation']) {
					debugInfo.value += '\n未授权定位权限，申请授权中';
					uni.authorize({
						scope: 'scope.userLocation',
						success() {
							debugInfo.value += '\n授权成功，开始获取位置';
							fetchLocation();
						},
						fail() {
							debugInfo.value += '\n授权失败，提示用户前往设置开启权限';
							uni.showModal({
								title: '授权失败',
								content: '请前往设置中开启地理位置权限',
								success(modalRes) {
									if (modalRes.confirm) {
										debugInfo.value += '\n用户同意前往设置';
										uni.openSetting();
									}
								}
							});
						}
					});
				} else {
					debugInfo.value += '\n已授权定位权限，开始获取位置';
					fetchLocation();
				}
			},
			fail(err) {
				debugInfo.value += `\n获取用户设置失败: ${JSON.stringify(err)}`;
			}
		});
	};

	// 获取当前位置
	const fetchLocation = () => {
		uni.getLocation({
			type: 'gcj02',
			success(locRes) {
				debugInfo.value += `\n当前位置获取成功: 经度: ${locRes.longitude}, 纬度: ${locRes.latitude}`;
				latitude.value = locRes.latitude;
				longitude.value = locRes.longitude;
				markers.value = [{
					id: 1,
					latitude: locRes.latitude,
					longitude: locRes.longitude,
					title: '当前位置'
				}];
				// 设置开始位置
				startLocation = {
					latitude: locRes.latitude,
					longitude: locRes.longitude
				};
				lastLocation = {
					...startLocation
				};
				lastTimestamp = Date.now(); // 初始化时间戳
			},
			fail(err) {
				debugInfo.value += `\n获取当前位置失败: ${JSON.stringify(err)}`;
			}
		});
	};

	// 开始跑步
	const startRunning = () => {
		goButtonText.value = '结束';
		goButtonClass.value = 'stop-button';
		debugInfo.value += '\n开始跑步';
		startTime = Date.now();
		if (startLocation) {
			distance.value = 0; // 初始化距离为0
		}

		// 开启位置更新
		uni.startLocationUpdate({
			success() {
				debugInfo.value += '\n位置更新已开启';
				// 监听位置变化
				watchId = uni.onLocationChange((locRes) => {
					debugInfo.value +=
						`\n位置变化: 经度: ${locRes.longitude}, 纬度: ${locRes.latitude}, 速度: ${locRes.speed}`;
					const newLocation = {
						latitude: locRes.latitude,
						longitude: locRes.longitude
					};
					const currentTime = Date.now();
					const timeElapsed = (currentTime - lastTimestamp) / 1000; // 秒

					// 计算速度是否在范围内
					const currentSpeed = locRes.speed * 60; // 转换成米/分钟
					if (currentSpeed >= speedRange.min && currentSpeed <= speedRange.max) {
						// 如果速度在范围内，继续计时
						if (!isCounting) {
							isCounting = true; // 恢复计时
							lastTimestamp = currentTime; // 重置时间戳
						}

						if (timeElapsed >= interval) {
							const distanceTraveled = calculateDistance(lastLocation, newLocation);
							distance.value += distanceTraveled;
							const intervalSpeed = calculateIntervalSpeed(distanceTraveled,
								timeElapsed);
							speed.value = parseFloat(intervalSpeed).toFixed(1);
							lastLocation = newLocation;
							lastTimestamp = currentTime;
						}
					} else {
						// 如果速度不在范围内，暂停计时
						isCounting = false;
						debugInfo.value += `\n速度不在规定范围内，暂停计时`;
					}
				});
			},
			fail(err) {
				debugInfo.value += `\n开启位置更新失败: ${JSON.stringify(err)}`;
			}
		});

		timer = setInterval(updateTime, 1000);
	};

	// 停止跑步
	const stopRunning = () => {
		debugInfo.value += '\n停止跑步';
		goButtonText.value = 'GO';
		goButtonClass.value = 'go-button';

		// 清除计时器
		clearInterval(timer);

		// 停止位置更新
		uni.stopLocationUpdate({
			success() {
				debugInfo.value += '\n位置更新已停止';
			},
			fail(err) {
				debugInfo.value += `\n停止位置更新失败: ${JSON.stringify(err)}`;
			}
		});

		// 关闭位置变化监听
		uni.offLocationChange(watchId);
		// 计算得分
		calculateScore();



		// 将速度值重置为0
		speed.value = 0;
		// 重置其他数据
		distance.value = 0;
		formattedTime.value = '00:00:00';
		totalDuration.value = 0;
	};
		// 计算得分
		const calculateScore = () => {
			const minutes = Math.floor(totalDuration.value / 60);
			let earnedScore = 0;
		
			if (combinedCount < 3) {
				if (minutes >= 15 && scheme2Count < 3) {
					scheme2Count += 1;
					combinedCount += 1;
					earnedScore = 3; // 方案2得3分
				}
		
				if (minutes >= 10 && combinedCount < 3 && scheme1Count < 3) {
					let scheme1Score = 1; // 第一个10分钟得1分
		
					if (minutes >= 20) {
						scheme1Score += 3; // 第二个10分钟得3分
						if (minutes > 20) {
							const additional10Min = Math.floor((minutes - 20) / 10);
							scheme1Score += additional10Min * 3; // 之后的每10分钟得3分
						}
					}
		
					scheme1Count += 1;
					combinedCount += 1;
					earnedScore = scheme1Score;
				}
			}
		
			score.value = earnedScore;
		
			// 保存记录
			const newRecord = {
				date: new Date().toLocaleDateString(), // 当前日期
				time: formattedTime.value,
				distance: distance.value,
				points: earnedScore,
				scheme: earnedScore === 3 ? 2 : 1, // 根据得分判断使用的方案
				totalPoints: score.value, // 当天总积分
				totalCount: combinedCount ,// 当天总次数
			};
		
			runningRecords.value.push(newRecord);
			uni.setStorageSync("runningRecords", runningRecords.value)  //把运动数据存起来
		
			console.log(`总运动时间: ${formattedTime.value}, 方案1得分次数: ${scheme1Count}, 方案2得分次数: ${scheme2Count}, 得分: ${score.value}`);
		};

	// 更新计时器
	const updateTime = () => {
		if (isCounting) {
			const elapsed = Math.floor((Date.now() - startTime) / 1000);
			totalDuration.value = elapsed; // 记录总时间（秒）
			formattedTime.value = formatTime(elapsed); // 格式化时间为 HH:MM:SS
		}
	};


	// 计算两点之间的距离
	const calculateDistance = (loc1, loc2) => {
		const radLat1 = loc1.latitude * Math.PI / 180.0;
		const radLat2 = loc2.latitude * Math.PI / 180.0;
		const deltaLat = radLat1 - radLat2;
		const deltaLng = (loc1.longitude - loc2.longitude) * Math.PI / 180.0;
		const distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) +
			Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
		return parseFloat((distance * 6378137).toFixed(1)); // 返回距离，单位米
	};

	// 计算时间间隔内的平均速度
	const calculateIntervalSpeed = (dist, time) => {
		return (dist / time) * 60; // 返回速度，单位米/分钟
	};

	// 格式化时间
	const formatTime = (seconds) => {
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};


	// 查看运动记录
	const viewHistory = () => {
		debugInfo.value += '\n查看运动记录';
		// 模拟获取后端记录
      uni.navigateTo({
			url: `/pages/sport/runningRecords/index`
		});
	};

	// 打开设置
	const openSettings = () => {
		uni.navigateTo({
			url: "/pages/my/settings/index"
		})
	};

	onMounted(() => {
		getUserLocation();
	});

	onUnmounted(() => {
		clearInterval(timer);
		uni.offLocationChange(watchId);
	});
</script>



<style scoped>
	.container {
		position: relative;
		width: 100%;
		height: 100vh;
		/* 高度设置为全屏 */
		overflow: hidden;

	}

	.map {
		width: 100%;
		height: 100%;
		/* 地图占满整个容器 */
	}

	.overlay {
		position: absolute;
		width: 75%;
		left: 12.5%;
		z-index: 10;
	}

	/* 运动数据框样式 */
	.running-info {
		bottom: 160px;
		/* 数据框距离“GO”按钮稍微更近一些 */
		display: flex;
		justify-content: space-around;
		padding: 8px 0px;
		/* 调整内边距，使其稍微小一点 */
		background-color: white;
		/* 白色背景 */
		border-radius: 12px;
		/* 边角圆润 */
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		/* 添加阴影效果 */
	}

	/* 控制按钮区域样式 */
	.control-buttons {
		bottom: 20px;
		/* 按钮区域在底部浮动，距离底部20px */
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10px 22px;
		background-color: #FFFFFF;
		/* 半透明背景 */
		border-radius: 10px;
	}

	.data-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* 数据项的值和标签 */
	.data-label {
		font-size: 14px;
		/* 略小的字体 */
		color: #666;
		margin-top: 4px;
		/* 调整文字和数字之间的间距 */
	}

	.data-value {
		font-size: 20px;
		/* 略小的数字字体 */
		font-weight: bold;
		color: #55B89A;
		/* 数字颜色为紫色 */
	}

	/* 新增icon-button样式 */
	.icon-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 60px;
		/* 图标按钮的宽度 */
		height: 60px;
		/* 图标按钮的高度 */
		text-align: center;
	}

	.icon {
		width: 30px;
		/* 图标宽度 */
		height: 30px;
		/* 图标高度 */
	}

	.button-label {
		font-size: 12px;
		/* 按钮文字字体大小 */
		color: #333;
		margin-top: 4px;
		/* 图标与文字的间距 */
	}

	/* GO按钮样式 */
	.go-button {
		width: 100px;
		/* 增加按钮宽度 */
		height: 100px;
		/* 增加按钮高度 */
		background-color: #55B89A;
		color: white;
		font-size: 40px;
		/* 增加按钮文字字体大小 */
		border-radius: 50%;
		line-height: 100px;
		/* 使文字居中 */
		text-align: center;
	}

	/* 结束按钮样式 */
	.stop-button {
		width: 100px;
		/* 保持与GO按钮一致 */
		height: 100px;
		/* 保持与GO按钮一致 */
		background-color: #f55959;
		color: white;
		font-size: 22px;
		/* 保持与GO按钮一致 */
		border-radius: 50%;
		line-height: 100px;
		/* 保持与GO按钮一致 */
		text-align: center;
	}
</style>