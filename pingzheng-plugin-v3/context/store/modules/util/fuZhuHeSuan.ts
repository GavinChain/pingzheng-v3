import {fuZhuHeSuanMuStore} from '../fuZhuHeSuan';

export async function castFuZhuHeSuanHtml(row) {
    function take(obj, nameProp) {
        const {[nameProp]: inputValue = null} = obj;
        if (inputValue == null) {
            return null;
        }


        return {key: nameProp, inputValue};
    }

    // const abc=await this.getDeptList()
    const list= [take(row, 'fzDept'),
        take(row, 'fzEmp'),
        take(row, 'fzCustomer'),
        take(row, 'fzSupplier'),
        take(row, 'fzCunHuo'),
        take(row, 'fzXiangMuMulu')
    ]

    const strList:any=[]
    for(let i=0;i<list.length;i++){
        const item=list[i]
        if(item==null)continue
        if (item.key == 'fzDept') {
            const deptList=await fuZhuHeSuanMuStore.getDeptList()
            let inputValue = '';

            if (item.inputValue != '') {
                const object:any = deptList.list.filter((option:any) => option.value == item.inputValue)[0];
                inputValue = object.label;

            }
            strList.push(deptList.name + ': ' + inputValue);
        }
        if (item.key == 'fzEmp') {
            const personList:any=await fuZhuHeSuanMuStore.getPersonList()
            let inputValue = '';

            if (item.inputValue != '') {
                inputValue = personList.list.filter((option:any) => option.value == item.inputValue)[0].label;
            }
            strList.push(personList.name + ': ' + inputValue);
        }
        if (item.key == 'fzCustomer') {
            let inputValue = '';
            const customerList:any= await fuZhuHeSuanMuStore.getCustomerList()
            if (item.inputValue != '') {
                inputValue = customerList.list.filter((option:any) => option.value == item.inputValue)[0].label;
            }
            strList.push(customerList.name + ': ' + inputValue);
        }
        if (item.key == 'fzSupplier') {
            let inputValue = '';
            const GYList:any=  await fuZhuHeSuanMuStore.getGYList()
            if (item.inputValue != '') {
                inputValue =GYList.list.filter(option => option.value == item.inputValue)[0].label;
            }

            strList.push(GYList.name + ': ' + inputValue);
        }
        if (item.key == 'fzCunHuo') {
            let inputValue = '';
            const CHList:any=await fuZhuHeSuanMuStore.getCHList()
            if (item.inputValue != '') {
                inputValue = CHList.list.filter(option => option.value == item.inputValue)[0].label;
            }
            strList.push(CHList.name + ': ' + inputValue);
        }
        if (item.key == 'fzXiangMuMulu') {
            let inputValue = '';
            const itemList:any=await fuZhuHeSuanMuStore.getItemList()
            if (item.inputValue != '') {
                inputValue = await itemList.list.filter((option:any) => option.value == item.inputValue)[0].label;
            }
            strList.push(await itemList.name + ': ' + inputValue);
        }
    }
    return strList.join('<br>');
}
