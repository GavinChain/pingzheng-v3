<template>
  <div class="subGrid">
    <el-popover
        placement="bottom-start"
        title="新增会计科目"
        width="380px"
        trigger="manual"
        v-model:visible="showPopover"
    >
      <addSubjectPage v-model="textareaVal" @ok="showPopover=false" @cancel="showPopover=false"/>
      <template #reference>
        <textarea
            :class="isNotFind?'isNotFind':''"
            ref="subInput"
            v-model="textareaVal"
            @focus="textareaFocus"
            @blur="textareaBlur"
            @input="listFitter($event.target)"
            @keydown.up="textareaKeyUp"
            @keydown.down="textareaKeyDown"
            @keyup.enter.stop="enterEvent"
            onclick="javascript:this.focus();this.select();"
            style="box-sizing:border-box;background:inherit;display:block;height:60px;font-size:15px; color:black;font-weight:800;"
        />
      </template>
    </el-popover>


    <div
        ref="dataList"
        class="dataList"
    >
      <ul class="ulList">
        <li
            @click="ulLiClick(kuaiJiKeMu,$event)"
            v-for="(kuaiJiKeMu,index) in kuaiJiKeMuList"
            :class="index==chooseIndex?'active':''"
            @mousedown.stop="$event.target.click()"
            style="font-size:13px;padding:10px 10px"
        >
          {{ kuaiJiKeMu.ccode }} {{ kuaiJiKeMu.ccodepath }}
        </li>
      </ul>
      <ul
          @click="showPageAddKM=true"
          style="box-shadow: rgb(59, 128, 169) 0px 1px 20px 0px inset;cursor:pointer;z-index:999999;margin-top:300px;background: rgb(40, 180, 164);font-weight:700;text-align: center;margin:0;padding:5px 0 0;width:416px;overflow-y: scroll;border-bottom:solid 1px grey;height:30px;color:white;"
      >
        <li @mousedown="showPopover=true">
          新增科目
        </li>
      </ul>
    </div>


    <!--    <div v-if="textareaVal!='' && textareaVal!=null" class="balance"  style="position:absolute;bottom:0;color:grey;pointer-events:none;" >-->
    <!--            余额:-->
    <!--            <span  :style="{'color':moneyComputed<0?'red':''}">{{moneyComputed}}</span>-->
    <!--            元-->
    <!--    </div>-->

  </div>
</template>
<script setup>

