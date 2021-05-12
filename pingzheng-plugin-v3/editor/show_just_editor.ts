import {usePingZhengModelStoreWidthOut} from '../context/store/modules/pingZhengModel';
import {useShowPingZhengStoreWidthOut} from '../context/store/modules/showPingZheng';
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
const showPingZhengStore = useShowPingZhengStoreWidthOut();
export default function({model}:any) {
    import('../context/pingzheng')
    pingZhengModelStore.commitPingZhengModel(model)
    showPingZhengStore.commitShowPingZheng(true)
    return null
}
