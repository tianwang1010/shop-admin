export interface IRole {
    id:number
    role_name:string
    rules:string
    level:number
    status:0 | 1 | '',
    statusLoading?:boolean
}

export interface IRoleGetData {
    page:number
    limit:number
    status:0 | 1 | ''
    role_name:string
}
export interface menuItem {
    pid:number
    id:number
    title:string
    childre:menuItem []
    expand:boolean
}

export interface ISavePostData {
    role_name:string
    status:0 | 1
    checked_menus:number[]
}
