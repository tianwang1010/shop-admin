<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { logOut } from '@/api/common'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const handleLogout = async () => {
  // 退出提示
  ElMessageBox.confirm(
    '确定退出吗?',
    '退出提示',
    {
      confirmButtonText: '退出',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async () => {
      await logOut()
      store.commit('setUser', null)
      ElMessage({
        message: '退出成功',
        type: 'success'
      })
      // 确认发出推出请求
      // 跳转到登录页
      router.push({
        name: 'login'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出'
      })
    })
}
</script>

<style lang="scss" scoped></style>
