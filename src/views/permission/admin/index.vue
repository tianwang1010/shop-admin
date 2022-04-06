<script setup lang='ts'>
import type { Admin, IAdminInfo, IListParams } from '@/api/types/admin'
import { getAdmins, deleteAdmin, updateAdminStatus } from '@/api/admin'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import AdminForm from './AdminForm.vue'
import type { IElForm } from '@/types/element-plus'

const handleEdit = (itemId:number) => {
  adminId.value = itemId
  formVisble.value = true
}
const handleAdd = () => {
  formVisble.value = true
}
const adminId = ref<number | null>(null)
const form = ref<IElForm | null>(null)
const list = ref<Admin[]>([])
const listParams = reactive({
  page: 1,
  limit: 10,
  name: '',
  roles: '',
  status: '' as IListParams['status']
})
const count = ref(0)
const loading = ref(true)

const formVisble = ref(false)

const loadList = async () => {
  loading.value = true
  const data:IAdminInfo = await getAdmins(listParams).finally(() => {
    loading.value = false
  })
  data.list.forEach(item => {
    item.statusLoading = false
  })
  list.value = data.list
  count.value = data.count
}
const resetForm = (formEl:IElForm | null) => {
  if (!formEl) return
  console.log(formEl)
  formEl.resetFields()
  loadList()
}
const handleDelete = async (id:number) => {
  await deleteAdmin(id)
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  loadList()
}

const handleSwitchChange = async (row:Admin) => {
  row.statusLoading = true
  await updateAdminStatus(row.id, row.status).finally(() => {
    row.statusLoading = false
  })
  ElMessage({
    type: 'success',
    message: row.status === 1 ? '开启成功' : '关闭成功'
  })
}
onMounted(() => {
  loadList()
})

const handleFormSuccess = () => {
  formVisble.value = false
  loadList()
}

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>搜索</span>
      </div>
    </template>
    <el-form
      :inline="true"
      :model="listParams"
      ref="form"
      :disabled="loading"
      @submit.prevent="loadList"
    >
      <el-form-item
        label="管理员姓名"
        prop="name"
      >
        <el-input
          v-model="listParams.name"
          placeholder="管理员姓名"
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
        >
          搜 索
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="resetForm(form)"
        >
          重 置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>管理员列表</span>
        <div class="add-button">
          <el-button
            type="primary"
            @click="handleAdd"
          >
            新增管理员
          </el-button>
        </div>
      </div>
    </template>
    <el-table
      :data="list"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        fixed
        type="index"
        width="50"
      />
      <el-table-column
        prop="account"
        label="账户"
        width="120"
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
        prop="real_name"
        label="名称"
        width="120"
      />
      <el-table-column
        prop="roles"
        label="角色"
        width="300"
      />
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
  </el-card>
  <admin-form
    @success="handleFormSuccess"
    v-model="formVisble"
    v-model:admin-id="adminId"
  />
</template>

<style lang="scss" scoped>
.el-card + .el-card{
  margin-top: 20px;
}
.add-button{
  margin-top: 20px;
}
</style>
