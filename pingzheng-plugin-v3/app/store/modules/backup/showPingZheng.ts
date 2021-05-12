// 
// /* eslint-disable */
// import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
// import {store} from '../index';
//
//
//
// const NAME = 'ShowPingZheng';
//
// @Module({dynamic: true, namespaced: true, store, name: NAME})
// class ShowPingZheng extends VuexModule {
//     private showPingZheng = false;
//     private isZuoFeiPingZheng = false;
//
//     get getShowPingZheng() {
//         return this.showPingZheng;
//     }
//     get getIsZuoFeiPingZheng() {
//         return this.isZuoFeiPingZheng;
//     }
//     @Mutation
//     commitShowPingZheng(showPingZheng: boolean): void {
//         this.showPingZheng = showPingZheng;
//     }
//
//     @Mutation
//     commitIsZuoFeiPingZheng(zuoFei: boolean): void {
//         this.showPingZheng = zuoFei;
//     }
//
// }
//
// export const showPingZhengStore = getModule<ShowPingZheng>(ShowPingZheng);
