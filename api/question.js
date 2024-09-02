import request from '../utils/request' // 引入封装好的 request 方法

// 获取问卷的详细信息
export const getQuestionInfo = () => {
	return request({
		url: `/system/questionnaire/getQuestionnaireMessage`,
		method: 'GET'
	})
}
// 提交问卷
export const postQuestionInfo = (textAnswer, data) => {
	return request({
		url: `/system/questionnaire/submitQuestionnaire?text=${textAnswer}`,
		method: 'POST',
		header: {
			'Content-Type': 'application/json' // 指定请求体的类型为 JSON
		},
		data,
		
	})
}