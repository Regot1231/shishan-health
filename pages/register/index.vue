<template>
    <view class="content">
        <view class="logo">
            <text class="txt">LOGO</text>
            <text class="tip">守护健康，共创美好生活</text>
        </view>
        <view class="form-box">
            <view class="row-input">
                <wd-icon name="user" size="17px" color="#55B89A" style=" padding: 0rpx 30rpx 0rpx 10rpx;"></wd-icon>
                <input placeholder="请输入用户名" v-model="username" placeholder-class="placeholder" />
            </view>
            <view class="row-input">
                <wd-icon name="lock-on" size="17px" color="#55B89A" style=" padding: 0rpx 30rpx 0rpx 10rpx;"></wd-icon>
                <input placeholder="请输入密码" v-model="password" password placeholder-class="placeholder" />
            </view>
            <view class="login-btn" @click="handleRegister">立即注册</view>
            <view class="menu-link">
                <text @click="goToLogin">已有账号？去登录</text>
            </view>
        </view>

        <view class="bottom-box">
            <image src="https://mp-dc95b988-31eb-4147-82e1-c097f0893940.cdn.bspapp.com/登录模板库/login18/login18_bg.png">
            </image>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/api/user'; // 导入 register 方法

const username = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
    if (username.value && password.value) {
        try {
            const res = await register({ username: username.value, password: password.value });
            if (res.code === 200) {
                uni.showToast({
                    title: '注册成功',
                    icon: 'success',
                });
                uni.navigateTo({ url: '/pages/login/index' }); // 注册成功后跳转到登录页
            } else {
                uni.showToast({
                    title: '注册失败',
                    icon: 'error',
                });
            }
        } catch (error) {
            uni.showToast({
                title: '网络错误，注册失败',
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

const goToLogin = () => {
    uni.navigateTo({ url: '/pages/login/index' });
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
        margin: 30rpx 0rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 20rpx;
        height: 100rpx;
        border: 1rpx solid #bbd1b2;
        border-radius: 20rpx;

        image {
            padding: 0rpx 30rpx 0rpx 10rpx;
            width: 25rpx;
            height: 29rpx;
            flex-shrink: 0;
        }

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