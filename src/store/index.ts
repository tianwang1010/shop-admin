import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

// 为 store state 声明类型
export interface State {
    isCollapse: any
    count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}

// 创建一个新的 store 实例
export const store = createStore<State>({
  state () {
    return {
      count: 0,
      isCollapse: false
    }
  },
  mutations: {
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    }
  }
})
