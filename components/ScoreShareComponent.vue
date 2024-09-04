<template>
	
<!-- 总评分区域 -->
		<view class="score-section">
			<text class="title">总评分</text>
			<text class="description">{{ description }}</text>

			<!-- 模拟圆环评分 -->
			<view class="circle">
				<l-circle v-model:current="modelVale" :percent="target" :stroke-width="27" strokeColor="#55B89A"
					:trailWidth="27" trailColor="#D8F9EF" size="180px">
					<!-- 居中内容 -->
					<view class="circle-content">
						<view class="step-number">{{ scoreDisplay }}</view>
						<view class="bottom-text">分</view>
					</view>
				</l-circle>
			</view>
		</view>
		<!-- 弹框部分 -->

		<!-- 使用组件 isShow：设置弹框是否显示 width：宽度 height：高度 radius：圆角 -->
		<cc-popup :isShow='isshow' width="calc(100vw - 70px)" height="346px" radius="16rpx">
			<!-- 自定义展示内容 -->
			<view class="modelContent">
				<view class="titleV">
                      	图片预览
				</view>
				<view style="margin-top: 20px; color: #666666; margin: 6px 12px;">
						<!-- 图片内容 -->
				</view>
				<image class="imageV" :src="mySrc" mode='aspectFit'></image>
				<button @click="isshow = false" style="width: 80%; height: 48px;margin-top: 20px; background-color: #55B89A;color: white;"> 确定
				</button>
			</view>
			<!-- 自定义关闭按钮 -->
			<view class="close" @click="isshow = false">✕</view>

		</cc-popup>
		<!-- 按钮组 -->
		<view class="button-group">
			<button class="share-button" @click="popupClick">查看图片</button>			
		</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
  //把分数放进来！！
	const modelVale = ref(0)
	const props = defineProps({
		description: {
			type: String,
			default: '您的打卡记录已提交，请等待管理员评分~'
		},
		scoreDisplay: {
			type: String,
			default: '？？'
		},
		mySrc: {
			type: String,
			default: ''
		}
	});
		const target = ref(Number(props.scoreDisplay)) 

	const isshow = ref(false);

	const popupClick = () => {
		isshow.value = !isshow.value;
	}
</script>

<style scoped>
	/* 评分区域 */
	.score-section {
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.title {
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	
	.description {
		font-size: 28rpx;
		color: #999;
		margin-bottom: 30rpx;
	}
	
	/* 圆环样式 */
	.circle {
		width: 450rpx;
		height: 450rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #F0F0F0;
	}
	
	.score {
		font-size: 60rpx;
		color: #33cc99;
		font-weight: bold;
	}
	
	/* 按钮组 */
	.button-group {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.share-button,
	.back-button {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 30rpx;
		text-align: center;
		font-size: 35rpx;
		margin-bottom: 20rpx;
	}
	
	.share-button {
		background-color: #55B89A;
		color: #ffffff;
	}
	
	.back-button {
		background-color: #ffffff;
		border: 2rpx solid #cccccc;
		color: #333333;
	}
	
	.custom-text {
		margin-top: 35%;
		font-size: 50px;
		color: #55B89A;
	}
	
	.custom-font {
		font-size: 16px;
		color: #55B89A;
	}
	
	.circle-content {
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	
	.step-number {
		font-size: 40px;
		/* 数字的字体大小，可以根据需要调整 */
		font-weight: bold;
		color: #55B89A;
	}
	
	.bottom-text {
		font-size: 18px;
		/* 文字的字体大小，可以根据需要调整 */
		margin-left: 1px;
		/* 数字和文字之间的间距 */
		color: #55B89A;
	}
	
	  .content {
	        display: flex;
	        flex-direction: column;
	
	    }
	
	    .popUpBtn {
	        height: 80rpx;
	        line-height: 80rpx;
	        width: 320rpx;
	        margin-top: 120rpx;
	        margin-left: auto;
	        margin-right: auto;
	        margin-bottom: 50rpx;
	        background-color: bisque;
	        text-align: center;
	    }
	
	    .modelContent {
	        width: 100%;
	        height: 100%;
	        display: flex;
	        align-items: center;
	        flex-direction: column;
	    }
	
	    .titleV {
	
	        width: 100%;
	        height: 36px;
	        line-height: 30px;
	        font-weight: 550;
	        text-align: center;
	        margin-top: 8px;
	        font-size: 17px;
	        border-bottom: 1px solid #F1F1F1;
	    }
	
	    .imageV {
	
	        margin-top: 0px;
	        width: calc(100vw - 100px);
	        height: calc((100vw - 100px) * 0.567);
	    }
	
	    .close {
	        width: 60rpx;
	        height: 60rpx;
	        color: #FFFFFF;
	        line-height: 60rpx;
	        text-align: center;
	        border-radius: 50%;
	        border: 1px solid #FFFFFF;
	        position: relative;
	        bottom: -10%;
	        left: 50%;
	        transform: translate(-50%, -50%);
	    }
</style>