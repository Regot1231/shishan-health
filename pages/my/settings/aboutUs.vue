<template>
	      <NavBar title="关于我们" :showBack="true" :showShare="false" @back="handleBack" />
    <view class="about-us-page">
      <view class="header">
        <text class="title">关于我们</text>
      </view>
  
      <view class="content">
        <view class="section-title">我们的使命:</view>
        <text class="section-content">我们致力于提供最优质的健康服务，让每个人都能拥有更健康的生活方式。</text>
        
        <view class="section-title">联系我们:</view>
        <text class="section-content">如果你有任何问题，请通过以下方式联系我们：</text>
        <text class="contact-info">邮箱: 2960031355@qq.com</text>
        <text class="contact-info">电话: 123-456-7890</text>
      </view>
    </view>
  </template>
  
  <script setup>
	  import NavBar from '../../../components/NavBar.vue';
	  const handleBack = () => {
	  	uni.navigateBack();
	  };
  </script>
  
  <style scoped>
  .about-us-page {
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
  
  .content {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .section-title {
    font-size: 18px;
    font-weight: bold;

  }
  
  .section-content {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }
  
  .contact-info {
    font-size: 18px;
    color: #55B89A;
  }
  </style>
  