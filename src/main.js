import './global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/dark/css-vars.css';
import App from './App.vue'

import 'element-plus/dist/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus);

app.mount('#app')
