<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :rules="rules"
      ref="form"
      :model="user"
      @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        <img
          class="login-logo"
          src="@/assets/login_logo.png"
          alt="拉勾心选"
        >
      </div>
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="user.pwd"
          type="password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="user.imgcode"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-key" />
            </template>
          </el-input>
          <img
            class="imgcode"
            alt="验证码"
            :src="captchaSrc"
            @click="loadCaptcha"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          native-type="submit"
          auto-insert-space
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getCaptcha, login } from '@/api/common'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import type { IElForm, IFormRule } from '@/types/element-plus'

const router = useRouter()
const route = useRoute()
const store = useStore()
console.log(store, '999')
const user = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: ''
})

const captchaSrc = ref('')
const loading = ref(false)
const form = ref<IElForm>()
const rules = ref<IFormRule>({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
})

const handleSubmit = async () => {
  if (!form.value) return
  const valid = await form.value?.validate()

  if (!valid) return false
  loading.value = true
  const data = await login(user).finally(() => {
    loading.value = false
  })
  console.log('submit!', data)
  // 存储登录用户信息
  store.commit('setUser', {
    ...data.user_info,
    token: data.token
  })
  // 跳转回原来页面
  let redirect = route.query.redirect || '/'
  if (typeof redirect !== 'string') {
    redirect = '/'
  }
  router.replace(redirect)
  ElMessage({
    message: '登录成功',
    type: 'success'
  })
}

const loadCaptcha = async () => {
  const data = await getCaptcha()
  captchaSrc.value = URL.createObjectURL(data)
}
onMounted(() => {
  loadCaptcha()
})
</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
      cursor: pointer;
    }
  }
}
</style>
