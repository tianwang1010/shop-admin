<script setup lang='ts'>
import { PropType } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  count: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loadList: {
    type: Function as PropType<(...args: any[]) => void>,
    default: () => {}
  }
})
interface EmitsType {
    (e: 'update:page', page: number): void
    (e: 'update:limit', limit: number): void
}
const emit = defineEmits<EmitsType>()
const handleCurrentChange = (page:number) => {
  emit('update:page', page)
  props.loadList()
}
const handleSizeChange = (size:number) => {
  emit('update:limit', size)
  emit('update:page', 1)
  props.loadList()
}
</script>

<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    :disabled="props.disabled"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="count"
    :page-sizes="[5,10,15,20]"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
