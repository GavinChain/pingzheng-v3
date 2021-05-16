import {defineStore} from 'pinia';
import {reactive, ref} from 'vue';
import {store} from '../index';


// @ts-ignore
export const useFuZhuHeSuanApiStore = defineStore({
    id: 'fuzhuhesuanapiid',
    state: (): any => ({
        fuZhuHeSuanList: {},
        api: {}
    }),
    getters: {
        getThisFuZhuHeSuanList(){
            return this.fuZhuHeSuanList
        }
    },

    actions: {
        commitApi(api: any) {
            this.api = api;
        },
        getApi(type) {
            return this.api[type];
        },
         async getFuZhuHeSuanList(type) {
            const that=this
             // console.log(1);
            if (this.fuZhuHeSuanList[type] == null) {
             this.fuZhuHeSuanList[type]=[]
                //  this.api[type]().then(res=>{
                //      this.fuZhuHeSuanList[type]=res
                // });

                    that.fuZhuHeSuanList[type]=[{id:'bu1',name:'技术部1'},{id:'bu12',name:'技术部2'},{id:'bu13',name:'技术部3'}]
            }
            return this.fuZhuHeSuanList[type];
        }
    }
});

// Need to be used outside the setup
export function useFuZhuHeSuanApiWidthOut() {
    return useFuZhuHeSuanApiStore(store);
}
