import request from '../utils/request' // 引入封装好的 request 方法

// 注册用户
export const getCardRankings = data => {
  return request({
    url: '/system/user/getCardRankings', // 具体的注册 API 路径
    method: 'GET',
    data, // 注册时发送的数据
  })
}
export const getSportRankings = data => {
  return request({
    url: '/system/user/getStepsRankings', // 具体的注册 API 路径
    method: 'GET',
    data, // 注册时发送的数据
  })
}




// [
//     {
//         "userId": 123,
//         "score": 100,
//         "username": "123456"
//     },
//     {
//         "userId": 123,
//         "score": null,
//         "username": "123456"
//     }
// ]