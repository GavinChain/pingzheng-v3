import {defineStore} from 'pinia';
import {reactive} from 'vue';
import {watchPingZhengModel} from '../../watch/pingzheng-model-watch';
import {store} from '../index';
import {usePingZhengApiWidthOut} from './pingZhengApi';
import type {PingZhengModel, PingZhengRowHover} from './types/PingZhengModel';

const pingZhengApiStore = usePingZhengApiWidthOut();

interface PingZhengModelState {
    pingZhengModel: PingZhengModel;
    // Page loading status
    pingZhengRowHover: PingZhengRowHover;
    fuZhuHeSuanApiList: any;
    // project config
    rowListFuZhuHeSuan: any;
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
        fuZhuHeSuanApiList: {},
        pingZhengRowHover: [
            false,
            false,
            false,
            false
        ],
        rowListFuZhuHeSuan: [
            {name: '准备中..', value: '', text: ''},
            {name: '准备中..', value: '', text: ''},
            {name: '准备中..', value: '', text: ''},
            {name: '准备中..', value: '', text: ''}
        ]
    }),
    getters: {
        getPingZhengModel() {
            return this.pingZhengModel;
        },
        getRowListRequireFuZhuHeSuan() {
            let fuZheHeSuanArr = this.pingZhengModel.rows.map(item => []);
            this.pingZhengModel.rows.forEach((item, index): any => {
                const ccode = item.kuaiJiKeMuCode;
                pingZhengApiStore.getFuZhuHeSuanColumnsNameApi(ccode).then((res): any => {
                    fuZheHeSuanArr = fuZheHeSuanArr.concat(res.map(item => ({name: item, value: ''})));
                });
            });
            return fuZheHeSuanArr;
        },
        getRowListFuZhuHeSuan() {
            return this.rowListFuZhuHeSuan;
        },
        getPingZhengRowHover() {
            return this.pingZhengRowHover;
        }
    },

    actions: {

        commitPingZhengModel(pingZhengModel: any): void {
            this.pingZhengModel = pingZhengModel;
            watchPingZhengModel(this.pingZhengModel);
        },
        commitRowZhaiYao({rowIndex, zhaiYao}: { rowIndex: number, zhaiYao: string }): void {
            const a = JSON.parse(JSON.stringify(this.pingZhengModel));
            a.rows[rowIndex].zhaiYao = zhaiYao;
            this.pingZhengModel = a;
        },
        async syncRowListFuZhuHeSuan() {

            this.rowListFuZhuHeSuan = this.pingZhengModel.rows.map(row => {
                let fuZhuHeSuan = reactive([]);
                pingZhengApiStore.getFuZhuHeSuanColumnsNameApi(row.kuaiJiKeMuCode).then(res => {
                    Object.assign(fuZhuHeSuan,res)
                });
                return fuZhuHeSuan
            });

        },
        syncRowListHover(): void {
            this.pingZhengRowHover = this.pingZhengModel.rows.map(item => false);
        },
        async setPageLoadingAction(loading: boolean): Promise<string> {
            return 'asadsa';
        }
        // async syncRowListFuZhuHeSuanHtml() {
        //   const rows=this.pingZhengModel.rows
        //   const rowListFuZhuHeSuanHtml:any=[]
        //   for(let i=0;i<rows.length;i++){
        //     const row=rows[i]
        //     // rowListFuZhuHeSuanHtml.push(await castFuZhuHeSuanHtml(row))
        //   }
        //
        //   this.commiRowListFuZhuHeSuanHtml(rowListFuZhuHeSuanHtml)
        // }
    }
});
// const thisStore=usePingZhengModelStore(store)
// const model=ref(thisStore.getPingZhengModel)
// function watchRows(rows){
//   watch(rows,()=>{
//     pingZhengModelStore.syncRowListFuZhuHeSuan()
//   },{immediate:true})
// }
//
//
// watch(model,()=>watchRows(model.rows),{immediate:true})
//


// Need to be used outside the setup
export function usePingZhengModelStoreWidthOut() {
    return usePingZhengModelStore(store);
}
