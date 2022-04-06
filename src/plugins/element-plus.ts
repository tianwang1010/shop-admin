import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { App } from 'vue'
import * as icons from '@element-plus/icons'

export default {
  install (app:App) {
    // element-plus 图标
    let k: keyof typeof icons
    for (k in icons) {
      app.component(k, icons[k])
    }
    app.use(ElementPlus, { size: 'default', zIndex: 2000 })
  }
}
