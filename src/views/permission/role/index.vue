<template>
  <app-card-box>
    <template #header>
      <span>角色筛选</span>
    </template>
    <el-form
      ref="form"
      :inline="true"
      :model="listParams"
      label-width="120px"
      @submit.prevent="loadList"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          v-model="listParams.role_name"
          max-length="30"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
      >
        <el-select
          v-model="listParams.status"
          placeholder="状态"
        >
          <el-option
            label="全部"
            value=""
          />
          <el-option
            label="开启"
            :value="1"
          />
          <el-option
            label="关闭"
            :value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :loading="loading"
        >
          搜索
        </el-button>
        <el-button
          :loading="loading"
          @click="resetForm(form)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </app-card-box>
  <app-card-box title="角色筛选">
    <template #header>
      <el-button
        type="primary"
        @click="handleAdd"
      >
        新建角色
      </el-button>
    </template>
    <el-table
      :data="list"
      v-loading="loading"
      style="width: 100%;"
    >
      <el-table-column
        prop="id"
        label="角色ID"
        width="120px"
      />
      <el-table-column
        prop="role_name"
        label="角色名称"
        width="180"
      />
      <el-table-column
        prop="rules"
        label="权限"
        width="180px"
        show-overflow-tooltip
      />
      <el-table-column
        prop="status"
        label="状态"
        width="120"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :loading="scope.row.statusLoading"
            @change="handleSwitchChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>

          <el-popconfirm
            title="确定删除当前方案吗?"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                type="text"
                size="small"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <AppPagination
      v-model:page="listParams.page"
      v-model:limit="listParams.limit"
      :count="count"
      :load-list="loadList"
      :disabled="loading"
    />
  </app-card-box>
  <role-form
    v-model="formVisible"
    v-model:role-id="roleId"
    @success="handleSuccess"
  />
</template>

<script setup lang='ts'>
import type { IElForm } from '@/types/element-plus'
import { onMounted, reactive, ref } from 'vue'
import { deletRole, getRoleList, updateStatus } from '@/api/role'
import { IRoleGetData, IRole } from '@/api/types/role'
import { ElMessage } from 'element-plus'
import RoleForm from './RoleForm.vue'
const form = ref<IElForm | null>(null)
const loading = ref(false)
const count = ref(0)
const list = ref<IRole[]>([])
const formVisible = ref(false)
const roleId = ref<number | null>(null)
const listParams = reactive({
  page: 1,
  limit: 10,
  status: '' as IRoleGetData['status'],
  role_name: ''
})

const loadList = async () => {
  loading.value = true
  const data = await getRoleList(listParams).finally(() => {
    loading.value = false
  })
  count.value = data.count
  data.list.forEach(item => {
    item.statusLoading = false
  })
  list.value = data.list
}

const handleSwitchChange = async (row:IRole) => {
  row.statusLoading = true
  await updateStatus(row.id, row.status).finally(() => {
    row.statusLoading = false
  })
  ElMessage({
    type: 'success',
    message: row.status === 1 ? '开启成功' : '关闭成功'
  })
}
const handleAdd = () => {
  formVisible.value = true
}
const handleEdit = (id:number) => {
  roleId.value = id
  formVisible.value = true
}
const handleSuccess = () => {
  formVisible.value = false
  loadList()
}

const handleDelete = async (id:number) => {
  await deletRole(id)
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  loadList()
}

const resetForm = (form:IElForm | null) => {
  if (!form) return
  form.resetFields()
  loadList()
}

onMounted(() => {
  loadList()
})
</script>

<style lang="scss" scoped>
.el-input{
  width: 160px;
}
</style>
