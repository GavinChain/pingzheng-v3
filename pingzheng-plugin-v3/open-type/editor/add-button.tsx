import {defineComponent} from 'vue';
import {useLayoutStoreWidthOut} from '../../app/store/modules/layout';
import {usePingZhengApiWidthOut} from '../../app/store/modules/pingZhengApi';
import {usePingZhengModelStoreWidthOut} from '../../app/store/modules/pingZhengModel';

const pingZhengApiStore = usePingZhengApiWidthOut();
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
function filterBtnList(btnList,btnShowList){
    return btnList.filter((btn) => {
        const {key} = btn;
        const btnShow = btnShowList.filter(btnShow => {
            if ('string' == typeof btnShow) {
                if (btnShow == key) {
                    return true;
                }
            } else if (btnShow instanceof Array) {
                if (btnShow[0] == key) {
                    btn.name = btnShow[1];
                    return true;
                }
            }
            return false;
        });
        if (0 < btnShow.length) {
            return true;
        }
        return false;

    })
}
export function createBottomRihtInstance(params: any) {
    const btnShowList = params.btnShowList == null ? [] : params.btnShowList;



    return defineComponent(() => {
        function okEvent() {
            const pingZhengModel = pingZhengModelStore.getPingZhengModel;
            pingZhengApiStore.okApi({pingZhengModel});
        }

        function continueEvent() {
            const pingZhengModel = pingZhengModelStore.getPingZhengModel;
            pingZhengApiStore.okApiAndContinue({pingZhengModel});
            // pingZhengApi.backApi(pingZhengModelStore.getPingZhengModel)
        }

        function backEvent() {
            const pingZhengModel = pingZhengModelStore.getPingZhengModel;
            const layoutStore = useLayoutStoreWidthOut();
            pingZhengApiStore.backApi({pingZhengModel});
            layoutStore.layoutCloseEvent();
            // pingZhengApi.cancelApi()
        }

        btnShowList.forEach(item=>{
            if(item[0]=='ok'){
                pingZhengApiStore.api.okApi=item[2]
            }else if(item[0]=='okAndContinue'){
                pingZhengApiStore.api.okAndContinueApi=item[2]
            }else if(item[0]=='back'){
                pingZhengApiStore.api.backApi=item[2]
            }
        })

        let btnList = [
            {key: 'ok', name: '保存', useEvent: okEvent},
            {key: 'okAndContinue', name: '保存并新增', useEvent: continueEvent},
            {key: 'back', name: '放弃', useEvent: backEvent}
        ];


        // pingZhengApi.okApi(pingZhengModelStore.getPingZhengModel)
        return () => <>
            {filterBtnList(btnList,btnShowList).map(item => <button class="dy_button" onClick={item.useEvent}>{item.name}</button>)}
        </>;
    });
}
