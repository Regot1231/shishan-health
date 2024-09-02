<script setup>
import { ref } from 'vue'
import { getIndexImg } from '@/services/index'
import { getColumnsDetailAPI } from '@/services/column'
import { onLoad, onShow } from '@dcloudio/uni-app'
const getImg = async () => {
  const res = await getIndexImg()
  console.log(res.rows)
  List.value = res.rows
}
onLoad(() => {
  getImg()
})
onShow(() => {
  getImg()
})
const List = ref([])
const calculateKind = async (id) => {
  const res = await getColumnsDetailAPI(id)
  return res.data.kind
}
const gotoColumn = (id) => {
  console.log(id)
  uni.navigateTo({
    url: `/pages/column/components/article?kind=${calculateKind(id)}&id=${id}`,
  })
}
const activeIndex = ref(0)
const onChange = (e) => {
  activeIndex.value = e.detail.current
}
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="(item, index) in List" :key="index">
        <navigator @click="gotoColumn(item.specialId)" hover-class="none" class="navigator">
          <image class="image" :src="item.img"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in List.length"
        :key="index"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:host {
  display: block;
  height: 330rpx;
}
/* 轮播图 */
.carousel {
  height: 100%;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #fff;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .image {
    // 居中显示
    width: 82%;
    height: 100%;
    border-radius: 5px;
  }
}
</style>
