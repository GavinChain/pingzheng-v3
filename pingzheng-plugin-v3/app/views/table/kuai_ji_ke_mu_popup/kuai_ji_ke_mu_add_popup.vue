<template>
  <div
      class="subject_add"
      style="position:relative;color:white"
  >
    <div
        style="height:70%;z-index:500;border-radius: 10px"
    >
      <div
          class="dy_ul_list"
          style="z-index:9999999999999999999999999;height: 280px;width:100%"
      >

        <ul
            class="content"
            style="padding-left:0;overflow-y:inherit;width:inherit;height: 170px"
        >
          <li>
            科目名称:
            <input
                type="text"
                v-model="formItems.addData.ccodeName"
                ref="KMNameInput"
                @keyup.enter="$refs['topSubjectInput'].click()"
                style="width:260px;"
            >
          </li>
          <li>
            上级科目:
            <div
                class="selectChoose"
                style="float: initial;display:inline"
            >
              <!-- <input type="hidden" v-model="formItems.queryData.like" v-model="formItems.queryData.like"/>-->
              <input
                  type="text"
                  ref="topSubjectInput"
                  onclick="this.select();"
                  @focus="$refs.dataList.style.display='block'"
                  @blur="$refs.dataList.style.display='none'"
                  @input="queryKM(formItems.queryData),$event.target.focus()"
                  @keydown.up="topSubjectInputKeyDownUp"
                  @keydown.down="topSubjectInputKeyDownDown"
                  @keyup.enter="$refs.dataList.getElementsByTagName('LI')[chooseIndex].click(),setTimeout(()=>{$refs['kuaiJiKeMuNumInput'].click()},100)"
                  v-model="formItems.queryData.like"
                  style="width:260px;cursor: pointer;text-align: center"
              >
              <ul
                  ref="dataList"
                  style="display:none;top:20px;left:0px;overflow: scroll;height:300px;text-align: left"
              >
                <li
                    v-for="(topObj,index) in formItems.topNameList"
                    @click="chooseTopKM(topObj.ccode,topObj.ccodename,topObj)"
                    @mousedown="$event.target.click()"
                    :class="index==chooseIndex?'active':''"
                >
                  {{ topObj.ccode }} {{ topObj.ccodename }}
                </li>
              </ul>
              <div style="clear: both" />
            </div>
          </li>
          <!--   <li>
                 科目类型:
                 <input type="text" placeholder="资产" readonly="readonly"  style="cursor: pointer"/>
             </li>-->
          <li>
            科目编码:
            <input
                type="text"
                ref="kuaiJiKeMuNumInput"
                readonly="readonly"
                onclick="this.select();"
                style="width:260px;cursor: pointer"
                @keyup.enter="$refs['kmAddPageAffirm'].click()"
                v-model="formItems.addData.ccodeNum"
            >
          </li>

          <li style="display:none">
            余额方向:
            <div
                class="radioContainer"
                style="color:grey"
            >
              <template v-if="formItems.addData.bproperty==1">
                <div
                    class="radio"
                    @click="formItems.addData.bproperty=1"
                >
                  <i class="layui-anim layui-icon"></i>借
                </div>
                <div
                    class="radio"
                    style="margin-left:20px"
                    @click="formItems.addData.bproperty=0"
                >
                  <i class="layui-anim layui-icon"></i>贷
                </div>
              </template>
              <template v-if="formItems.addData.bproperty==0">
                <div
                    class="radio"
                    @click="formItems.addData.bproperty=1"
                >
                  <i class="layui-anim layui-icon"></i>借
                </div>
                <div
                    class="radio"
                    style="margin-left:20px"
                    @click="formItems.addData.bproperty=0"
                >
                  <i class="layui-anim layui-icon"></i>贷
                </div>
              </template>
            </div>
          </li>
        </ul>
        <div class="btnContainer" style="margin-top:10px">
          <el-button class="dy_button" ref="kmAddPageAffirm" @click="emit('ok')">确认添加</el-button>
          <el-button class="dy_button" @click="emit('cancel')">放弃</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {defineProps, ref, useContext} from 'vue';

const props = defineProps(['modelValue']);
const modelValue = ref(props.modelValue);
const {emit}=useContext()

const formItems = ref({
  topNameList: [],
  queryData: {
    like: ''
  },
  addData: {
    num: '',         // 上级编码    +
    year: '',        // 当前年
    /* 新增数据 */
    ccodeNum: '',    // 编码 300501
    ccodeName: '',   // 科目名      +
    bproperty: '',   // 方向        +
    cclass: '',      // 科目大类    +
    igradeNum: ''    // 科目级次    +

  },
  showData: {},
  exportData: {
    obj: {},
    dom: {}
  }
});
function ok(){
  showPopover.value=false
}
function cancel(){
  showPopover.value=false
}
const colFuZhuHeSuan = ref();
const abcasd = ref();
</script>
