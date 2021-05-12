import type {PingZhengModel, PingZhengRowHover, RowListFuZhuHeSuanHtml} from './types/PingZhengModel';

import { defineStore } from 'pinia';
import { store } from '../index';
import {castFuZhuHeSuanHtml} from './util/fuZhuHeSuan';

interface PingZhengModelState {
  pingZhengModel: PingZhengModel;
  // Page loading status
  pingZhengRowHover: PingZhengRowHover;
  // project config
  rowListFuZhuHeSuanHtml: RowListFuZhuHeSuanHtml;
}

// @ts-ignore
export const usePingZhengModelStore = defineStore({
  id: 'pingzhengmodle',
  state: (): PingZhengModelState => ({
    pingZhengModel: {
      'options': {'title': '新增凭证'},
      'props': {
        'pingZhengFrom': '0',
        'date': '2023-05-04',
        'type': '记',
        'danJuNum': '0',
        'zdr': 1,
        'pingZhengNumOfMonth': '028'
      },
      'rows': [{
        'zhaiYao': '1',
        'kuaiJiKeMuCode': '',
        'kuaiJiKeMuFullName': '',
        'jieMoney': '0.00',
        'daiMoney': '0.00',
        'kuaiJiKeMuPath': ''
      }, {
        'zhaiYao': '2',
        'kuaiJiKeMuCode': '',
        'kuaiJiKeMuFullName': '',
        'jieMoney': '0.00',
        'daiMoney': '0.00',
        'kuaiJiKeMuPath': ''
      }, {
        'zhaiYao': '3',
        'kuaiJiKeMuCode': '',
        'kuaiJiKeMuFullName': '',
        'jieMoney': '0.00',
        'daiMoney': '0.00',
        'kuaiJiKeMuPath': ''
      }, {
        'zhaiYao': '4',
        'kuaiJiKeMuCode': '',
        'kuaiJiKeMuFullName': '',
        'jieMoney': '0.00',
        'daiMoney': '0.00',
        'kuaiJiKeMuPath': ''
      }]
    },
    pingZhengRowHover :[
      false,
      false,
      false,
      false,
    ],
    rowListFuZhuHeSuanHtml : [
      '',
      '',
      '',
      '',
    ]
  }),
  getters: {
    getPingZhengModel() {
      return this.pingZhengModel;
    },
     getRowListFuZhuHeSuanHtml() {
      return this.rowListFuZhuHeSuanHtml;
    },
     getPingZhengRowHover() {
      return this.pingZhengRowHover;
    }
  },

  actions: {
    commitPingZhengModel(pingZhengModel: any): void {
      this.pingZhengModel = pingZhengModel;
    },
    commitRowZhaiYao({rowIndex,zhaiYao}:{rowIndex:number,zhaiYao:string}): void {
      const a=JSON.parse(JSON.stringify(this.pingZhengModel))
      a.rows[rowIndex].zhaiYao=zhaiYao
      this.pingZhengModel=a
    },
    commiRowListFuZhuHeSuanHtml(rowListFuZhuHeSuanHtml:any): void {
      this.rowListFuZhuHeSuanHtml=rowListFuZhuHeSuanHtml
    },
    syncRowListHover(): void {
      console.log(555111);
      this.rowListFuZhuHeSuanHtml=this.pingZhengModel.rows.map(item=>'')
    },
    async setPageLoadingAction(loading: boolean): Promise<string> {
      return 'asadsa';
    },
    async syncRowListFuZhuHeSuanHtml() {
      const rows=this.pingZhengModel.rows
      const rowListFuZhuHeSuanHtml:any=[]
      for(let i=0;i<rows.length;i++){
        const row=rows[i]
        rowListFuZhuHeSuanHtml.push(await castFuZhuHeSuanHtml(row))
      }

      this.commiRowListFuZhuHeSuanHtml(rowListFuZhuHeSuanHtml)
    }
  },
});

// Need to be used outside the setup
export function usePingZhengModelStoreWidthOut() {
  return usePingZhengModelStore(store);
}
