<template>
	<NavBar title="我的昵称" :showBack="true" :showShare="false" @back="handleBack" />
	<view :data-weui-theme="theme">
		<!-- form 表单 -->
		<form @submit="onSubmit">
			<view class="weui-cells">
				<view class="weui-cell">
					<view class="weui-cell__title">昵称</view>
					<input v-model="nickname" type="nickname" class="weui-input" placeholder="请输入昵称" />
				</view>
			</view>

			<!-- 提交按钮 -->
			<button form-type="submit" class="submit-button">提交</button>
		</form>
	</view>
</template>


<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import NavBar from '../../../components/NavBar.vue';
	import { putUserInfo } from '../../../api/user';
	const theme = ref(wx.getSystemInfoSync().theme)
	const nickname = ref('') // 绑定用户输入的昵称
	const handleBack = () => {
		uni.navigateBack()
	}

	// 处理表单提交
	const onSubmit = async (e) => {
		e.preventDefault() // 阻止默认的提交行为

		// 收集用户输入的数据

			const userInfo = uni.getStorageSync("userInfo")
			const data = {
				nickName: nickname.value,
				userId: userInfo.userId
			}
			const res = await putUserInfo(data)
			if (res.code === 200) {
				uni.showToast({
					title: "修改昵称成功",
					icon: "success"
				})
			} else {
				uni.showToast({
					title: "修改昵称失败",
					icon: "error"
				})
			}
	}

	onMounted(() => {
		wx.onThemeChange((result) => {
			theme.value = result.theme
		})
	})
</script>

<style scoped>
	.weui-cell {
		text-align: center;
	}
	.weui-input {
		margin-top: 20px;

	}
	.submit-button {
		margin-top: 50px;
		background-color: #55B89A;
		color: #ffffff;
		border: none;
		border-radius: 20px;
		cursor: pointer;
	}

</style>