<template>
  <div
  >
              <textarea
                  ref="textarea"
                  v-show="showTextEditor"
                  @keydown="checkEnter(event)"
                  @blur="textBlur"
                  class="textx"
                  v-model="moneyInputStr"
                  @input="emitInput"
                  @keyup.enter.stop="textareaEnter"
                  style="box-sizing:border-box;display:none;height:60px !important;line-height: 50px"
              />
    <MoneyGrid v-show="!showTextEditor" @click="focus">
      {{ moneyInputStr }}
    </MoneyGrid>
  </div>
</template>
<script setup>
import {defineProps, getCurrentInstance, nextTick, onBeforeUpdate, onMounted, ref, useContext} from 'vue';
import jquery from 'jquery';
import MoneyGrid from '../table/money_grid.vue'
import {checkEnter} from '../../util/key';
import {toMoneyInputStr} from '../../util/boozjs-lang/money-util';

const props=defineProps(['modelValue'])
const moneyInputStr = ref(props.modelValue);
const showTextEditor = ref(false);
const textarea=ref()

onBeforeUpdate((a,b,c)=>{
})
function focus(e) {
  showTextEditor.value=true
  setTimeout(()=> textarea.value.focus(),100)
}

const {emit, slots} = useContext();
const instance=getCurrentInstance()
// 键盘设置参数
// function keyUpSetValJ(obj, type, code, path) {
//   // parm1 行数 , parm2 属性名  if判断是否借贷框输入
//   if (type == 'moneyInputStr' || type == 'daiMoney') {
//     this.ulShowJ(obj);
//     jquery(obj).hide();
//   } else {
//
//     this.getBalance(jquery(obj).closest('li').find('.balance span'), jquery(obj).attr('money'), jquery(obj).closest('ul').index());
//     this.pingZhengModel.rows[jquery(obj).closest('ul').index()][type + '_num'] = jquery(obj).parent().find('.active').attr('money');
//     this.pingZhengModel.rows[jquery(obj).closest('ul').index()][type] = $.trim(code) + ' ' + $.trim(path);
//     this.ulHide2(obj);
//     if (this.focusTextEditorBan == true) {
//       this.rowFeed(jquery(obj).closest('tr'));
//
//     } else {
//       this.colFeedJ(obj);
//     }
//   }
// }
function textBlur() {
  showTextEditor.value=false
  emit('blur')
}
function emitChange() {
  moneyInputStr.value = moneyInputStr.value == '' ? '0.00' : moneyInputStr.value;
  instance.attrs['onUpdate:modelValue'](moneyInputStr.value)
  emit('money-change',moneyInputStr.value);
}

function emitInput(e) {
  const i='aaa'
  const type='aaa'
  const obj='aaa'
  // 相等功能
  if (e.target.text == '=') {
    props['equals-event']({i, type, obj})
    // handleEqualKey.call(this, {i, type, obj});
    return;
  }

  // 处理金额
  moneyInputStr.value = toMoneyInputStr(moneyInputStr.value, 12);
}

function textareaEnter(e){
  moneyInputStr.value.replace('\n')
  textBlur()
  emitChange()
}


// onMounted(()=>{
//   console.log(instance);
// })
emit('ref',instance)
</script>

