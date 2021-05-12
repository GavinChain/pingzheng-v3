// import { ref } from 'vue';
// import {watch} from 'vue';
// import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
// import {store} from '../index';
// import {fuZhuHeSuanMuStore} from './fuZhuHeSuan';
// import {castFuZhuHeSuanHtml} from './util/fuZhuHeSuan';
// import {zhaiYaoStore} from './zhaiYao';
// const NAME = 'app';
//
// @Module({dynamic: true, namespaced: true, store, name: NAME})
// class PingZhengModel extends VuexModule {
//     // Page loading status
//     private pingZhengModel = {
//         'options': {'title': '新增凭证'},
//         'props': {
//             'pingZhengFrom': '0',
//             'date': '2023-05-04',
//             'type': '记',
//             'danJuNum': '0',
//             'zdr': 1,
//             'pingZhengNumOfMonth': '028'
//         },
//         'rows': [{
//             'zhaiYao': '1',
//             'kuaiJiKeMuCode': '',
//             'kuaiJiKeMuFullName': '',
//             'jieMoney': '0.00',
//             'daiMoney': '0.00',
//             'kuaiJiKeMuPath': ''
//         }, {
//             'zhaiYao': '2',
//             'kuaiJiKeMuCode': '',
//             'kuaiJiKeMuFullName': '',
//             'jieMoney': '0.00',
//             'daiMoney': '0.00',
//             'kuaiJiKeMuPath': ''
//         }, {
//             'zhaiYao': '3',
//             'kuaiJiKeMuCode': '',
//             'kuaiJiKeMuFullName': '',
//             'jieMoney': '0.00',
//             'daiMoney': '0.00',
//             'kuaiJiKeMuPath': ''
//         }, {
//             'zhaiYao': '4',
//             'kuaiJiKeMuCode': '',
//             'kuaiJiKeMuFullName': '',
//             'jieMoney': '0.00',
//             'daiMoney': '0.00',
//             'kuaiJiKeMuPath': ''
//         }],
//         'rowsFuZhuHeSuan': []
//     };
//     private pingZhengRowHover = [
//         false,
//         false,
//         false,
//         false,
//     ];
//     private rowListFuZhuHeSuanHtml = [
//         '',
//         '',
//         '',
//         '',
//     ];
//
//     // project config
//
//
//     get getPingZhengModel() {
//         return this.pingZhengModel;
//     }
//     get getRowListFuZhuHeSuanHtml() {
//         return this.rowListFuZhuHeSuanHtml;
//     }
//    get getPingZhengRowHover() {
//         return this.pingZhengRowHover;
//     }
//
//
//     @Mutation
//     commitPingZhengModel(pingZhengModel: any): void {
//         this.pingZhengModel = pingZhengModel;
//     }
//
//
//
//     @Mutation
//     commitRowZhaiYao({rowIndex,zhaiYao}:{rowIndex:number,zhaiYao:string}): void {
//         const a=JSON.parse(JSON.stringify(this.pingZhengModel))
//         a.rows[rowIndex].zhaiYao=zhaiYao
//         this.pingZhengModel=a
//     }
//
//     @Mutation
//     commiRowListFuZhuHeSuanHtml(rowListFuZhuHeSuanHtml:any): void {
//         this.rowListFuZhuHeSuanHtml=rowListFuZhuHeSuanHtml
//     }
//
//     @Mutation
//     syncRowListHover(): void {
//         console.log(555111);
//         this.rowListFuZhuHeSuanHtml=this.pingZhengModel.rows.map(item=>'')
//     }
//
//
//
//     @Action
//     public async setPageLoadingAction(loading: boolean): Promise<string> {
//         return 'asadsa';
//     }
//     @Action
//     public async syncRowListFuZhuHeSuanHtml() {
//         const rows=this.pingZhengModel.rows
//         const rowListFuZhuHeSuanHtml:any=[]
//         for(let i=0;i<rows.length;i++){
//             const row=rows[i]
//             rowListFuZhuHeSuanHtml.push(await castFuZhuHeSuanHtml(row))
//         }
//
//         this.commiRowListFuZhuHeSuanHtml(rowListFuZhuHeSuanHtml)
//     }
// }
//
// export const pingZhengModelStore = getModule<PingZhengModel>(PingZhengModel);
// // const rows=ref(pingZhengModelStore.getPingZhengModel.rows)
