import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {createApp} from 'vue';
import {useLayoutStoreWidthOut} from './store/modules/layout';
import App from './app.vue';

import {setupStore, store} from './store';

    const layoutStore =useLayoutStoreWidthOut()
export function usePingZheng({model}){
    const dom = () => document.body.appendChild(document.createElement('div'));
    const app=createApp(App,{model}).use(ElementPlus,{zIndex:100000000000000});
    setupStore(app)
    app.mount(dom())
    layoutStore.commitInstanceCloseEvent(()=>{
        app.unmount()
    })
    // setTimeout(()=>{closePingZheng({app})},2000)
}
