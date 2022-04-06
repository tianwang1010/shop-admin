export interface ILoginInfo {
    logo_square: string
    logo_rectangle: string
    login_logo: string
    slide: string[]
}
interface IMenuItem {
    title:string
}
export interface IUserInfo{
    id: number,
    account: string,
    head_pic: string
}
export interface ILoginResult {
    expires_time: number
    logo: string
    logo_square: string
    menus:IMenuItem[]
    newOrderAudioLink: string
    token: string
    unique_auth: string[]
    user_info: IUserInfo
    version: string
}

export interface ILogoutResult {
    status:number,
    msg:string
}
