import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {createApp} from 'vue';
import PingZheng from './views/pingzheng.vue';
import {setupStore, store} from './store';

export function usePingZheng({model}){
    const dom = () => document.body.appendChild(document.createElement('div'));
    const app=createApp(PingZheng,{model}).use(ElementPlus,{zIndex:100000000000000});
    setupStore(app)
    app.mount(dom())
}
