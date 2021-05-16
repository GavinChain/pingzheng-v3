<template>
  <div>
    <el-popover
        placement="bottom"
        title="辅助核算"
        trigger="manual"
        v-model:visible="showPopover"
    >

      <div ref="abcasd" class="fuzhuhesuan_popover_container">

      </div>
      <template #reference>
        <div @click="showPopover=true">
          <div ref="colFuZhuHeSuan" style="width:100%;height: 60px">
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script setup>
import {
  defineComponent,
  defineProps,
  getCurrentInstance,
  h, nextTick,
  onMounted,
  reactive,
  ref,
  render,
  useContext,
  watch
} from 'vue';
import {ElButton, ElInput,ElSelect,ElOption} from 'element-plus';
import {useFuZhuHeSuanApiWidthOut} from '../../store/modules/fuZhuHeSuanApi';
import {usePingZhengConfigStoreWidthOut} from '../../store/modules/pingZhengConfig';
import {createFuZhuHeSuanSelection} from "./column-fuZheHeSuan-store";
const fuZheHeSuanApi = useFuZhuHeSuanApiWidthOut();



const instance = getCurrentInstance();


const props = defineProps(['modelValue']);

const abcasd = ref();
const colFuZhuHeSuan = ref();
let showPopover = ref(false);
const fuZhuHeSuanSelection=ref(createFuZhuHeSuanSelection(props))
const modelValue=ref()
watch(props,()=>{
  modelValue.value=props.modelValue
},{immediate:true})
const {emit} = useContext();
onMounted(() => {
  renderGridHtml(colFuZhuHeSuan.value,{fuZheHeSuanValue:props.modelValue,showPopover})
  renderGridPoper(abcasd.value,{fuZheHeSuanValue:props.modelValue,showPopover,fuZhuHeSuanSelection})

});



function renderGridHtml(mountDom,{fuZheHeSuanValue,showPopover}){
  render(h({
    render(){
      return (
          <div className={showPopover.value ? 'fu_zhu_he_suan_grid_focus' : ''} style="font-size:10px;height:100%"
               onBlur={(e) => onBlur(e)}>
            <>
              {modelValue.value.map(item => (
                  <>
                    {item.name}:{item.text}
                    <br/>
                  </>
              ))}
            </>
          </div>
      )
    }
  }), mountDom);
}
const selectItems=ref([])
function fuZhuHeSuanchange(){
  showPopover.value=false
  instance.attrs['onUpdate:modelValue'](props.modelValue)
  emit('fuZhuHeSuanChange')
}
function renderGridPoper(mountDom,{showPopover}){

  function selectChange(rowIndex){
    if(selectItems.value[rowIndex+1]==null){
      fuZhuHeSuanchange()
    }else{
      setTimeout(()=>{
        selectItems.value[rowIndex+1].$el.click()
      },100)
    }
  }
  render(h(
      {
        render(){
          return (
              <>
                {props.modelValue.map(item => {
                  const itemIndex=props.modelValue.indexOf(item)
                  return (
                      <ElSelect  v-model={props.modelValue[itemIndex]}
                                 ref={(e)=>selectItems.value[itemIndex]=e}
                                 onChange={()=>selectChange(itemIndex)}>
                        {
                          fuZhuHeSuanSelection.value[item.key].map(selectionItem=>{
                            return (
                                <ElOption
                                    key={selectionItem.id}
                                    label={selectionItem.name}
                                    value={({...item,text:selectionItem.name,value:selectionItem.id})}/>
                            )
                          })
                        }
                      </ElSelect>
                  )

                })}
                <ElButton onClick={fuZhuHeSuanchange}>确认</ElButton>
                <ElButton onClick={()=>showPopover.value=false}>放弃</ElButton>
              </>
          )
        }
      }
  ), mountDom);
}

function focus(){
  showPopover.value=true
  nextTick(()=>{
    setTimeout(()=>{
      selectItems.value[0].$el.click()
    },100)
  })
}
emit('ref', getCurrentInstance());
</script>
<style scoped>
>>> .abca label {
  text-align: justify !important;
  text-align-last: justify !important;
}

>>> .fu_zhu_he_suan_grid_focus {
  border: solid 1px blue
}
</style>
