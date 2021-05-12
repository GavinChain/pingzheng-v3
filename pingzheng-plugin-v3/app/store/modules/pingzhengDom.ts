import type {PingZhengModel, PingZhengRowHover, RowListFuZhuHeSuanHtml} from './types/PingZhengModel';

import { defineStore } from 'pinia';
import { store } from '../index';


// @ts-ignore
export const usePingzhengDomStore = defineStore({
    id: 'pingzhengdom',
    state: () :any => ({
        pingZhengEditorScrollY:[],
        bodyWidth:[]
    }),
    getters:{
         getPingZhengEditorScrollY(){
            return this.pingZhengEditorScrollY
        },

         getPingZhengBodyWidth(){
            return this.bodyWidth
        }
    },
    actions: {
        // getFuZhuHeSuan(){
        //
        // }
    },
});

// Need to be used outside the setup
export function usePingzhengDomStoreWidthOut() {
    return usePingzhengDomStore(store);
}
