<template>
  <el-popover
      placement="bottom"
      title="标题"
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
</template>
<script setup>
import {defineProps, getCurrentInstance, onMounted, reactive, ref, render, watch} from 'vue';
import {ElButton, ElSelect} from 'element-plus';
import {useFuZhuHeSuanApiWidthOut} from '../../store/modules/fuZhuHeSuanApi';

const props = defineProps(['modelValue']);
const modelValue = reactive(props.modelValue);
const colFuZhuHeSuan = ref();
const abcasd = ref();
let showPopover = ref(false);
const instance = getCurrentInstance();
const fuZheHeSuanApi = useFuZhuHeSuanApiWidthOut();

function dataChange(fuZhuHeSuanList) {
  showPopover.value = false;
  instance.attrs['onUpdate:modelValue'](fuZhuHeSuanList);
}

function renderThis(modelValue) {
  const fuZhuHeSuanList = reactive(JSON.parse(JSON.stringify(modelValue)));
  // setInterval(()=>{
  //   fuZhuHeSuanList[0].value=fuZhuHeSuanList[0].value+'1'
  // },1000)


  function ddd(e) {
    if (e.relatedTarget != null) {
      if (e.relatedTarget.closest('.fuzhuhesuan_popover_container') != null) {
        return;
      }
    }
    showPopover.value = false;
  }

  // setInterval(()=>{
  //   console.log(fuZheHeSuanApi.$state);
  // },1000)
  function dadas(vmodel,key) {
    const list = JSON.parse(JSON.stringify(fuZheHeSuanApi.getFuZhuHeSuanList(key)));
    if (list.length > 0) {
      // let a=list.map(item=> (<ElSelect></ElSelect>))
      return (
          <ElSelect value={vmodel.value} onChange={(e)=>vmodel.value=e}>
              <>
                {list.map(item => (
                    <ElOption
                        key={item.value}
                        label={item.name}
                        value={item.value}/>
                ))}
              </>
          </ElSelect>
      );
    }

    return (
        <ElSelect></ElSelect>
    );
  }

  watch(fuZheHeSuanApi.$state.fuZhuHeSuanList, () => {
    const itemsSelect = fuZhuHeSuanList.map(fuZhuHeSuanOne => {
      return dadas(fuZhuHeSuanOne,fuZhuHeSuanOne.key)
    });

    render((
        <div style="font-size:10px">
          {itemsSelect}
          <ElButton onClick={() => dataChange(fuZhuHeSuanList)}>确定</ElButton>
          <ElButton>放弃</ElButton>
        </div>
    ), abcasd.value);
  }, {immediate: true, deep: true});

  watch(fuZhuHeSuanList, () => {
    render((
        <div tabIndex="1" style="font-size:10px;height:100%" onBlur={(e) => ddd(e)}>
          {fuZhuHeSuanList.map(item => (
              <>
                {item.name}:{item.value}
                <br/>
              </>
          ))}
        </div>
    ), colFuZhuHeSuan.value);
  }, {immediate: true});

}

onMounted(() => watch(modelValue, () => renderThis(modelValue), {immediate: true}));
</script>
<style scoped>
>>> .abca label {
  text-align: justify !important;
  text-align-last: justify !important;
}
</style>
