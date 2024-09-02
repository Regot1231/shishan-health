<template>
  <view class="share-item">
    <view class="item-header">
        <view class="avatar">
            <image style="height: 80rpx;width: 80rpx;border-radius: 40rpx;" src="../../../static/image/avatar.png" mode="aspectFill" />
        </view>
        <view class="info">
              <view class="name">健康小助手</view>
              <view class="time">40分钟前发布</view>
        </view>
    </view>
    <view class="item-content">
        <text class="lable">#定期检查</text>
        <text class="text">可通过呼吸道分泌物、血液检测及CT扫描等手段，及早发现病灶。</text>
    </view>
    <view class="item-img">
        <image
            v-for="index in num"
            class="content-img"
            src="../../../static/image/tabbar.jpg"
            mode="scaleToFill"
        />
    </view>
    <view class="item-footer">
        <text class="views">2.7w次浏览量</text>
        <view class="operations">
            <image
              src="../../../static/svg/comment.svg"
              mode="scaleToFill"
              style="width: 40rpx;height: 40rpx;"
              @click="openComment"
            />
            <image
              src="../../../static/svg/like.svg"
              mode="scaleToFill"
              style="width: 40rpx;height: 40rpx;"
            />
        </view>
    </view>
    <view class="item-comments">
        <view class="comment-item">
            <text class="name">健康小助手：</text>
            <text class="text">感谢您的支持！</text>
        </view>
        <view class="comment-item">
            <text class="name">健康小助手：</text>
            <text class="text">感谢您的支持！</text>
        </view>      
    </view>
    <view class="post-comment" v-if="isCommenting">
      <input class="comment-input" placeholder="说点什么吧~" type="text" />
      <button class="comment-comfirm">发送</button>
    </view>
</view>

</template>

<script setup>
import { ref } from 'vue'
const { num } = defineProps({
    num: {
        type: Number,
        default: 1
    }
})


const isCommenting = ref(false)
const openComment = () => {
    isCommenting.value = !isCommenting.value
}

</script>

<style lang="scss" scoped>
.share-item {
    margin-bottom: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
}

.item-header{
    display: flex;
    align-items: center;
    .info{
        margin-left: 20rpx;
        .name{
            font-weight: bold;
            font-size: 32rpx;
            color: #333;
        }
        .time{
            font-size: 26rpx;
            color: #777;
        }
    }
    
}

.item-content{
    margin-top: 30rpx;
    .lable{
        color: #333;
        font-weight: bold;
        margin-right: 10rpx;
    }
    .text{
        font-size: 28rpx;
        color: #333;
    }
}

.item-img{
    margin-top: 20rpx;
    min-height: 300rpx;
}

// 统一图片样式
.content-img {
    margin-right: 15rpx;
    margin-bottom: 15rpx;
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
}

// 一张图片
.content-img:only-child{
    width: 400rpx;
    height: 400rpx;
    margin-top: 20rpx;
}


// 两张和四张图片
.content-img:first-child:nth-last-child(2),
.content-img:nth-child(2):nth-last-child(1),
.content-img:first-child:nth-last-child(4),
.content-img:nth-child(3):nth-last-child(2),
.content-img:nth-child(2):nth-last-child(3),
.content-img:nth-child(4):nth-last-child(1) {
    width: 280rpx;
    height: 280rpx;
}



.item-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 40rpx;
    margin-top: 30rpx;
    .views{
        font-size: 26rpx;
        color: #777;
    }
    image{
        margin-left: 30rpx;
    }
}

.item-comments{
    margin-top: 20rpx;
    .comment-item{
        display: flex;
        align-items: center;
        .name{
            font-weight: bold;
            font-size: 28rpx;
            color: #333;
        }
        .text{
            font-size: 26rpx;
            color: #333;
            margin-left: 10rpx;
        }
    }
}

.post-comment{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5rpx;
    .comment-input{
        margin-top: 20rpx;
        height: 60rpx;
        width: 78%;
        padding: 0rpx 30rpx;
        border-radius: 30rpx;
        font-size: 26rpx;
        background-color: #eee;
        color: #333;
    }
    .comment-comfirm{
        margin-top: 20rpx;
        height: 60rpx;
        line-height: 60rpx;
        width: 120rpx;
        border-radius: 30rpx;
        font-size: 26rpx;
        background-color: #55B89A;
        color: #fff;
    }
}

</style>