import request from '../utils/request' // 引入封装好的 request 方法
// 获取热门推荐信息	
export const getHotInfo = () => {
	return request({
		url: '/system/article/frontList',
		method: 'GET',
	})
}
// 获取文章详细信息	
export const getArticleDetail = articleId => {
	return request({
		url: `/system/article/${articleId}`,
		method: 'GET',
	})
}

// 获取按点赞量排序的评论
export const getCommentLikeLists = articleId => {
	return request({
		url: `/system/comment/listByLike`,
		method: 'GET',
		data: {
			articleId // 传递的 params 参数
		},
	})
}
// 获取按最新排序的评论
export const getCommentNewLists = articleId => {
	return request({
		url: `/system/comment/listByTime`,
		method: 'GET',
		data: {
			articleId // 传递的 params 参数
		},
	})
}
// 点赞
export const postLike = data => {
	return request({
		url: `/system/article/addLike`,
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		},
		data
	})
}
// 浏览
export const postView = data => {
	return request({
		url: `/system/article/addView`,
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		},
       data
	})
}
// 新增评论
export const postComment = data => {
	return request({
		url: `/system/comment/addComment`,
		method: 'POST',
		header: {
			'content-type': 'application/json' //自定义请求头信息
		},
       data
	})
}
// 获取科普List
export const getScienceList = () => {
	return request({
		url: `/system/article/scienceList`,
		method: 'GET',
		header: {
			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		},
       data: {
		   status: 0
	   }
	})
}
// 获取分享交流List
export const getShareList = () => {
	return request({
		url: `/system/article/scienceList`,
		method: 'GET',
		header: {
			'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
		},
       data: {
		   status: 1
	   }
	})
}