import { ElDialog, ElForm, FormItemRule } from 'element-plus'

export type IElForm = InstanceType<typeof ElForm>

export type IFormRule = Record<string, FormItemRule[]>

export type IElDialog = InstanceType<typeof ElDialog>