// @ts-nocheck
// import {useCssLoad} from '../../require-css/index';
// useCssLoad(import.meta.url).loadCss([
// 'column-kuaiJiKeMu.css'
// ]);
import jquery from 'jquery'
import {computed, defineProps, getCurrentInstance, nextTick, onMounted, ref, useContext, watch} from 'vue';
import {useKuaiJiKeMuStoreWidthOut} from '../../store/modules/kuaiJiKeMu';
const kuaiJiKeMuStore=useKuaiJiKeMuStoreWidthOut()
import addSubjectPage from './kuai_ji_ke_mu_popup/kuai_ji_ke_mu_add_popup'
const kuaiJiKeMuList = computed(() => kuaiJiKeMuStore.getKuaiJiKeMuList);
const dataList = ref(null);
const showPopover=ref(false)
const api = {
  // 检查是否需要辅助核算
  queryAssist() {
    return true;
    // let bol = false // true 直接完成,false需要进行辅助核算
    // let objs = {
    //     'iyear': this.$store.state.addvouchPageIyear,
    //     'ccode': this.ccode
    // };
    // jquery.ajax({
    //     type: 'post',
    //     url: urlPath + '/subject!queryAssist',
    //     data: objs,
    //     async: false,
    //     success: function (res) {
    //         this.assistTypes = []
    //         dataList.value.style.display = 'none'
    //         if (res.obj.bperson == '1') this.assistTypes['个人往来'] = {}
    //         if (res.obj.brelativeUnit == '1') this.assistTypes['往来单位'] = {}
    //         if (res.obj.bdept == '1') this.assistTypes['部门'] = {}
    //         if (res.obj.bitem == '1') this.assistTypes['项目'] = {}
    //         if (res.obj.binventory == '1') this.assistTypes['存货'] = {}
    //         if (res.obj.br == '1') this.assistTypes['客户'] = {}
    //         if (res.obj.be == '1') this.assistTypes['供应商'] = {}
    //         if (Object.keys(this.assistTypes).length == 0) {
    //             bol = true
    //         } else {
    //             // this.openAssistSet = true
    //         }
    //
    //     }.bind(this),
    //     error: function (xhr) {
    //         jquery('body').html(xhr.responseText)
    //     }
    // });
    // return bol
  }
  // // 查询余额
  // queryMoney() {
  //     let objs = {
  //         'requestMap.iyear': this.iyear,
  //         'requestMap.ccode': this.ccode
  //     };
  //     jquery.ajax({
  //         type: 'post',
  //         url: urlPath + '/voucher!queryKMMoney',
  //         data: objs,
  //         success: function (res) {
  //             this.money = res.map['money']
  //             this.orgin = res.map['orgin']
  //             if(this.updatePage){
  //                 if (this.orgin == 1) {
  //                     this.money-=(parseFloat(this.billSubjectMoneys.j) - parseFloat(this.billSubjectMoneys.d)).toFixed(2)
  //                 } else {
  //                     this.money-= (parseFloat(this.billSubjectMoneys.d) - parseFloat(this.billSubjectMoneys.j)).toFixed(2)
  //                 }
  //             }
  //         }.bind(this),
  //         error: function (xhr) {
  //             jquery('body').html(xhr.responseText)
  //         }
  //     });
  // }
};

const props = defineProps([
  'rowIndex',
  'val',
  'subBillMoney',
  'iyear',
  'billSubjectMoneys',
  'assistVal',
  'subs',
  'updatePage'
]);
const textareaVal = ref(props.val);
const dataListShow = false;
const addSubjectPageShow = false;
const chooseIndex = ref(0);
const openAssistSet = false;
const money = 0;
const orgin = 0;
const assistTypes = {};
const isNotFind=ref(false)
//
// const kuaiJiKeMuList=function() {
//   let list = [];
//   for (let i in this.subs) {
//     if (this.subs[i].hide == false) {
//       list.push(this.subs[i]);
//     }
//   }
//   return list;
// }
const moneyComputed = function() {
  if (this.billSubjectMoneys == null) {
    return parseFloat(this.money).toFixed(2);
  }
  if (this.orgin == 1) {
    return ((parseFloat(this.money) + parseFloat(this.billSubjectMoneys.j) - parseFloat(this.billSubjectMoneys.d))).toFixed(2);
  } else {
    return ((parseFloat(this.money) + parseFloat(this.billSubjectMoneys.d) - parseFloat(this.billSubjectMoneys.j))).toFixed(2);
  }
};
// 凭证表高度
const vouchTableScrollY = function() {
  return this.$store.state.vouchTableScrollY;
};
// body高度
const bodyWidth = function() {
  return this.$store.state.bodyWidth;
};
// ccde
const ccode = function() {
  return this.textareaVal.split(' ')[0];
};

function kuaiJiKeMuChange(event) {
  emit('kuaiJiKeMuChange',textareaVal.value)
  // this.addSubjectPageShow = false;
  // this.$emit('refresh', function() {
  //   this.textareaVal = this.getDescribe(event), this.$nextTick(function() {
  //     this.queryAssist() ? this.$emit('kuaiJiKeMuChange', textareaVal) : '';
  //   });
  // }.bind(this));
}

// ...api,
function enterEvent(e) {
  e.preventDefault()
  dataList.value.getElementsByTagName('LI')[chooseIndex.value].click();
  chooseIndex.value = -1;
}

