<template>
	<view>
		<NavBar title="问卷调查" :showBack="true" :showShare="false" @back="handleBack" />
		<view class="survey-page">
			<view class="survey-questions">
				<view v-for="(question, index) in questions" :key="index" class="question">
					<text class="question-title">{{ question.content }}</text>
					<view class="question-options">
						<template v-if="question.status === 0">
							<radio-group @change="onSingleChange(question.questionId, $event)">
								<label v-for="(option, idx) in question.answerList" :key="idx" class="radio-option">
									<radio :value="option">{{ option.content }}</radio>
								</label>
							</radio-group>
						</template>
						<template v-if="question.status === 1">
							<checkbox-group @change="onMultipleChange(question.questionId, $event)">
								<label v-for="(option, idx) in question.answerList" :key="idx" class="checkbox-option">
									<checkbox :value="option">{{ option.content }}</checkbox>
								</label>
							</checkbox-group>
						</template>
						<template v-if="question.status === 2">
							<wd-textarea class="wd-textarea" clear-trigger="focus"
								v-model="answers[question.questionId]" :maxlength="200" clearable show-word-limit />
						</template>
					</view>
				</view>
			</view>
			<button @click="handleSubmit" class="submit-button">提交</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import NavBar from '@/components/NavBar.vue';
	import {
		getQuestionInfo,
		postQuestionInfo
	} from '../../api/question';

	const handleBack = () => {
		uni.navigateBack();
	};

	const questions = ref([]);
	const answers = ref({});
	const textAnswer = ref("")

	onMounted(async () => {
		try {
			const res = await getQuestionInfo();
			// 检查 API 返回的数据结构
			console.log('API response:', res);
			questions.value = res.data[0].questionList;
		} catch (error) {
			console.error('Error fetching question info:', error);
		}
	});


	const onSingleChange = (questionId, event) => {
		const selectedOption = event.detail.value;
		console.debug('单选题选项:', selectedOption); // 调试信息
		answers.value[questionId] = {
			answerIds: [selectedOption.answerId],
			content: selectedOption.content
		};
		console.debug('更新后的单选题答案:', answers.value); // 调试信息
	};

	const onMultipleChange = (questionId, event) => {
		const selectedOptions = event.detail.value;
		console.debug('多选题选项:', selectedOptions); // 调试信息
		answers.value[questionId] = {
			answerIds: selectedOptions.map(option => option.answerId),
			content: selectedOptions.map(option => option.content).join(',')
		};
		console.debug('更新后的多选题答案:', answers.value); // 调试信息
	};

	const handleSubmit = async () => {
		// 调试输出 questions.value
		console.log('questions.value:', questions.value);

		// 确保 questions.value 是一个数组
		if (!Array.isArray(questions.value)) {
			console.error('questions.value is not an array');
			return;
		}

		const submitData = questions.value.map(question => {
			textAnswer.value = answers.value[question.questionId]; //简答题的答案
			// 调试输出 answer 和 answer.answerIds
			console.log('answer:', textAnswer.value);
			console.log('answer.answerIds:', textAnswer.value ? textAnswer.value.answerIds : 'No answer');
			return {
				createBy: null,
				createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
				updateBy: null,
				updateTime: null,
				remark: null,
				questionId: question.questionId,
				questionnaireId: question.questionnaireId,
				content: question.content,
				isDeleted: 0,
				order: question.order,
				answerList: textAnswer.value && Array.isArray(textAnswer.value.answerIds) ? textAnswer.value.answerIds.map(answerId => {
					const answerContent = question.answerList.find(a => a.answerId === answerId);
					// 调试输出 answerContent
					console.log('answerContent:', answerContent);
					return {
						createBy: null,
						createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
						updateBy: null,
						updateTime: null,
						remark: null,
						answerId,
						content: answerContent ? answerContent.content : '',
						questionId: question.questionId,
						isDeleted: 0
					};
				}) : [],

				status: textAnswer.value ? 0 : 2
			};
		});

		const finalSubmitData = {
			createBy: null,
			createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
			updateBy: null,
			updateTime: null,
			remark: null,
			questionnaireId: 1,
			content: "睡眠调查",
			isDeleted: 0,
			questionList: submitData
		};

		console.log('提交的数据:', finalSubmitData);
		// 在这里执行提交操作，比如发送给后端API
		const res = await postQuestionInfo(textAnswer.value, finalSubmitData)
		if (res.code === 200) {
			uni.showToast({
				title: '提交成功',
				icon: 'success',
			});
		} else {
			uni.showToast({
				title: '提交失败',
				icon: 'none',
			});
		}
	};
</script>

<style scoped>
	.survey-page {
		padding: 20rpx;
		background-color: #f7f7f7;
	}

	.survey-questions {
		margin-bottom: 30rpx;
	}

	.survey-questions .wd-textarea {
		border: 1px solid #F6F8FA;
		border-radius: 20rpx;
	}

	.question {
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}

	.question-title {
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 15rpx;
	}

	.radio-option,
	.checkbox-option {
		display: block;
		margin-bottom: 10rpx;
	}

	.submit-button {
		background-color: #55B89A;
		color: #ffffff;
		border-radius: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		width: 100%;
	}
</style>