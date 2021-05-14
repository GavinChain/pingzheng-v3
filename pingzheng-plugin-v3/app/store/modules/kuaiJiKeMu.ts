import type {PingZhengModel, PingZhengRowHover, RowListFuZhuHeSuanHtml} from './types/PingZhengModel';

import { defineStore } from 'pinia';
import { store } from '../index';
import {castFuZhuHeSuanHtml} from './util/fuZhuHeSuan';

interface KuaiJiKeMuState {
    kuaiJiKeMuList?: [...any];
}

// @ts-ignore
export const useKuaiJiKeMuStore = defineStore({
    id: 'kuaijikemu',
    state: (): KuaiJiKeMuState => ({
        kuaiJiKeMuList:[]
    }),
    getters: {
        getKuaiJiKeMuList(){
            return this.kuaiJiKeMuList
        }
    },

    actions: {
        commitKuaiJiKeMuList(kuaiJiKeMuList: any): void {
            this.kuaiJiKeMuList = kuaiJiKeMuList;
        },
        openAddKuaiJiKeMu(rowIndex){

        }
    },
});

// Need to be used outside the setup
export function useKuaiJiKeMuStoreWidthOut() {
    return useKuaiJiKeMuStore(store);
}
