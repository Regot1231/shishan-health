import { http } from '@/utils/http'

export const getPersonalInf = () => {
  return http<any>({
    method: 'GET',
    url: '/user',
  })
}

export const changePersonalInf = (data: any) => {
  return http<any>({
    method: 'PUT',
    url: '/user',
    data,
  })
}

// 修改密码
export const changePassword = (data: any) => {
  return http<any>({
    method: 'PUT',
    url: '/user/resetPwd',
    data,
  })
}
