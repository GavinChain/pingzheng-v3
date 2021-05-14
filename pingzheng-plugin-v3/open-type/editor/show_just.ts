import {usePingZheng} from '../../app';
import {usePingZhengButtonWidthOut} from '../../app/store/modules/pingZhengButton';
import bottomRihtInstance from './show-just-button'
import {usePingZhengConfigStoreWidthOut} from '../../app/store/modules/pingZhengConfig';
import {usePingZhengModelStoreWidthOut} from '../../app/store/modules/pingZhengModel';
import {useShowPingZhengStoreWidthOut} from '../../app/store/modules/showPingZheng';
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
const showPingZhengStore = useShowPingZhengStoreWidthOut();
const pingZhengConfigStore=usePingZhengConfigStoreWidthOut()
const pingZhengButtonStore = usePingZhengButtonWidthOut();
export default function({model}:any) {
    pingZhengModelStore.commitPingZhengModel(model)
    pingZhengModelStore.commitRowListFuZhuHeSuan(model.rows.map(item=>[]))
    showPingZhengStore.commitShowPingZheng(true)
    pingZhengConfigStore.commitIsTextModel(true)
    pingZhengButtonStore.commitBottomRihtInstance(bottomRihtInstance)
    usePingZheng({model});
    return null
}
