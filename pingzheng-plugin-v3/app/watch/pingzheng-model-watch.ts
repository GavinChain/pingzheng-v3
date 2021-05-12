import {watch} from 'vue';
import {usePingZhengModelStoreWidthOut} from '../store/modules/pingZhengModel';



export function watchPingZhengModel(pingZhengModel) {
    watch(pingZhengModel, () => {
        watchPingZhengRowList(pingZhengModel.rows);
    }, {immediate: true});
}

function watchPingZhengRowList(rows: any) {
    const pingZhengModelStore = usePingZhengModelStoreWidthOut();

    watch(rows, () => {
        pingZhengModelStore.syncRowListHover();
        pingZhengModelStore.syncRowListFuZhuHeSuan();
        rows.forEach(row=>watchPingZhengRowKuaiJiKeMu(row.kuaiJiKeMuText))
        watchPingZhengRowKuaiJiKeMu(rows)
    }, {immediate: true});
}
function watchPingZhengRowKuaiJiKeMu(row) {
    const pingZhengModelStore = usePingZhengModelStoreWidthOut();

    watch(row, () => {
        pingZhengModelStore.syncRowListFuZhuHeSuan().then();
    }, {immediate: true});
}
