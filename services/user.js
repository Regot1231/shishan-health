import request from '../utils/request.js'
// 用户注册
export const postRegister = data => request({
	method: 'POST',
	url: '/register',
    data
}) 
// 用户登录接口
export const postLogin = data => request({
	method: 'POST',
	url: '/login',
    data
}) 
// 获取个人信息
export const getUserInfo = () => request({
	method: 'GET',
	url: '/user/getUserInfo'
}) 
// 更改个人信息
export const patchUserInfo = data => request({
	method: 'PATCH',
	url: '/user/update',
	data
}) 
// 修改密码
export const patchUserPassword = data => request({
	method: 'PATCH',
	url: '/user/updatePassword',
	data
}) 
// 退出登录
export const logout = () => request({
	method: 'POST',
	url: '/logout',
}) 

