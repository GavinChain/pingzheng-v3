import type {PingZhengModel, PingZhengRowHover, RowListFuZhuHeSuanHtml} from './types/PingZhengModel';

import { defineStore } from 'pinia';
import { store } from '../index';
import {castFuZhuHeSuanHtml} from './util/fuZhuHeSuan';

// @ts-ignore
export const useShowPingZhengStore = defineStore({
    id: 'showpingzheng',
    state: () :any => ({
        showPingZheng: false,
        isZuoFeiPingZheng : false
    }),
getters:{
     getShowPingZheng() {
        return this.showPingZheng;
    },
     getIsZuoFeiPingZheng() {
        return this.isZuoFeiPingZheng;
    }
},
    actions: {
        commitShowPingZheng(showPingZheng: boolean): void {
            this.showPingZheng = showPingZheng;
        },
        commitIsZuoFeiPingZheng(zuoFei: boolean): void {
            this.showPingZheng = zuoFei;
        }
       // getFuZhuHeSuan(){
       //
       // }
    },
});

// Need to be used outside the setup
export function useShowPingZhengStoreWidthOut() {
    return useShowPingZhengStore(store);
}
