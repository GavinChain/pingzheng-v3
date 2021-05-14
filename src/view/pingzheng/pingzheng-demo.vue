<template>
  <div>
    <el-form :label-position="'top'" label-width="80px">
      <el-form-item v-for="item in formItems" :label="item.name" style="background:rgba(0, 255 ,102 , 20%)">
        请求参数:{{ item.params }}<br>
        请求:
        <el-button class="pingzheng-button" @click="item.open">开始</el-button>
        返回结果:
        <el-input type="textarea" style="width:500px" v-model="item.result"></el-input>
      </el-form-item>

    </el-form>
    <div :style="abc" style="position: fixed;
    z-index:29891016;
    right: 0px;
    background: rgba(0 ,0, 0,  0.8);
    bottom: 0px;
    width: 599px;
    height: 800px;padding:10px 10px 10px 10px;" v-show="showLog">
      <el-button style="position:absolute;right:10px" @click="showLog=false">关闭</el-button>
      <el-button style="position:absolute;right:200px" @click="timeOutEvent()">暂停关闭</el-button>
      <div style="margin-top:50px"></div>
      <textarea style="background:white;min-height:100px;width:100%" v-for="item in logs" v-text="item"></textarea>
    </div>
    <el-button style="position:fixed;right:10px;bottom:20px" v-show="!showLog" @click="showLog=true">开启Log</el-button>
  </div>
</template>
<script setup>
import {watch,onMounted, ref} from 'vue';
import {openAddPingZheng} from './pingzheng';
import a from '@json-editor/json-editor'
import {addItem} from '@/view/pingzheng/open/add';
import {addEditorItem} from '@/view/pingzheng/open/addeditor';
import {showByModel, showByNum} from '@/view/pingzheng/open/show';
import {editByModel} from '@/view/pingzheng/open/edit';
import {insertByNum} from '@/view/pingzheng/open/insert';
const abc=ref('z-index:1 !important;')
console.log(a);
const labelPosition = ref('right');
const logs=ref([])
const showLog=ref(true)
const timeOutEvent=ref()
let add={}
watch(logs,()=>{
  window.clearTimeout(add)
  showLog.value=true

  add=setTimeout(()=>{showLog.value=false},2000)
  timeOutEvent.value=()=>{window.clearTimeout(add)}
},{immediate:true,deep:true})
setTimeout(()=>showLog.value=false,2500)


const formItems = ref([
  showByModel(logs),
  addItem(logs),
  addEditorItem(logs),
  editByModel(logs),
  showByNum(logs),
  insertByNum(logs),
  {params: [], name: '冲销凭证'},
  {params: [], name: '作废凭证样式(传入)'}
]);

onMounted(async () => {


});
</script>
<style scoped>
.pingzheng-button {
  margin-bottom: 10px;
}

</style>
