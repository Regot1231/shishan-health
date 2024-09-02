<template>
			<NavBar title="修改密码" :showBack="true" :showShare="false" @back="handleBack" />
	<view class="change-password-page">

		<view class="header">
			<text class="title">修改密码</text>
		</view>

		<view class="form">
			<input v-model="oldPassword" class="input" type="password" placeholder="旧密码" />
			<input v-model="newPassword" class="input" type="password" placeholder="新密码" />
			<input v-model="confirmPassword" class="input" type="password" placeholder="确认新密码" />
			<button class="submit-btn" @click="handleChangePassword">提交</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import NavBar from '../../../components/NavBar.vue';
	const oldPassword = ref('')
	const newPassword = ref('')
	const confirmPassword = ref('')
  const handleBack = () => {
    uni.navigateBack();
  };
	const handleChangePassword = () => {
		if (newPassword.value !== confirmPassword.value) {
			uni.showToast({
				title: '新密码与确认密码不一致',
				icon: 'none'
			})
			return
		}

		// 在此添加修改密码的逻辑
		uni.showToast({
			title: '密码已修改',
			icon: 'success'
		})
	}
</script>

<style scoped>
	.change-password-page {
		padding: 20px;
		background-color: #f5f5f5;
		height: 100vh;
	}

	.header {
		text-align: center;
		margin-bottom: 20px;
	}

	.title {
		font-size: 32px;
		font-weight: bold;
	}

	.form {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		padding: 20px;
	}

	.input {
		width: 100%;
		height: 50px;
		border: 1px solid #ddd;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 0 10px;
	}

	.submit-btn {
		width: 100%;
		height: 50px;
		background-color: #55B89A;
		color: #fff;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
	}
</style>