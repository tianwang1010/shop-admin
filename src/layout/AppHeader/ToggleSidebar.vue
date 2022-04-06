<template>
  <el-icon @click="handleCollapse">
    <template v-if="!store.state.isCollapse">
      <fold />
    </template>
    <template v-else>
      <close-bold />
    </template>
  </el-icon>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

const store = useStore()

const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style lang="scss" scoped></style>
