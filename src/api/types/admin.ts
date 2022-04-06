export interface Admin {
    id:number,
    account:string,
    head_pic:string,
    pwd:string,
    real_name:string,
    roles:string,
    last_ip:string,
    last_time:number,
    add_time:number,
    login_count:number,
    level:number,
    status:number,
    is_del:number,
    _add_time:string,
    _last_time:string,
    statusLoading?:boolean
}
export interface IAdminInfo {
     list:Admin [],
     count:number
}

export interface IListParams {
    page:number,
    limit:number,
    name:string
    roles:string,
    status:0 | 1 | ''
}

export interface AdminPostData{
    account:string
    pwd:string
    conf_pwd:string
    roles:number []
    status:0 | 1
    real_name:string
}

export interface NowAdminPutData {
    real_name:string
    head_pic:string
    pwd:string
    new_pwd:string
    conf_pwd:string
}

export interface NowAdminInfo {
    id:number
    account:string
    head_pic:string
    real_name:string
    roles:string []
    last_ip:string
    last_time:number
    add_time:number
    login_count:number
    level:number
}
export interface ruleOption{
    label:string,
    value:number
}
interface RuleItem {
    field:string
    value:Array<any> | number
    title:string
    props:object
    type:string
    placeholder:string
    multiple:boolean,
    options?:Array<ruleOption>
}
interface VadlideItem {
    message:string
    required:boolean
    type:string
    trigger:string
}
interface OptionItem {
    label:string
    value:number
    title:string
    action:string
    method:string
    info:string
    status:boolean
}
export interface AdminFormData {
    rules: RuleItem[]
    validate:VadlideItem [],
    options:OptionItem[]
}
