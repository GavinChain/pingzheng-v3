<template>
  <div ref="abc"/>
</template>
<script setup>
import {defineProps, onMounted, ref, render, useContext} from 'vue';
import {ElForm,ElFormItem,ElInput} from 'element-plus'
const abc = ref();
const {expose} = useContext();
expose({
  abcsdsad() {
    alert(1);
  }
});
const props=defineProps(['modelValue'])
const fuZhuHeSuanList = ref([{},{},{}]);
const elList = ref([]);
elList.value=fuZhuHeSuanList.value.map(item=>{
  const hello=221
  return (
      <ElFrom>
        <ElFromItem>
          <ElInput v-model={hello}></ElInput>
        </ElFromItem>
      </ElFrom>
  )
})
console.log(elList);
onMounted(() => {
  setInterval(()=>{
    console.log(props.modelValue);
  },1000)
  render((
      <div>
        {
          elList.value
        }
      </div>

  ), abc.value);
});

</script>
