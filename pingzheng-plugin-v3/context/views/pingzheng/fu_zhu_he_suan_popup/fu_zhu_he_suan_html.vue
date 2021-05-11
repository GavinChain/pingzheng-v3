<template>
  <div class="fuzhuhesuan-html-layout"
       @mouseover="thisMouseover"
       @mouseout="thisMouseout"
       onselectstart="return false;">
    <div class="fuzhuhesuan-html" v-html="fuZhuHeSuanHtml" style=" "/>
  </div>

</template>
<script setup>

import {getCurrentInstance, onMounted, ref, useContext, watch} from 'vue';

const {slots, emit} = useContext();
const fuZhuHeSuanHtml = ref();
const tipId = ref(null);

// onMounted(()=>console.log(fuZhuHeSuanHtml))
function thisMouseover(e) {
  // if (e.target, value != '') {
  //   tipId.value = openFuZhuHeSuanDetail(e.target, value);
  // }
}

function thisMouseout() {
  close(tipId);
}

function openFuZhuHeSuanDetail(dom, html) {
  layer.close(this.tipId);
  // if(this.tipId==null){
  return layer.tips(html, dom, {
    tips: [1, '#3595CC'],
    time: 0,
    area: ['200px', 'auto']
  });
  // }
  // layer.open({
  //     type: 1,
  //     content: html,
  //     btn: ['关闭']
  // })
}

const aaa=()=>{
  fuZhuHeSuanHtml.value=slots.default()[0].children
}
watch(slots.default,aaa)
onMounted(aaa)
const instance=getCurrentInstance()
emit('ref', instance);
</script>
<style scoped>
.fuzhuhesuan-html-layout {
  user-select: none;
  cursor: pointer
}

.fuzhuhesuan-html {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  height: 100%;
  width: 100%;
  -webkit-box-orient: vertical;
  width: 100%;
  line-height: 20px;
  padding-left: 5px;
  font-size: 12px;
}
</style>
