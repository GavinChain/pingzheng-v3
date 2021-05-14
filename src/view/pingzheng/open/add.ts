import {openAddPingZheng} from '@/view/pingzheng/pingzheng';
import {ref} from 'vue';

export function addItem(logs) {
    const result=ref('')
    const add={
        open: () => {
            openAddPingZheng({
                okApi({pingZhengModel}) {
                    result.value=JSON.stringify(pingZhengModel, null, 2)
                    logs.value.push(result.value)
                    return [];
                },
                backApi(){

                }
            })
        },
        params: ['无'],
        result,
        name: '仅新增凭证'
    };
    add.open()
    return add
}
