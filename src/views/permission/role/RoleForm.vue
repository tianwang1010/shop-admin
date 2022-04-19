<template>
  <app-dialog-form
    :title="props.roleId ? '修改' : '新建'"
    @close="handleCloseDialog"
    @open="handleDialogOpen"
    :confirm="handleSubmit"
  >
    <el-form
      :model="formData"
      label-width="120px"
      :rules="rules"
      ref="form"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input v-model="formData.role_name" />
      </el-form-item>
      <el-form-item
        label="是否开启"
        prop="status"
      >
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          ref="tree"
          node-key="id"
          show-checkbox
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script setup lang='ts'>
import { nextTick, ref } from 'vue'
import type { PropType } from 'vue'
import { menuItem } from '../../../api/types/role'
import { getRole, getMenus, saveOrUpdate } from '../../../api/role'
import type { IElForm, IFormRule, IElTree } from '../../../types/element-plus'
import { ElMessage } from 'element-plus'
const tree = ref<IElTree | null>(null)

const props = defineProps({
  roleId: {
    type: Number as PropType<number | null>,
    default: null
  }
})
interface EmitsType {
    (e:'update:role-id', value:number | null) : void
    (e: 'success'):void
}
const emit = defineEmits<EmitsType>()

const formData = ref({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: [] as number[]
})
const form = ref<IElForm | null>(null)
const formLoading = ref(false)
// 用户权限
const menus = ref<menuItem[]>([])
const rules:IFormRule = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}
const handleCloseDialog = () => {
  emit('update:role-id', null)
  form.value?.clearValidate()
  form.value?.resetFields()
}
const loadRole = async () => {
  if (!props.roleId) return
  const { menus: menusData, role } = await getRole(props.roleId)
  menus.value = menusData
  await nextTick() // 菜单树渲染完成后处理后面的操作
  formData.value.role_name = role.role_name
  formData.value.status = role.status
  setCheckedMenus(role.rules.split(',').map(id => Number.parseInt(id)))
}
const setCheckedMenus = (menus: number[]) => {
  menus.forEach(menuId => {
    const node = tree.value?.getNode(menuId)
    if (node && node.isLeaf) { // 判断节点是否是叶子节点
      tree.value?.setChecked(menuId, true, false)
    }
  })
}

const handleSubmit = async () => {
  const valid = await form.value?.validate()
  if (!valid) {
    return
  }
  // TODO: 添加 / 更新角色
  formData.value.checked_menus = [
    ...tree.value?.getCheckedKeys(true) as any,
    ...tree.value?.getHalfCheckedKeys() as any
  ]
  await saveOrUpdate(props.roleId || 0, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}
const loadMenus = async () => {
  const { menus: menusData } = await getMenus()
  menus.value = menusData
}

const handleDialogOpen = async () => {
  formLoading.value = true
  props.roleId
    ? await loadRole().finally(() => { formLoading.value = false })
    : await loadMenus().finally(() => { formLoading.value = false })
}

</script>

<style lang="scss" scoped>
.el-input{
  width:160px;
}
</style>
