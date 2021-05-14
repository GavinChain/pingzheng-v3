import {defineComponent} from 'vue';
import {usePingZheng} from '../../app';
import {useFuZhuHeSuanApiWidthOut} from '../../app/store/modules/fuZhuHeSuanApi';
import {useKuaiJiKeMuStoreWidthOut} from '../../app/store/modules/kuaiJiKeMu';
import {usePingZhengApiWidthOut} from '../../app/store/modules/pingZhengApi';
import {usePingZhengButtonWidthOut} from '../../app/store/modules/pingZhengButton';
import {usePingZhengModelStoreWidthOut} from '../../app/store/modules/pingZhengModel';
import {useZhaiYaoStoreWidthOut} from '../../app/store/modules/zhaiYao';
import {createBottomRihtInstance} from './add-button'

const kuaiJiKeMuStore = useKuaiJiKeMuStoreWidthOut();
const pingZhengApiStore = usePingZhengApiWidthOut();
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
const zhaiYaoStore = useZhaiYaoStoreWidthOut();
const fuZhuHeSuanApiStore = useFuZhuHeSuanApiWidthOut();
const pingZhengButtonStore = usePingZhengButtonWidthOut();


export default async function({btnShowList,getFuZhuHeSuanColumnsNameApi,fuZhuHeSuanApiList, zhaiyaoApi, kuaiJiKeMuApi, okApi, backApi, requstModel}:any) {
    const {createInstanceRow}=pingZhengModelStore
    const model={
        ...requstModel,
        rows:requstModel.rows.map(createInstanceRow)
    }

    async function reload(){
        pingZhengApiStore.api.zhaiyaoApi = zhaiyaoApi;
        pingZhengApiStore.api.kuaiJiKeMuApi = kuaiJiKeMuApi;
        pingZhengApiStore.api.getFuZhuHeSuanColumnsNameApi = getFuZhuHeSuanColumnsNameApi;
        fuZhuHeSuanApiStore.commitApi(fuZhuHeSuanApiList)


        pingZhengButtonStore.commitBottomRihtInstance(createBottomRihtInstance({btnShowList}))
        await pingZhengModelStore.commitPingZhengModel(model);
        kuaiJiKeMuStore.commitKuaiJiKeMuList(await kuaiJiKeMuApi());
        zhaiYaoStore.commitZhaiYaoList(await zhaiyaoApi());

    }

    await reload()

    usePingZheng({model});
    return null;
}
