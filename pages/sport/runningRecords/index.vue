<template>
	<NavBar title="跑步记录" :showBack="true" :showShare="true" @back="handleBack" />
	<wd-table :data="runningRecords" >
		<wd-table-col prop="date" label="日期" fixed></wd-table-col>
		<wd-table-col prop="time" label="运动时长"></wd-table-col>
		<wd-table-col prop="distance" label="运动距离"></wd-table-col>
		<wd-table-col prop="points" label="得分"></wd-table-col>
		<wd-table-col prop="scheme" label="方案"></wd-table-col>
		<wd-table-col prop="totalPoints" label="总得分"></wd-table-col>
	</wd-table>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavBar from "@/components/NavBar.vue";

// 创建响应式数据
const runningRecords = ref([]);

onMounted(() => {

	runningRecords.value = uni.getStorageSync("runningRecords")

});

const handleBack = () => {
	uni.navigateBack();
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>