// function initSubs() {
//   for (let i in this.subs) {
//     this.subs[i].hide = false;
//     this.$set(this.subs, i, this.subs[i]);
//   }
// }
// 过滤列表
function listFitter(obj) {
  let val = jquery(obj).val();
  if (val.indexOf('\n') != -1) {
    this.textareaVal = jquery.trim(val);
    return;
  }
  val = jquery.trim(val);
  for (let i in this.subs) {
    if (val == '') {
      this.subs[i].hide = false;
      this.$set(this.subs, i, this.subs[i]);
      continue;
    }
    const PinyinMatch=''
    if (PinyinMatch.match(this.subs[i].ccodepath, val) != false || this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 1 || this.subs[i].ccodename.split(val).length > 1 || (jquery.trim(this.subs[i].ccode) + ' ' + jquery.trim(this.subs[i].ccodepath)).split(val).length > 1) {

      this.subs[i].hide = false;
      this.$set(this.subs, i, this.subs[i]);
    } else if (this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 2 || jquery.trim(this.subs[i].ccode) + ' ' + jquery.trim(this.subs[i].ccodepath) == val) {
      this.subs[i].hide = false;
      this.$set(this.subs, i, this.subs[i]);
    } else {
      this.subs[i].hide = true;
      this.$set(this.subs, i, this.subs[i]);
    }
  }
}
const {emit} = useContext();
const subInput = ref();

// 监听位置改变,同步位置
function onDataListPostion(scrollTop) {
  if (dataList.value == null) return;
  // dataList.value.style.display = 'none'
  dataList.value.style.left = subInput.value.getBoundingClientRect().x;
  dataList.value.style.top = (subInput.value.getBoundingClientRect().y + subInput.value.getBoundingClientRect().height) + 'px';
}

function getDescribe(ccode) {

  for (let j in this.subs) {
    if (this.subs[j].ccode == ccode) {
      return this.subs[j].ccode + ' ' + this.subs[j].ccodepath;
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    onDataListPostion(vouchTableScrollY);
  }, 2500);
});
// watch: {
//   'vouchTableScrollY': function(scrollTop) {
//     this.onDataListPostion(scrollTop);
//   },
//   'bodyWidth': function() {
//     this.onDataListPostion(this.vouchTableScrollY);
//   },
watch(chooseIndex, function(newVal) {
  if (newVal == -1) return;
  nextTick(function() {
    let ulHeight = dataList.value.clientHeight;
    let liHeight = dataList.value.getElementsByTagName('LI')[0].clientHeight;
    let activePosY = dataList.value.getElementsByClassName('active')[0].offsetTop + liHeight;
    if ((activePosY - ulHeight) > 0) {
      dataList.value.getElementsByClassName('ulList')[0].scrollTop = activePosY - ulHeight + liHeight - 8;
    } else {
      dataList.value.getElementsByClassName('ulList')[0].scrollTop = 0;
    }
  });
});

function textareaFocus() {
  dataList.value.style.display = 'block';
  onDataListPostion(vouchTableScrollY);
}

function textareaKeyUp() {
  if (chooseIndex.value > 0) chooseIndex.value--;
}

function textareaKeyDown() {
  if (chooseIndex.value < kuaiJiKeMuList.value.length - 1) chooseIndex.value++;
}

function textareaBlur() {
  emit('blur')
  const length=kuaiJiKeMuList.value.filter(item=>textareaVal.value==item.ccode+' '+item.ccodename)
  if(length==0){
    isNotFind.value = true
  }else{
    isNotFind.value = false
  }
  dataList.value.style.display = 'none';
  // nextTick(() => emit('kuaiJiKeMuChange', textareaVal.value));
}

function ulLiClick(kuaiJiKeMu,e) {
  e.preventDefault()
  textareaVal.value = kuaiJiKeMu.ccode + ' ' + kuaiJiKeMu.ccodepath;
  kuaiJiKeMuChange(e)
}

function focus(){
  subInput.value.focus()
}

emit('ref', getCurrentInstance());
</script>
<style src="./column-kuaiJiKeMu.css"></style>
<style>
.isNotFind{
  color:red !important;
}
</style>
