<template>
  <el-card>
    <template
      #header
    >
      <div class="card-header">
        <slot name="header" />
      </div>
    </template>
    <slot />
  </el-card>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
.el-card+.el-card{
  margin-top: 16px;
}

.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
