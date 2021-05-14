import {defineComponent} from 'vue';
import {useLayoutStoreWidthOut} from '../../app/store/modules/layout';
import {usePingZhengApiWidthOut} from '../../app/store/modules/pingZhengApi';
import {usePingZhengModelStoreWidthOut} from '../../app/store/modules/pingZhengModel';
const pingZhengApiStore=usePingZhengApiWidthOut()
const pingZhengModelStore=usePingZhengModelStoreWidthOut()
export default defineComponent(() => {
    function okEvent() {
        const pingZhengModel=pingZhengModelStore.getPingZhengModel
        pingZhengApiStore.okApi({pingZhengModel})
    }

    function continueEvent() {
        const pingZhengModel=pingZhengModelStore.getPingZhengModel
        pingZhengApiStore.okApiAndContinue({pingZhengModel})
        // pingZhengApi.backApi(pingZhengModelStore.getPingZhengModel)
    }

    function backEvent() {
        const pingZhengModel=pingZhengModelStore.getPingZhengModel
        const layoutStore=useLayoutStoreWidthOut()
        pingZhengApiStore.backApi({pingZhengModel})
        layoutStore.layoutCloseEvent()
        // pingZhengApi.cancelApi()
    }

    // pingZhengApi.okApi(pingZhengModelStore.getPingZhengModel)
    return ()=> (
        <>
            <div onClick={backEvent}>放弃</div>
        </>
    );
});
