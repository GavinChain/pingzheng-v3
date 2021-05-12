import {usePingZheng} from '../../app';
import {useFuZhuHeSuanApiWidthOut} from '../../app/store/modules/fuZhuHeSuanApi';
import {useKuaiJiKeMuStoreWidthOut} from '../../app/store/modules/kuaiJiKeMu';
import {usePingZhengApiWidthOut} from '../../app/store/modules/pingZhengApi';
import {usePingZhengModelStoreWidthOut} from '../../app/store/modules/pingZhengModel';
import {useZhaiYaoStoreWidthOut} from '../../app/store/modules/zhaiYao';


const kuaiJiKeMuStore = useKuaiJiKeMuStoreWidthOut();
const pingZhengApiStore = usePingZhengApiWidthOut();
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
const zhaiYaoStore = useZhaiYaoStoreWidthOut();
const fuZhuHeSuanApiStore = useFuZhuHeSuanApiWidthOut();


export default async function({getFuZhuHeSuanColumnsNameApi,fuZhuHeSuanApiList,zhiDanRen, zhaiyaoApi, kuaiJiKeMuApi, okApi, backApi, model}:any) {
    pingZhengApiStore.api.zhaiyaoApi = zhaiyaoApi;
    pingZhengApiStore.api.kuaiJiKeMuApi = kuaiJiKeMuApi;
    pingZhengApiStore.api.okApi = okApi;
    pingZhengApiStore.api.backApi = backApi;
    pingZhengApiStore.api.getFuZhuHeSuanColumnsNameApi = getFuZhuHeSuanColumnsNameApi;
    fuZhuHeSuanApiStore.commitApi(fuZhuHeSuanApiList)

    pingZhengModelStore.commitPingZhengModel(model);
    kuaiJiKeMuStore.commitKuaiJiKeMuList(await kuaiJiKeMuApi());
    zhaiYaoStore.commitZhaiYaoList(await zhaiyaoApi());

    usePingZheng({model});
    return null;
}
