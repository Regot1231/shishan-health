// src/utils/http.ts

// 请求基地址
const baseURL = 'http://47.115.213.253:3233'

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2. 请求超时
    options.timeout = 10000
    // 4. 添加 token 请求头标识
    const token = uni.getStorageSync('token')
    if (token) {
      options.header = {
        ...options.header,
        Authorization: token,
      }
    }
    
  },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */

// 2.2 添加类型，支持泛型
const request = (options) => {
  // 1. 返回 Promise 对象
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data)
		  if(res.data.code === 401) {   //测试用的
			         uni.removeStorageSync('token') 
					  uni.navigateTo({ url: '/pages/login/index' }) 
		  }
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          uni.removeStorageSync('token') // 清除本地存储中的 token
          uni.navigateTo({ url: '/pages/login/index' }) // 跳转到登录页
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: ((res.data && res.data.msg) || '请求错误').slice(0, 14), // 根据需要调整长度
          })
          
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

export default request
