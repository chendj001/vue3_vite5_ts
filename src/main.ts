import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "vite-plugin-vitepress/dist/theme"
// @ts-ignore
import '@/scss/app.scss'
import App from '@/App.vue'
import router from '@/router'
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
