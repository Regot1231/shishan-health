<script setup>

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  showShare: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["back", "share"]);

const handleBack = () => {
  emits("back");
};

const handleShare = () => {
  emits("share");
};
</script>

<template>
  <view class="nav-bar">
    <view class="nav-bar-left" v-if="showBack" @click="handleBack">
      <image src="/static/image/Left-back.png" class="nav-icon" />
    </view>
    <view class="nav-bar-title">
      <text>{{ title }}</text>
    </view>
    <view class="nav-bar-right" v-if="showShare" @click="handleShare">
      <image src="../static/image/Vector.png" class="nav-icon" />
    </view>
  </view>
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(env(safe-area-inset-top) + 70px) 15px 10px 15px;
  background-color: #55b89a; /* 调整为你的应用主题色 */
}

.nav-bar-left,
.nav-bar-right {
  flex: 0 0 auto;
}

.nav-bar-title {
  flex: 1 1 auto;
  text-align: center;
  font-size: 18px;
  color: white;
}

.nav-icon {
  width: 24px;
  height: 24px;
}
</style>
