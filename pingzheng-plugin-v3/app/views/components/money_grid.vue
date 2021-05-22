<template>
  <div style="height: 100%;border-bottom: 0;" ref="abc"/>
</template>
<script setup>
import {getCurrentInstance, watch,h, onMounted, ref, render, useContext} from 'vue';

// @ts-nocheck
import './money_grid.css';

const {slots} = useContext();
const abc = ref(null);

const moneyBase = ['百', '十', '亿', '千', '百', '十', '万', '千', '百', '十', '元', '角', '分'];

// 转换金额格式
function formatMoneyAPI(moneyArr) {
  moneyArr = String(moneyArr);
  moneyArr = moneyArr == null ? '' : moneyArr;
  if (moneyArr == 0) moneyArr = '';
  if (moneyArr.split('\.').length > 1 && moneyArr.split('\.')[1] == 0) {
    moneyArr = moneyArr.split('\.')[0];
  }
  moneyArr = String(moneyArr).split('\.');
  if (moneyArr.length > 1) {
    var empty = [];
    if (parseInt(moneyArr[0]) < 0) {
      moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
    }
    var num = moneyArr[0].split('');
    for (let i = 0; i < Object.getOwnPropertyNames(moneyBase).length - 2 - num.length - 1; i++) {
      empty.push('');
    }
    let float = moneyArr[1].split('');
    if (float.length == 1) {
      float.push('0');
    }
    if (float[float.length - 1] == '\n') {
      float.pop();
    }
    moneyArr = empty.concat(num.concat(float));
  } else {
    var empty = [];
    if (parseInt(moneyArr[0]) < 0) {
      moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
    }
    var num = moneyArr[0].split('');
    if (num[num.length - 1] == '\n') {
      num.pop();
    }
    for (let i = 0; i < Object.getOwnPropertyNames(moneyBase).length - 2 - num.length - 1; i++) {
      empty.push('');
    }
    if (!moneyArr[0] == '') {
      num.push('0');
      num.push('0');
    } else {
      num.push('');
      num.push('');
    }
    moneyArr = empty.concat(num);
  }
  return moneyArr;
}

const {emit} = useContext();

function getChineseMoneyGrid(h) {
  const chineseMoneyArr = [
    '百',
    '十',
    '亿',
    '千',
    '百',
    '十',
    '万',
    '千',
    '百',
    '十',
    '元',
    '角',
    '分'
  ];
  const moneyGrid = h('ul',
      {

        class: 'moneyGrid',
        style: 'height:15px;text-align: center;font-size:12px',

      },
      Array.apply(null, {length: 13}).map((row, i) => {
        return h('li', {
          on: {
            click: () => {
              // emit('click', this.$el);
            }
          }
        }, chineseMoneyArr[i]);
      }));
  return moneyGrid;
}
const a=getCurrentInstance()
const bbbbb=() => {
  // setInterval(()=>{
  //   if (slots.default != null) {
  //     console.log(slots.default()[0].children)
  //   }
  // },1000)
  if (slots.default == null) {

    const a=getChineseMoneyGrid(h)
    const b=abc.value

    render(a, b);
    return;
  }
  const text = slots.default()[0].children;
  const moneyArr = (formatMoneyAPI(text));
  console.log(text)
  console.log(moneyArr)
  const isNeg = text < 0;
  render(h('ul',
      {
        // onClick: (e) => {
        //   e
        //   this.showUl = false;
        // },
        class: 'moneyGrid ' + (isNeg ? 'isNeg' : ''),
        style: ' width: 101.04%; position: absolute; top: 0px; z-index: 2; font-size: 20px; font-weight: 700; height: 100%;'
      },
      Array.apply(null, {length: 13}).map((row, i) => {
        return h('li', {
          style: 'line-height: 58px; width: 15px !important;height:100%;float:left',
          click: () => {
            this.$emit('click', this.$el);
          }
        }, moneyArr[i]);
      })), abc.value);
}

onMounted(()=>watch(slots.default,bbbbb,{immediate:true}))
</script>
