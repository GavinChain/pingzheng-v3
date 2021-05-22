<template>
  <ul>
    <li class="col-serial">{{ rowIndex + 1 }}</li>
    <li class="col1">
    <ZhaiYaoGrid @ref="zhaiYaoRef=$event" @zhaiYaoChange="kuaiJiKemuGridRef.setupState.focus()" v-model="row.zhaiYao"/>
    </li>
    <li class="col2">
      <KuaiJiKeMuGrid v-model="row.kuaiJiKeMuText" @ref="kuaiJiKemuGridRef=$event" @kuaiJiKeMuChange="kuaiJiKeMuChange"/>
    </li>
    <li class="col3" style="">
      <FuZhuHeSuanGrid @ref="fuZheHeSuanRef=$event" v-if="fuZhuHeSuan!=null" v-model="fuZhuHeSuan" @fuZhuHeSuanChange="fuZhuHeSuanChange"></FuZhuHeSuanGrid>
    </li>
    <li class="col-jie" style="position: relative">
      <JieMoneyGrid v-model="row.jieMoney"
                    :equals-event="()=>row.jieMoney"
                    @ref="jieMoneyGridRef=$event"
                    @money-change="jieMoneyChange"/>
    </li>
    <li class="col-dai" style=" position: relative">
      <DaiMoneyGrid v-model="row.daiMoney"
                    :equals-event="()=>row.daiMoney"
                    @ref="daiMoneyGridRef=$event"
                    @money-change="daiMoneyChange"/>
    </li>
  </ul>

</template>
<script setup>
import {defineProps, getCurrentInstance, nextTick, ref, useContext, watch} from "vue";
import {usePingZhengModelStoreWidthOut} from "../../store/modules/pingZhengModel";
import MoneyGrid from '../components/money_grid.vue'
import ZhaiYaoGrid from './column-zhaiYao.vue'
import KuaiJiKeMuGrid from './column-kuaiJiKeMu.vue'
import JieMoneyGrid from './column-money-grid.vue'
import DaiMoneyGrid from './column-money-grid.vue'
import FuZhuHeSuanGrid from './column-fuZheHeSuan'
import {usePingZhengApiStore, usePingZhengApiWidthOut} from "../../store/modules/pingZhengApi";
const props = defineProps(['modelValue','rowIndex'])
const row = ref()
const rowIndex = ref()
const pingZhengModel = usePingZhengModelStoreWidthOut()
const pingZhengApi = usePingZhengApiWidthOut()

const zhaiYaoRef=ref()
const kuaiJiKemuGridRef=ref()
const uZhuHeSuanRef=ref()
const jieMoneyGridRef=ref()
const daiMoneyGridRef=ref()
const fuZheHeSuanRef=ref()
const fuZhuHeSuan=ref(null)

watch(props,()=>{
  if(props.modelValue.fuZhuHeSuan!=null){
    fuZhuHeSuan.value=props.modelValue.fuZhuHeSuan
  }
},{immediate:true})

watch(fuZhuHeSuan,()=>{
  if(fuZhuHeSuan!=null){
    props.modelValue.fuZhuHeSuan=fuZhuHeSuan.value
  }
})
// if(fuZhuHeSuan.value.length>0){
//   row.value.fuZhuHeSuan=fuZhuHeSuan
// }
const fuZhuHeSuanHover=ref(false)

function focusKuaiJiKeMuGrid(rowIndex) {
  kuaiJiKeMuGrid.value[rowIndex].setupState.focus();
}
const {emit}=useContext()

watch(props, () => {
  row.value = props.modelValue
  rowIndex.value = props.rowIndex
},{immediate:true})

async function kuaiJiKeMuChange(kuaiJiKeMuFull){
    const kuaiJiKeMuCode=kuaiJiKeMuFull.split(' ')[0]
    fuZhuHeSuan.value=await pingZhengApi.getFuZhuHeSuanColumnsNameApi(kuaiJiKeMuCode)

    if(fuZhuHeSuan.value==null){
      jieMoneyGridRef.value.setupState.focus()
    }else{
      nextTick(async()=> {
        fuZheHeSuanRef.value.setupState.focus()
      }).then()
    }



}

function newLineHandle(zhaiYao){
  row.value.zhaiYao=zhaiYao
  focusZhaiYao()

}
function fuZhuHeSuanChange(){
  jieMoneyGridRef.value.setupState.focus()
}

function focusZhaiYao(){
  zhaiYaoRef.value.setupState.focus()
}

function jieMoneyChange(){
  daiMoneyGridRef.value.setupState.clear()
  if(parseInt(row.value.jieMoney)==0){
    daiMoneyGridRef.value.setupState.focus()
  }else{
    emit('next')
  }
}

function daiMoneyChange(){
  jieMoneyGridRef.value.setupState.clear()
  emit('next')
}
emit('ref',getCurrentInstance())
</script>