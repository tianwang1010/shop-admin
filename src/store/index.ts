import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { IUserInfo } from '@/api/types/common'
import { setItem, getItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

// 为 store state 声明类型
const state = {
  isCollapse: false,
  user: getItem<{token:string} & IUserInfo>(USER)
}

export type State = typeof state
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      setItem(USER, state.user)
    }
  }
})
