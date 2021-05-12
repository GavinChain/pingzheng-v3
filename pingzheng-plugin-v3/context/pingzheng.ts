import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {createApp} from 'vue';
import App from './App.vue';
import {setupStore, store} from './store';

export function abc(){
    const dom = () => document.body.appendChild(document.createElement('div'));
    const app=createApp(App).use(ElementPlus,{zIndex:100000000000000});
    setupStore(app)
    app.mount(dom())
}
