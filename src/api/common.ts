/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { ILoginInfo, ILoginResult, ILogoutResult } from './types/common'

interface LoginData {
  account:string,
  pwd:string
  imgcode:string
}
// 登录
export const login = (data:LoginData) => {
  return request<ILoginResult>({
    method: 'POST',
    url: '/login',
    data
  })
}

// 获取登录信息
export const getLoginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob'
  })
}

export const logOut = () => {
  return request<ILogoutResult>({
    method: 'GET',
    url: '/setting/admin/logout'
  })
}
