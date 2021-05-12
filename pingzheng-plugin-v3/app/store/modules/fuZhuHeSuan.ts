import type {PingZhengModel, PingZhengRowHover, RowListFuZhuHeSuanHtml} from './types/PingZhengModel';

import { defineStore } from 'pinia';
import { store } from '../index';
import {castFuZhuHeSuanHtml} from './util/fuZhuHeSuan';

interface FuZhuHeSuanState {
    fuZhuHeSuan?: any;
}

// @ts-ignore
export const useFuZhuHeSuanStore = defineStore({
    id: 'fuZhuHesuan',
    state: () :any => ({
        fuZhuHeSuanApi:{
                test:()=>{return []}
        },
    }),

    actions: {
        getThisList(type:string){
            return this.fuZhuHeSuan[type]
        }
       // getFuZhuHeSuan(){
       //
       // }
    },
});

// Need to be used outside the setup
export function useFuZhuHeSuanStoreWidthOut() {
    return useFuZhuHeSuanStore(store);
}
