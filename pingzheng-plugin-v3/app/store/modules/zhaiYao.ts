import type {PingZhengModel, PingZhengRowHover, RowListFuZhuHeSuanHtml} from './types/PingZhengModel';

import { defineStore } from 'pinia';
import { store } from '../index';
import {castFuZhuHeSuanHtml} from './util/fuZhuHeSuan';

// @ts-ignore
export const useZhaiYaoStore = defineStore({
    id: 'app',
    state: () :any => ({
        zhaiYaoList:[]

    }),
    getters:{
        getZhaiYaoList(){
            return this.zhaiYaoList
        }
    },
    actions: {
        commitZhaiYaoList(zhaiYaoList: any): void {
            this.zhaiYaoList = zhaiYaoList;
        }
        // getFuZhuHeSuan(){
        //
        // }
    },
});

// Need to be used outside the setup
export function useZhaiYaoStoreWidthOut() {
    return useZhaiYaoStore(store);
}
