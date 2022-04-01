<template>
  <el-menu
    :collapse="store.state.isCollapse"
    :unique-opened="true"
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#bcc0c5"
    active-text-color="#2d8cf0"
    router
  >
    <el-menu-item index="/">
      <el-icon><location /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><document /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        <template #title>
          <el-icon><document /></el-icon>
          商品列表
        </template>
      </el-menu-item>
      <el-menu-item index="/product/product_attr">
        <template #title>
          <el-icon><setting /></el-icon>
          商品规格
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
const store = useStore()
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
