<template>
    <view>
      <NavBar title="设置" :showBack="true" :showShare="false" @back="handleBack" />
      <view class="container">
        <view class="settings-page">
          <view class="settings-content">
            <view class="item" @click="navigateTo('/pages/my/settings/changePassword')">
              <text class="item-label">修改密码</text>
            </view>
            <view class="item" @click="logout">
              <text class="item-label">退出登录</text>
            </view>
            <view class="item" @click="navigateTo('/pages/my/settings/aboutUs')">
              <text class="item-label">关于我们</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import NavBar from "@/components/NavBar.vue";
  
  const navigateTo = (url) => {
    uni.navigateTo({
      url: url
    })
  }
  
  const handleBack = () => {
    uni.navigateBack();
  };
  
  const logout = () => {
    uni.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          uni.clearStorage({
            success() {
              uni.showToast({
                title: '已退出登录',
                icon: 'success'
              })
              uni.redirectTo({
                url: '/pages/login/index' // 跳转到登录页面
              })
            },
            fail() {
              uni.showToast({
                title: '退出登录失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    background-color: #ffffff;
  }
  
  .settings-page {
    width: 40%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 0 auto; /* Center horizontally */
  }
  
  .settings-content {
    border-radius: 10px;
	background-color: #55B89A;
  }
  
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e0e0e0;
    text-align: center; /* Center text horizontally */
	margin-bottom: ;
  }
  
  .item:last-child {
    border-bottom: none;
  }
  
  .item-label {
    font-size: 22px;
    color: #FFF;
  }
  
  .arrow {
    width: 20px;
    height: 20px;
  }
  </style>
  