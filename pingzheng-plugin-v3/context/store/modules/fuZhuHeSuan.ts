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
        fuZhuHeSuan:{

        },
    }),

    actions: {
       // getFuZhuHeSuan(){
       //
       // }
    },
});

// Need to be used outside the setup
export function useFuZhuHeSuanStoreWidthOut() {
    return useFuZhuHeSuanStore(store);
}
