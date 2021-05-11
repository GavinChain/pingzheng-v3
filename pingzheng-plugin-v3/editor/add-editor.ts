import {kuaiJiKeMuStore} from '../context/store/modules/kuaiJiKeMu';
import {pingZhengApiStore} from '../context/store/modules/pingZhengApi';
import {pingZhengModelStore} from '../context/store/modules/pingZhengModel';
import {showPingZhengStore} from '../context/store/modules/showPingZheng';
import {zhaiYaoStore} from '../context/store/modules/zhaiYao';


import {abc} from '../context/pingzheng'
export default async function({zhiDanRen,zhaiyaoApi,kuaiJiKeMuApi,okApi,backApi,model}:any) {
    pingZhengApiStore.zhaiyaoApi=zhaiyaoApi
    pingZhengApiStore.kuaiJiKeMuApi=kuaiJiKeMuApi
    pingZhengApiStore.okApi=okApi
    pingZhengApiStore.backApi=backApi

    pingZhengModelStore.commitPingZhengModel(model)
    kuaiJiKeMuStore.commitKuaiJiKeMuList(await kuaiJiKeMuApi())
    zhaiYaoStore.commitZhaiYaoList(await zhaiyaoApi())

    abc()
    return null
}
