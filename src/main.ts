import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'
// 加载全局样式
import './styles/index.scss'

const modules = import.meta.globEager('./components/**/index.ts')

const app = createApp(App)
for (const path in modules) {
  console.log(path)
  app.use(modules[path].default)
}
app.use(router)
  .use(store, key)
  .use(elementPlus)
  .mount('#app')
