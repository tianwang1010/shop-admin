<script setup lang='ts'>
import { ref } from 'vue'
import { IElDialog } from '@/types/element-plus'
import type { PropType } from 'vue'

const formDialog = ref<IElDialog | null>(null)
const confirmLoading = ref(false)
const handleClose = () => {
  if (formDialog.value) {
    formDialog.value.visible = false
  }
}
const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})
const handelConfirm = async () => {
  confirmLoading.value = true
  await props.confirm()
  confirmLoading.value = false
}
</script>

<template>
  <el-dialog
    ref="formDialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          :loading="confirmLoading"
          @click="handelConfirm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
