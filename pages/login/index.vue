<template>
	<view class="content">
		<view class="logo">
			<text class="txt">LOGO</text>
			<text class="tip">守护健康，共创美好生活</text>
		</view>
		<view class="form-box">
			<view class="row-input">
				<wd-icon name="user" size="17px" color="#55B89A" style=" padding: 0rpx 30rpx 0rpx 10rpx;"></wd-icon>
				<input placeholder="请输入用户名" maxlength="11" v-model="username" placeholder-class="placeholder" />
			</view>
			<view class="row-input">
				<wd-icon name="lock-on" size="17px" color="#55B89A" style=" padding: 0rpx 30rpx 0rpx 10rpx;"></wd-icon>
				<input placeholder="请输入密码" maxlength="18" v-model="password" password placeholder-class="placeholder" />
			</view>
			<view class="login-btn" @click="handleWeixinLogin">微信快捷登录</view>
			<view class="login-btn" @click="handleLogin">登录</view>
			<view class="menu-link">
				<text @click="goToRegister">注册账号</text>
				<text>忘记密码？</text>
			</view>
		</view>

		<view class="bottom-box">
			<image src="https://mp-dc95b988-31eb-4147-82e1-c097f0893940.cdn.bspapp.com/登录模板库/login18/login18_bg.png">
			</image>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useRouter
	} from 'vue-router';
	import {
		login
	} from '@/api/user'; // 导入 login 方法

	const username = ref('');
	const password = ref('');
	const router = useRouter();

	const handleLogin = async () => {
		if (username.value && password.value) {
			try {
				const res = await login({
					username: username.value,
					password: password.value
				});
				if (res.code === 200) {
					uni.showToast({
						title: '登录成功',
						icon: 'success',
					});
					// 保存 token，并跳转到主页面或其他页面
					uni.setStorageSync('token', res.token);
					uni.switchTab({
						url: '/pages/index/index'
					}); // 假设主页为 /pages/index/index
				} else {
					uni.showToast({
						title: '登录失败',
						icon: 'error',
					});
				}
			} catch (error) {
				uni.showToast({
					title: '网络错误，登录失败',
					icon: 'error',
				});
			}
		} else {
			uni.showToast({
				title: '请输入用户名和密码',
				icon: 'none',
			});
		}
	};
	// 微信快捷登录
	const handleWeixinLogin = () => {
		uni.login({
			provider: 'weixin',
			success: (loginRes) => {
				console.log('登录成功:', loginRes)
				const code = loginRes.code
				// 将code发送到服务器
				sendCodeToServer(code)
			},
			fail: (error) => {
				console.error('登录失败:', error)
			}
		})
	}
	const sendCodeToServer = (code) => {
		uni.request({
			url: 'http://47.115.213.253:3233/system/user/sessionId', // 替换为你的后端登录接口
			method: 'GET',
			data: {
				code: code
			},
			success: (res) => {
				console.log(res.data)
				if (res.data.session_key) {
					// 假设服务器返回一个token
					// const token = res.data.token
					uni.setStorageSync('session_key', res.data.session_key)
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})
					// 跳转到首页或其他页面
					uni.navigateTo({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						title: '登录失败',
						icon: 'none'
					})
				}
			},
			fail: (err) => {
				console.error('请求失败:', err)
				uni.showToast({
					title: '请求失败',
					icon: 'none'
				})
			}
		})
	}
	const goToRegister = () => {
		uni.navigateTo({
			url: '/pages/register/index'
		});
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #ececee;
	}

	.logo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 25vh;
		font-size: 60rpx;

		.txt {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 160rpx;
			height: 160rpx;
			color: #ffffff;
			font-size: 40rpx;
			font-weight: bold;
			letter-spacing: 5rpx;
			border-radius: 20rpx;
			background-color: #55B89A;
		}

		.tip {
			letter-spacing: 10rpx;
			font-size: 35rpx;
			line-height: 100rpx;
			color: #55B89A;
		}
	}

	.form-box {
		padding: 20rpx 60rpx;

		.row-input {
			color: #55B89A;
			margin: 30rpx 0rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 20rpx;
			height: 100rpx;
			border: 1rpx solid #bbd1b2;
			border-radius: 20rpx;



			.placeholder {
				font-size: 30rpx;
				color: #55B89A;
			}

			input {
				font-size: 30rpx;
				padding: 0rpx 40rpx;
				color: #55B89A;
				border-left: 3rpx solid #55B89A;
			}
		}

		.login-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 35rpx;
			height: 100rpx;
			border-radius: 20rpx;
			color: #ffffff;
			background-color: #55B89A;
			margin-bottom: 20rpx;
		}

		.menu-link {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			color: #55B89A;
			letter-spacing: 3rpx;
			line-height: 80rpx;
		}
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100%;
		height: 35vh;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>