import {abc} from '../context/pingzheng';
import {useKuaiJiKeMuStoreWidthOut} from '../context/store/modules/kuaiJiKeMu';
import {usePingZhengApiWidthOut} from '../context/store/modules/pingZhengApi';
import {usePingZhengModelStoreWidthOut} from '../context/store/modules/pingZhengModel';
import {useShowPingZhengStoreWidthOut} from '../context/store/modules/showPingZheng';
import {useZhaiYaoStoreWidthOut} from '../context/store/modules/zhaiYao';


const kuaiJiKeMuStore = useKuaiJiKeMuStoreWidthOut();
const pingZhengApiStore = usePingZhengApiWidthOut();
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
const zhaiYaoStore = useZhaiYaoStoreWidthOut();

export default async function({zhiDanRen, zhaiyaoApi, kuaiJiKeMuApi, okApi, backApi, model}: any) {
    pingZhengApiStore.zhaiyaoApi = zhaiyaoApi;
    pingZhengApiStore.kuaiJiKeMuApi = kuaiJiKeMuApi;
    pingZhengApiStore.okApi = okApi;
    pingZhengApiStore.backApi = backApi;

    pingZhengModelStore.commitPingZhengModel(model);
    kuaiJiKeMuStore.commitKuaiJiKeMuList(await kuaiJiKeMuApi());
    zhaiYaoStore.commitZhaiYaoList(await zhaiyaoApi());

    abc();
    return null;
}
