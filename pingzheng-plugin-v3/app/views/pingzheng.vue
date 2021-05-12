<template>
  <PingzhengLayer>
    <PingZhengLayOut>
      <PingZhengTable></PingZhengTable>
    </PingZhengLayOut>
  </PingzhengLayer>

</template>
<script setup>
import PingzhengLayer from '../layout/pingzheng-layer';
import PingZhengLayOut from './pingzheng_editor_layout';
import PingZhengTable from './pingzheng_editor_table';
import {defineProps, onMounted, ref, watch,unref} from 'vue';
import {usePingZhengModelStoreWidthOut} from '../store/modules/pingZhengModel';
const props=defineProps(['model'])
const model=ref(props.model)
const a=model.value.rows[0]
onMounted(()=>{
    const unModel=unref(model)
  const pingZhengModelStore=usePingZhengModelStoreWidthOut()
  pingZhengModelStore.commitPingZhengModel(model)
  let modelt=pingZhengModelStore.getAbcD

  // setTimeout(()=>{
  //   pingZhengModelStore.commitAbcD({a:12321})
  //   // console.log(pingZhengModelStore.$state);
  //   // pingZhengModelStore.commitPingZhengModel(model)
  // },2000)
  // let a=ref({
  //   b:'1'
  // })
  // watch(pingZhengModelStore.getPingZhengModel,()=>{
  //
  //   console.log(157);
  // })
  // setInterval(()=>{
  //   a.value.b=12321
  // },1000)
  //
  // setInterval(()=>{
  //   unModel.rows[0].jieMoney=unModel.rows[0].jieMoney+1
  // },1000)


  pingZhengModelStore.commitPingZhengModel(model);
})

</script>
