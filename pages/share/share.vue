<template>
    <view class="page" :style="{ filter: isDarkened ? 'brightness(0.5)' : 'brightness(1)' }">
        <CustomNavbar
            title="交流分享"
            :bgSrc="bgImg"
            />
        <scroll-view scroll-y>
            <view class="content">
                <view class="content-separation"/>
                <ShareItem v-for="index in 10" :num="index" />
                <view class="content-separation footer"/>
            </view>
        </scroll-view> 
    </view>
    <TabBar :selected="3" @chooseWay="handleChooseWay"/>
</template>

<script setup>
import { onShow, onHide } from "@dcloudio/uni-app";
import CustomNavbar from '../../components/CustomNavbar.vue'
import bgImg from '../../static/image/share-bg.png'
import ShareItem from './components/ShareItem.vue'
import { getCurrentInstance, ref } from 'vue'
const isDarkened = ref(false);
const handleChooseWay = () => {
  isDarkened.value = !isDarkened.value;
}
onShow(() => {
    const curPages = getCurrentPages()[0];  // 获取当前页面实例
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
        curPages.getTabBar().setData({
            selected: 3   // 表示当前菜单的索引，该值在不同的页面表示不同
        });
    }
})
onHide(()=>{
  isDarkened.value = false
})
</script>

<style lang="scss" scoped>
.content {
    overflow: hidden;
    margin-top: 400rpx;
    background-color: #F6F8FA;
    border-radius: 60rpx;
    .content-separation{
        height: 70rpx;
        background-color: #fff;
        margin-top: -20rpx;
    }
    .footer{
        height: 120rpx;
    }
}
.page{
  transition: filter 0.3s ease;
}
</style>