<template>
	<NavBar title="我的头像" :showBack="true" :showShare="false" @back="handleBack" />
	<view :data-weui-theme="theme">
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src="avatarUrl" />
		</button>
	</view>
	<button class="submit" @click="submitAvatar">提交</button>
</template>


<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import NavBar from '../../../components/NavBar.vue';
	import {
		putUserInfo
	} from '../../../api/user';
	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	const avatarUrl = ref(defaultAvatarUrl)
	const theme = ref(wx.getSystemInfoSync().theme)
	const handleBack = () => {
		uni.navigateBack()
	}
	const onChooseAvatar = (e) => {
		avatarUrl.value = e.detail.avatarUrl
	}
	const submitAvatar = async () => {
		const userInfo = uni.getStorageSync("userInfo")
		const data = {
			avatar: avatarUrl.value,
			userId: userInfo.userId,
		}
		const res = await putUserInfo(data)
		if (res.code === 200) {
			uni.showToast({
				title: "修改头像成功",
				icon: "success"
			})
		} else {
			uni.showToast({
				title: "修改头像失败",
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
	.avatar-wrapper {
		padding: 0;
		border-radius: 8px;
		margin-top: 40px;
		width: 56px;
		margin-bottom: 40px;
	}

	.avatar {
		display: block;
		width: 56px;
		height: 56px;
	}
	.submit {
		background-color: #55B89A;
		color: #ffffff;
		border-radius: 20px;
	}
</style>