import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus';
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).use(ElementPlus,{zIndex:100000000000000}).mount('#app')
