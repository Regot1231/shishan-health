import { http } from '@/utils/http'

export const getIndexImg = () => {
  return http<any>({
    method: 'GET',
    url: '/system/notice/list?status=0',
  })
}
