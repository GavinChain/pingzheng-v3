import {openAddPingZheng, openInsertPingZheng, openShowPingZheng} from '@/view/pingzheng/pingzheng';
import {ref} from 'vue';

export function insertByModel(logs) {
    const result=ref(null)
    return {
        open: () => {
            openShowPingZheng({
                backApi({pingZhengModel}) {

                }
            })
        },
        params: ['凭证模型'],
        result,
        name: '查看凭证(凭证模型)'
    };
}

export function insertByNum(logs) {
    const result=ref('')
    return {
        open: () => {
            openInsertPingZheng({
                okApi({pinZhengModel}){

                },
                backApi({pingZhengModel}) {
                    result.value=JSON.stringify(pingZhengModel, null, 2)
                    logs.value.push(result.value)
                    return [];
                    alert(1);
                }
            })
        },
        params: [''],
        result,
        name: '插入凭证(凭证编码)'
    };
}
