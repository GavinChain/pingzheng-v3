import {openAddPingZheng, openShowPingZheng} from '@/view/pingzheng/pingzheng';
import {ref} from 'vue';

export function showByModel(logs) {
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

export function showByNum(logs) {
    const result=ref('')
    return {
        open: () => {
            openAddPingZheng({
                okApi({pingZhengModel}) {
                    result.value=JSON.stringify(pingZhengModel, null, 2)
                    logs.value.push(result.value)
                    return [];
                    alert(1);
                },
                backApi({pingZhengModel}){

                }
            })
        },
        params: ['凭证编码'],
        result,
        name: '查看凭证(通过编码)'
    };
}
