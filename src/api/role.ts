import request from '@/utils/request'
import { IRoleGetData, menuItem, IRole, ISavePostData } from './types/role'

// 获取角色列表
export const getRoleList = (params:IRoleGetData) => {
  return request<{
    count:number
    list:IRole []
  }>({
    method: 'GET',
    url: '/setting/role',
    params
  })
}

// 删除角色
export const deletRole = (id:number) => {
  return request({
    method: 'DELETE',
    url: `/setting/role/${id}`
  })
}

// 获取权限
export const getMenus = () => {
  return request<{
    menus:menuItem[]
  }>({
    method: 'GET',
    url: '/setting/role/create'
  })
}

// 获取角色详情
export const getRole = (id:number) => {
  return request<{role:IRole, menus:menuItem []}>({
    method: 'GET',
    url: `/setting/role/${id}/edit`
  })
}

// 修改状态
export const updateStatus = (id:number, status:number | string) => {
  return request({
    method: 'PUT',
    url: `/setting/role/set_status/${id}/${status}`
  })
}

// 保存新建 或者 编辑
export const saveOrUpdate = (id:number, data:ISavePostData) => {
  return request({
    method: 'POST',
    url: `/setting/role/${id}`,
    data
  })
}
