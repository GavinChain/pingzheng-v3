import {openAddPingZheng} from '@/view/pingzheng/pingzheng';
import {ref} from 'vue';

export function addEditorItem(logs) {
    const result=ref('')
    return {
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
        params: [
            '默认日期:defaultDate',
            '会计科目列表:listapi'
        ],
        result,
        name: '新增凭证'
    };
}
