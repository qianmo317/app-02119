import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { lazyLoad } from './directives/lazyLoad'
import './styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册自定义指令
app.directive('lazy', lazyLoad)

app.mount('#app')
