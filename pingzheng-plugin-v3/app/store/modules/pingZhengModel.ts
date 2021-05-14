import {defineStore} from 'pinia';
import {reactive, ref, watch} from 'vue';
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
            'rows': [
                {
                    data: {
                        'zhaiYao': '1',
                        'kuaiJiKeMuCode': '',
                        'kuaiJiKeMuFullName': '',
                        'jieMoney': '0.00',
                        'daiMoney': '0.00',
                        'kuaiJiKeMuPath': ''
                    },
                    hover: false,
                    fuZhuHeSuan: []
                },
                {
                    data: {
                        'zhaiYao': '1',
                        'kuaiJiKeMuCode': '',
                        'kuaiJiKeMuFullName': '',
                        'jieMoney': '0.00',
                        'daiMoney': '0.00',
                        'kuaiJiKeMuPath': ''
                    },
                    hover: false,
                    fuZhuHeSuan: []
                },
                {
                    data: {
                        'zhaiYao': '1',
                        'kuaiJiKeMuCode': '',
                        'kuaiJiKeMuFullName': '',
                        'jieMoney': '0.00',
                        'daiMoney': '0.00',
                        'kuaiJiKeMuPath': ''
                    },
                    hover: false,
                    fuZhuHeSuan: []
                },
                {
                    data: {
                        'zhaiYao': '1',
                        'kuaiJiKeMuCode': '',
                        'kuaiJiKeMuFullName': '',
                        'jieMoney': '0.00',
                        'daiMoney': '0.00',
                        'kuaiJiKeMuPath': ''
                    },
                    hover: false,
                    fuZhuHeSuan: []
                }
            ]
        },
        fuZhuHeSuanApiList: {},
        pingZhengRowHover: [
            false,
            false,
            false,
            false
        ],
        rowListFuZhuHeSuan: [
            [],
            [],
            [],
            []
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

        createInstanceRow(requireRow) {
            const instanceRow = {
                state:reactive({
                        data: requireRow,
                        zhiYaoGridRef:{},
                        kuaiJiKemuGridRef:{},
                        fuZhuHeSuanGridRef:{},
                        jieMoneyGirdRef:{},
                        daiMoneyGirdRef:{},
                        fuZhuHeSuan: [],
                        hover: false,
                }),
                actions:{
                    commitZhaiYaoRef(ref){
                        instanceRow.state.zhiYaoGridRef=ref
                    },
                    commitKuaiJiKemuGridRef(ref){
                        instanceRow.state.kuaiJiKemuGridRef=ref
                    },
                    commitFuZhuHeSuanRef(ref){
                        instanceRow.state.fuZhuHeSuanGridRef=ref
                    },
                    commitJieMoneyGridRef(ref){
                        instanceRow.state.jieMoneyGirdRef=ref
                    },
                    commitDaiMoneyGridRef(ref){
                        instanceRow.state.daiMoneyGirdRef=ref
                    },
                    focusFuZhuHeSuan(){

                    }
                }
            };
            function kuaiJiKeMuChange(){
                alert(1)
            }

            watch(instanceRow.state.data,(newVal,oldVal)=>{
                console.log(1111);
                if(newVal.kuaiJiKeMuCode!=oldVal.kuaiJiKeMuCode){
                    kuaiJiKeMuChange()
                }
            })
            return {
                ...instanceRow.state.data,
                ...instanceRow.state,
                ...instanceRow.actions
            };
        },
        async commitPingZhengModel(pingZhengModel: any) {
            const thisStore = usePingZhengModelStoreWidthOut();
            thisStore.pingZhengModel = pingZhengModel;
            // const {watchPingZhengModel} = await import('../../watch/pingzheng-model-watch');

            // watchPingZhengModel(reactive(thisStore.pingZhengModel));
        },
        commitRowZhaiYao({rowIndex, zhaiYao}: { rowIndex: number, zhaiYao: string }): void {
            const a = JSON.parse(JSON.stringify(this.pingZhengModel));
            a.rows[rowIndex].zhaiYao = zhaiYao;
            this.pingZhengModel = a;
        },
        commitRowListFuZhuHeSuan(rowListFuZhuHeSuan) {
            this.rowListFuZhuHeSuan = rowListFuZhuHeSuan;
        },
        async syncRowListFuZhuHeSuan() {
            const rowsFuZheHeSuan: any = [
                [],
                [],
                [],
                []
            ];
            let i = 0;
            for (let row of this.pingZhengModel.rows) {
                let fuZhuHeSuan = [];
                if (row.kuaiJiKeMuCode != '') {
                    const newFuZhuHeSuan = await pingZhengApiStore.getFuZhuHeSuanColumnsNameApi(row.kuaiJiKeMuCode);
                    rowsFuZheHeSuan[i++] = newFuZhuHeSuan;
                }
            }
            this.commitRowListFuZhuHeSuan(rowsFuZheHeSuan);
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
