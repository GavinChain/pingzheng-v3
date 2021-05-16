<template>
  <PingzhengScreen>
    <PingZhengLayOut>
      <PingZhengTable></PingZhengTable>
      <template v-slot:bottomRightBtns>
        <div ref="bottomRightInstanceRef"></div>
      </template>
    </PingZhengLayOut>
  </PingzhengScreen>

</template>
<script setup>
import PingzhengScreen from '../layout/pingzheng-screen';
import PingZhengLayOut from './pingzheng_editor_layout';
import PingZhengTable from './pingzheng_editor_table';
import {defineProps, onMounted, ref, watch, unref, render, h, getCurrentInstance} from 'vue';
import {usePingZhengModelStoreWidthOut} from '../store/modules/pingZhengModel';
import {usePingZhengApiWidthOut} from '../store/modules/pingZhengApi';
import {usePingZhengButtonWidthOut} from '../store/modules/pingZhengButton';
const pingZhengApi=usePingZhengApiWidthOut()
const pingZhengModelStore=usePingZhengModelStoreWidthOut()
const props=defineProps(['modelValue'])
const model=ref(props.modelValue)
const a=model.value.rows[0]
const pingZhengButtonStore=usePingZhengButtonWidthOut()
const bottomRightInstance=ref(pingZhengButtonStore.getBottomRightInstance)
const bottomRightInstanceRef=ref()
onMounted(()=>{
  render(h(bottomRightInstance.value),bottomRightInstanceRef.value)
})
onMounted(()=>{
    const unModel=unref(model)
  const pingZhengModelStore=usePingZhengModelStoreWidthOut()


  pingZhengModelStore.commitPingZhengModel(model);
})

</script>
