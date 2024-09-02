// src/api/user.js

import request from '../utils/request' // 引入封装好的 request 方法

// 注册用户
export const register = data => {
  return request({
    url: '/register', // 具体的注册 API 路径
    method: 'POST',
    data, // 注册时发送的数据
  })
}

// 用户登录
export const login = data => {
  return request({
    url: '/login', // 具体的登录 API 路径
    method: 'POST',
    data, // 登录时发送的数据
  })
}

// 用户登录获取用户个人信息
export const getUserInfo = () => {
  return request({
    url: '/system/user/getUserInfo', 
    method: 'GET', 
  })
}

// 用用户id查询用户的个人信息
export const getOtherUser = (userId) => {
  return request({
    url: `/system/user/front/${userId}`, 
    method: 'GET', 
  })
}

// 获取用户的评论
export const getUserComments = (userId) => {
  return request({
    url: `/system/comment/list`, 
    method: 'GET', 
	data: {
		userId
	}
  })
}

