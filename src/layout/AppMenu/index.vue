<template>
  <el-menu
    :collapse="$store.state.isCollapse"
    :unique-opened="true"
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#bcc0c5"
    active-text-color="#2d8cf0"
    router
  >
    <el-menu-item index="/">
      <el-icon><home-filled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><shopping-bag /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <el-icon><document /></el-icon>
        <template #title>
          商品列表
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        <el-icon><setting /></el-icon>
        <template #title>
          商品分类
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <el-icon><setting /></el-icon>
        <template #title>
          商品规格
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        <el-icon><setting /></el-icon>
        <template #title>
          商品评论
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><document /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        <el-icon><setting /></el-icon>
        <template #title>
          订单列表
        </template>
      </el-menu-item>
      <el-menu-item index="/order/offline">
        <el-icon><setting /></el-icon>
        <template #title>
          离线订单
        </template>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <el-icon><headset /></el-icon>
      <template #title>
        媒体
      </template>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><user /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        <el-icon><document /></el-icon>
        <template #title>
          角色管理
        </template>
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <el-icon><setting /></el-icon>
        <template #title>
          用户管理
        </template>
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <el-icon><setting /></el-icon>
        <template #title>
          菜单管理
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const defaultActive = ref('')
const userRoute = useRoute()
defaultActive.value = userRoute.path

</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
