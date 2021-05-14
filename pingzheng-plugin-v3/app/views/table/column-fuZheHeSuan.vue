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
  h,
  onMounted,
  reactive,
  ref,
  render,
  useContext,
  watch
} from 'vue';
import {ElButton, ElInput,ElSelect} from 'element-plus';
import {useFuZhuHeSuanApiWidthOut} from '../../store/modules/fuZhuHeSuanApi';
import {usePingZhengConfigStoreWidthOut} from '../../store/modules/pingZhengConfig';

const props = defineProps(['modelValue']);
const fuZhuHeSuanList=props.modelValue
const colFuZhuHeSuan = ref();
const abcasd = ref();
let showPopover = ref(false);
const instance = getCurrentInstance();
const fuZheHeSuanApi = useFuZhuHeSuanApiWidthOut();

function dataChange(fuZhuHeSuanList) {
  showPopover.value = false;
  instance.attrs['onUpdate:modelValue'](fuZhuHeSuanList);
}
//
// function renderThis(modelValue) {
//   if (modelValue == null) {
//     return;
//   }
//   const fuZhuHeSuanList = reactive(JSON.parse(JSON.stringify(modelValue)));
//   // setInterval(()=>{
//   //   fuZhuHeSuanList[0].value=fuZhuHeSuanList[0].value+'1'
//   // },1000)
//
//
//   function ddd(e) {
//     if (e.relatedTarget != null) {
//       if (e.relatedTarget.closest('.fuzhuhesuan_popover_container') != null) {
//         return;
//       }
//     }
//     showPopover.value = false;
//   }
//
//   // setInterval(()=>{
//   //   console.log(fuZheHeSuanApi.$state);
//   // },1000)
//   function dadas(vmodel, key) {
//     const list = JSON.parse(JSON.stringify(fuZheHeSuanApi.getFuZhuHeSuanList(key)));
//     console.log(list);
//     return h(
//         {
//
//           render(){
//             return <ElSelect/>
//           }
//         }
//     );
//   }
//
//   const com = defineComponent(() => () =>
//       <div class={showPopover.value ? 'fu_zhu_he_suan_grid_focus' : ''} style="font-size:10px;height:100%"
//            onBlur={(e) => ddd(e)}>
//         <>
//           <>{() => aaaa()}</>
//           {fuZhuHeSuanList.map(item => (
//               <>
//                 {item.name}:{item.value}
//                 <br/>
//               </>
//           ))}
//         </>
//       </div>
//   );
//   const pingZhengConfig = usePingZhengConfigStoreWidthOut();
//   if (!pingZhengConfig.getIsTextModel) {
//     watch(fuZheHeSuanApi.$state.fuZhuHeSuanList, () => {
//       const itemsSelect = fuZhuHeSuanList.map(fuZhuHeSuanOne => {
//         return dadas(fuZhuHeSuanOne, fuZhuHeSuanOne.key);
//       });
//
//       render(h(
//           {
//
//             render(){
//               return (
//                   <>
//                   <ElSelect/>
//                   </>
//               )
//             }
//           }
//       ), abcasd.value);
//     }, {immediate: true, deep: true});
//   }
//
//
//   function aaaa() {
//     debugger
//   }
//   watch(fuZhuHeSuanList, () => {
//     render(h(com), colFuZhuHeSuan.value);
//   }, {immediate: true});
//
// }

function focus() {
  showPopover.value = true;
}
const {emit} = useContext();
emit('ref', getCurrentInstance());
onMounted(() => {
  render(h(
      {

        render(){
          return (
              <>
                <ElSelect/>
              </>
          )
        }
      }
  ), abcasd.value);
  const com=defineComponent(() => () =>
      <div class={showPopover.value ? 'fu_zhu_he_suan_grid_focus' : ''} style="font-size:10px;height:100%"
           onBlur={(e) => ddd(e)}>
        <>
          1
          {fuZhuHeSuanList.map(item => (
              <>
                {item.name}:{item.value}
                <br/>
              </>
          ))}
          2
        </>
      </div>
  )
  render(h(com), colFuZhuHeSuan.value);
});
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
