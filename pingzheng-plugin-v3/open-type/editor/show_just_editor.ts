import {usePingZhengModelStoreWidthOut} from '../../app/store/modules/pingZhengModel';
import {useShowPingZhengStoreWidthOut} from '../../app/store/modules/showPingZheng';
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
const showPingZhengStore = useShowPingZhengStoreWidthOut();
export default function({model}:any) {
    // import('../context/pingzheng')
    pingZhengModelStore.commitPingZhengModel(model)
    showPingZhengStore.commitShowPingZheng(true)
    return null
}
