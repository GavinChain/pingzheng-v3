import {ref, watch} from 'vue';
import {usePingZhengConfigStoreWidthOut} from '../store/modules/pingZhengConfig';
import {usePingZhengModelStoreWidthOut} from '../store/modules/pingZhengModel';


const pingZhengConfigStore=usePingZhengConfigStoreWidthOut()
// export function watchPingZhengModel(pingZhengModel) {
//     // 文本模式
//     if(pingZhengConfigStore.getIsTextModel){
//         return
//     }
//
//     watch(()=>pingZhengModel, () => {
//         watchPingZhengRowList(pingZhengModel.rows);
//     }, {immediate: true});
//
// }
//
// function watchPingZhengRowList(rows: any) {
//     // 文本模式
//     if(pingZhengConfigStore.getIsTextModel){
//         return
//     }
//     const pingZhengModelStore = usePingZhengModelStoreWidthOut();
//
//     watch(rows,async () => {
//         pingZhengModelStore.syncRowListHover();
//         // await pingZhengModelStore.syncRowListFuZhuHeSuan();
//         rows.forEach(row=>watchKuaiJiKeMuGridText(row.kuaiJiKeMuText))
//         // watchKuaiJiKeMuGridText(rows)
//     }, {immediate: true});
// }
//
// function watchKuaiJiKeMuGridText(row) {
//     // 文本模式
//     if(pingZhengConfigStore.getIsTextModel){
//         return
//     }
//     const pingZhengModelStore = usePingZhengModelStoreWidthOut();
//     //
//     //
//     // watch(ref(row.kuaiJiKeMuCode), (e) => {
//     //     debugger
//     //     pingZhengModelStore.syncRowListFuZhuHeSuan().then();
//     // });
// }
