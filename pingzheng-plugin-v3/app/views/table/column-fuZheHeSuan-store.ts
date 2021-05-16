import {reactive, ref, watch} from "vue";
import {useFuZhuHeSuanApiWidthOut} from "../../store/modules/fuZhuHeSuanApi";
const fuZheHeSuanApi = useFuZhuHeSuanApiWidthOut();
export function createFuZhuHeSuanSelection(source){
    const selectionHandel:any=   {
        state:reactive({}),
        actions:{
            async provideFuZhuHeSuanSelection(key){
                selectionHandel.state[key]=[]
                selectionHandel.state[key]=await fuZheHeSuanApi.getFuZhuHeSuanList(key)
            }
        }
    }
    watch(source,()=>{
        source.modelValue.forEach(({key})=>{
            if(selectionHandel.state[key]==null){
                selectionHandel.state[key]=[]
                selectionHandel.actions.provideFuZhuHeSuanSelection(key).then()
            }
        })
    },{immediate:true})
    return selectionHandel.state
}
