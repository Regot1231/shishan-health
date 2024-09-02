import request from '../utils/request' // 引入封装好的 request 方法

// 提交打卡
export const postCard = data => {
	return request({
		url: `/system/card/addCard`,
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		},
       data
	})
}
// 获取用户打卡记录
export const getCardList = userId => {
  return request({
    url: '/system/card/list', 
    method: 'GET', 
	data: {
	    userId
	  },
  })
}