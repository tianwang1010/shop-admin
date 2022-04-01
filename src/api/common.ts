/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { ILoginInfo } from './types/common'
// interface ReponseData<T = any>{
//   status: Number,
//   data: T
// }
const proxy = import.meta.env.VITE_API_PROXY
export const getLoginInfo = () => {
//   return request({
//     method: 'GET',
//     url: '/login/info'
//   })
  // return request.get<ReponseData<{}>>('/login/info')
  return request<ILoginInfo>({
    method: 'GET',
    url: proxy + '/login/info'
  })
}
