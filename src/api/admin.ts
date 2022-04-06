/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { AdminFormData, AdminPostData, IAdminInfo, IListParams, NowAdminInfo, NowAdminPutData } from './types/admin'

// 获取管理员列表
export const getAdmins = (params:IListParams) => {
  return request<IAdminInfo>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}

// 创建管理员
export const createAdmin = (data:AdminPostData) => {
  return request({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}

// 修改管理员
export const updateAdmin = (id:number, data:AdminPostData) => {
  return request({
    method: 'PUT',
    url: `setting/admin/${id}`,
    data
  })
}

// 删除管理员
export const deleteAdmin = (id:number) => {
  return request({
    method: 'DELETE',
    url: `setting/admin/${id}`
  })
}

// 修改状态
export const updateAdminStatus = (id:number, status:number) => {
  return request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })
}

// 修改当前管理员信息
export const updateNowAdmin = (data:NowAdminPutData) => {
  return request({
    method: 'PUT',
    url: '/setting/update_admin',
    data
  })
}

// 获取当前登陆管理员信息
export const getNowAdmin = () => {
  return request<NowAdminInfo>({
    method: 'GET',
    url: '/setting/info'
  })
}

// 管理员添加表单
export const createAdminForm = () => {
  return request<AdminFormData>({
    method: 'GET',
    url: '/setting/admin/create'
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options
    }
    return []
  })
}

// 管理员添加表单
export const getUpdateAdminForm = (id:number) => {
  return request<AdminFormData>({
    method: 'GET',
    url: `/setting/admin/${id}/edit`
  }).then(data => {
    const obj:Record<string, any> = {}
    data.rules.forEach(item => {
      obj[item.field] = item.value
    })
    return obj as AdminPostData
  })
}
