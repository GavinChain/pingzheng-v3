<template>
<!--   凭证表格页 -->
  <div ref="addKmPage" class="addKmPage" style="clear:both;margin:0 auto">
    <div id="choose-box-wrapper4" style="display: none">
      <div class="widget flat radius-bordered" style="padding:0 10px 0;">
        <div  id="helpContent" style="width: 755px;height: 276px;overflow:auto;"/>
      </div>
    </div>
    <div
        class="container"
        :class="isFuZhuHeSuan?'hasCol3':''"
        @keydown=" if($event.ctrlKey == true && $event.keyCode == 83) {event.preventDefault();}"
        @keyup="saveKeyup($event)"
    >

      <ZuoFei v-show="showPingZhengStore.getIsZuoFeiPingZheng"></ZuoFei>
      <ul class="table_head">
        <li class="col-serial title_name">序号</li>
        <li class="col1 title_name">摘要</li>
        <li class="col2 title_name">会计科目</li>
        <li class="col3 title_name" style="padding-top:18px">辅助核算</li>
        <li class="col4"/>
        <li class="col-jie" style="position: relative">
          <div class="title_name">借方金额</div>
          <ul class="moneyGrid" style="height:15px;text-align: center"><MoneyGrid /></ul>
        </li>
        <li class="col-dai" style="position: relative">
          <div class="title_name">贷方金额</div>
          <ul class="moneyGrid" style="height:15px;text-align: center;width:100.95%"><MoneyGrid/></ul>
        </li>
      </ul>
      <div class="voucher-item screen">

        <ul class="table_body" :style="showPingZheng?'pointer-events: none;':''">
          <template   v-for="(row,rowIndex) in pingZhengModelStore.getPingZhengModel.rows">

            <PingzhengRow

                @ref="pingZhengRowsRef[rowIndex]=$event"
                v-model="pingZhengModelStore.getPingZhengModel.rows[rowIndex]"
                :rowIndex="rowIndex"
                @mouseover="pingZhengRowHover[rowIndex]=true"
                @mouseout="pingZhengRowHover[rowIndex]=false"
                @next="rowNext({rowIndex,zhaiYao:row. zhaiYao})"
            ></PingzhengRow>
          </template>



          <li style="clear:both;"/>
        </ul>
      </div>
      <ul
          class="table_sumRow"
          style="margin-top:-1px"
      >
        <li
            class="sumCol"
            style="padding-top: 20px;"
        >
          <span style="font-weight: 600; font-size: 17px;">合计：</span>
          <span
              style="font-size:17px;font-weight: 900"
          >{{ ChineseTotalAmount }}</span>
        </li>
        <li
            class="col-jie"
            style="position: relative"
        >
          <money-grid>{{ jieTotalAmount }}</money-grid>
        </li>
        <li
            class="col-dai"
            style="position: relative"
        >
          <money-grid>{{ daiTotalAmount }}</money-grid>
        </li>
      </ul>
      <div style="clear:both"/>
    </div>
  </div>
</template>
<script setup>
import jquery from 'jquery';
import {computed, nextTick, onBeforeUpdate, onMounted, ref, watch} from 'vue';
// import {moneyHelper} from '../util/boozjs-lang/money-util';
import apiProcess from '../data/data';
import fuZhuHeSuanHelper, {clearFuZhuHeSuan, assignFuZuHeSuan} from '../helper/fu_zhu_he_suan_Helper';
import {convertCurrency} from '../helper/jizhangHelper';
import {fuZhuHeSuanModel} from '../model/pingzheng_model';
import {moneyBase} from '../data/pingzheng';
import FuZhuHeSuanGrid from './table/column-fuZheHeSuan'
import ZuoFei from './components/zuo-fei'
import {usePingZhengModelStoreWidthOut} from '../store/modules/pingZhengModel';
import {useShowPingZhengStoreWidthOut} from '../store/modules/showPingZheng';
import layer from '../util/boozjs-layer/boozjs-layer.es';
const pingZhengModelStore = usePingZhengModelStoreWidthOut();
const showPingZhengStore = useShowPingZhengStoreWidthOut();
import MoneyGrid from './components/money_grid.vue'
import ZhaiYaoGrid from './table/column-zhaiYao.vue'
import KuaiJiKeMuGrid from './table/column-kuaiJiKeMu.vue'
import JieMoneyGrid from './table/column-money-grid.vue'
import DaiMoneyGrid from './table/column-money-grid.vue'
import {createPingZhengRowModel} from '../helper/pingzhengHelper';
import {usePingZhengApiWidthOut} from '../store/modules/pingZhengApi';
import {useFuZhuHeSuanStoreWidthOut} from '../store/modules/fuZhuHeSuan';
const pingZhengApiStore=usePingZhengApiWidthOut()
const fuZhuHeSuanMuStore=useFuZhuHeSuanStoreWidthOut()
const pingZhengRowsRef=ref([])
import {toMoneyStr2} from '../util/boozjs-lang/money-util';
// import {apiDataCastFuZhuHeSuanModel} from '../../plugins_backup/pingzheng/helper/fu_zhu_he_suan_Helper';
// const pingZhengModel = ref(pingZhengModelStore.getPingZhengModel);
// console.log(pingZhengModel);
const ChineseTotalAmount = ref('零元整');
const jieTotalAmount = ref(5);
const daiTotalAmount = ref(5);
const showPingZheng = computed(() => showPingZhengStore.getShowPingZheng);
import PingzhengRow  from './table/pingzheng-row'
const urlPath="/ysd"
watch(pingZhengModelStore.getPingZhengModel.rows, (newVal) => {
  let thisJieTotalAmount = 0;
  let thisDaiTotalAmount = 0;
  let thisChineseTotalAmount = '';
  for (const i in newVal) {
    // if (newVal[i].kuaiJiKeMuText == null) continue
    // if (this.billSubjectMoneys[newVal[i].kuaiJiKeMuText.split(" ")[0]] == null) {
    //     this.billSubjectMoneys[newVal[i].kuaiJiKeMuText.split(" ")[0]] = {
    //         'j': 0,
    //         'd': 0
    //     }
    // }
    let j = parseFloat(newVal[i].jieMoney);
    let d = parseFloat(newVal[i].daiMoney);
    if (isNaN(j)) j = 0;
    if (isNaN(d)) d = 0;



    // this.billSubjectMoneys[newVal[i].kuaiJiKeMuText.split(" ")[0]]['j'] += parseFloat(j.toFixed(2))
    // this.billSubjectMoneys[newVal[i].kuaiJiKeMuText.split(" ")[0]]['d'] += parseFloat(d.toFixed(2))
    thisJieTotalAmount = accAdd(thisJieTotalAmount, newVal[i].jieMoney);
    formatMoneyAPI(String(thisJieTotalAmount));
    thisDaiTotalAmount = accAdd(thisDaiTotalAmount, newVal[i].daiMoney);
  }
  if (thisJieTotalAmount == 0) {
    thisChineseTotalAmount = '零元整';
  } else if (thisJieTotalAmount != thisDaiTotalAmount) {
    thisChineseTotalAmount = '';
  } else {
    thisChineseTotalAmount = convertCurrency(thisJieTotalAmount);
  }
  jieTotalAmount.value=thisJieTotalAmount
  daiTotalAmount.value=thisDaiTotalAmount
  ChineseTotalAmount.value=thisChineseTotalAmount
}, {immediate: true});
const pingZhengRowHover = pingZhengModelStore.getPingZhengRowHover;

const updatePage = false;
const proprows1 = [];
// 禁止操作借贷金额
const focusTextEditorBan = false;
// 查看页禁止focus
const action = true;
const btn = {
  template: {
    show: false
  }
};
const iyear = '';
const ccc = '没变';
const trBase = '';
const EditorType = '';
const likeStr = ['a', 'b', 'c', 'd'];
const cwSubject = [];
const billSum = 30;
const zdr = '我是制单人';
const billTime = '';
const billSumMoneyJM = '';
const billSumMoneyDM = '';
const abstracts = [];    // 摘要集合
const subs = [{'': 'hello'}];          // 会计科目集合
const billSumMoneyJ = [];
const billSumMoneyD = [];
const vouchTypes = '';   // 凭证类型
const voucherTemplateShow = false;       // 显示凭证模板页
const voucherDraffocusTextEditor = false;           // 显示凭证草稿页
const voucherDrafts = [];
const showPageAddKM = false;              // 显示科目页
const showPage = true;
const isFuZhuHeSuan = computed(()=>{
  return pingZhengModelStore.getPingZhengModel.rows.filter(item=>item.fuZhuHeSuan!=null).length>0
  // // 部门
  // return item.fzDept != null ||
  //     // 个人往来
  //     item.fzEmp != null ||
  //     // 客户
  //     item.fzCustomer != null ||
  //     // 供应商
  //     item.fzSupplier != null ||
  //     // 存货
  //     item.fzCunHuo != null ||
  //     // 项目
  //     item.fzXiangMuMulu != null;
  // const rowListFuZhuHeSuan=pingZhengModelStore.getPingZhengModel.rows
  // const rowFuZhuHeSuanFilter=(row)=>row.fuZhuHeSuan.length!=0
  // return rowListFuZhuHeSuan.filter(rowFuZhuHeSuanFilter).length>0
  // const fuZhuHeSuan=pingZhengModelStore.getRowListFuZhuHeSuan.filter(item => {
  //
  //
  // })
  //   return fuZhuHeSuan.length > 0;
});
const tableWidth = {
  'zhaiYao': 220,
  'kuaiJiKeMuText': 220,
  'jieMoney': 220,
  '贷款方金额': 220
};
const renderSubjectStart = false;
const balanceData = {};
/** 新增科目相关 **/
const dataPageKMAdd = {
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
};
const jici = [];
const billSubjectMoneys = {};
const assist = [];


// ...mapActions([
//   'getDeptList',
//   'getPersonList',
//   'getCustomerList',
//   'getGYList',
//   'getCHList',
//   'getItemList'
// ])

async function castFuZhuHeSuanHtml(row) {
  function take(obj, nameProp) {
    const {[nameProp]: inputValue = null} = obj;
    if (inputValue == null) {
      return null;
    }


    return {key: nameProp, inputValue};
  }

  // const abc=await this.getDeptList()
  const list= [take(row, 'fzDept'),
    take(row, 'fzEmp'),
    take(row, 'fzCustomer'),
    take(row, 'fzSupplier'),
    take(row, 'fzCunHuo'),
    take(row, 'fzXiangMuMulu')
  ]
  const strList=[]
    for(let i=0;i<list.length;i++){
      const item=list[i]
      if(item==null)break
        if (item.key == 'fzDept') {
          let inputValue = '';

          if (item.inputValue != '') {
            const object = await fuZhuHeSuanMuStore.getDeptList().list.filter(option => option.value == item.inputValue)[0];
            inputValue = object.label;

          }
          strList.push(await fuZhuHeSuanMuStore.getDeptList().name + ': ' + inputValue);
        }
        if (item.key == 'fzEmp') {
          let inputValue = '';

          if (item.inputValue != '') {
            inputValue = await fuZhuHeSuanMuStore.getPersonList().list.filter(option => option.value == item.inputValue)[0].label;
          }
          strList.push(await fuZhuHeSuanMuStore.getPersonList().name + ': ' + inputValue);
        }
        if (item.key == 'fzCustomer') {
          let inputValue = '';

          if (item.inputValue != '') {
            inputValue = await fuZhuHeSuanMuStore.getCustomerList().list.filter(option => option.value == item.inputValue)[0].label;
          }
          strList.push(await fuZhuHeSuanMuStore.getCustomerList().name + ': ' + inputValue);
        }
        if (item.key == 'fzSupplier') {
          let inputValue = '';

          if (item.inputValue != '') {
            inputValue = await fuZhuHeSuanMuStore.getGYList().list.filter(option => option.value == item.inputValue)[0].label;
          }
          strList.push(await fuZhuHeSuanMuStore.getGYList().name + ': ' + inputValue);
        }
        if (item.key == 'fzCunHuo') {
          let inputValue = '';

          if (item.inputValue != '') {
            inputValue = await fuZhuHeSuanMuStore.getCHList().list.filter(option => option.value == item.inputValue)[0].label;
          }
          strList.push(await fuZhuHeSuanMuStore.getCHList().name + ': ' + inputValue);
        }
        if (item.key == 'fzXiangMuMulu') {
          let inputValue = '';

          if (item.inputValue != '') {
            inputValue = await fuZhuHeSuanMuStore.getItemList().list.filter(option => option.value == item.inputValue)[0].label;
          }
          strList.push(await fuZhuHeSuanMuStore.getItemList().name + ': ' + inputValue);
        }
    }
      return strList.join('<br>');
}

async function fuZhuHeSuanHandle(rowData,fuZhuHeSuan) {
  const {queryCcodeInfo}=pingZhengApiStore
  clearFuZhuHeSuan(fuZhuHeSuan);
  const year=pingZhengModelStore.getPingZhengModel.props.date.split('-')[0]
  const kuaiJiKeMuCode=rowData.kuaiJiKeMuCode
  // const rowDatafuZhuHeSuanColumnsApiData = await queryCcodeInfo({year,kuaiJiKeMuCode});

  // 合并当前行辅助核算
  // assignFuZuHeSuan(rowData,rowDatafuZhuHeSuanColumnsApiData)
}

// 借贷余额计算
function jsye(type, val) {
  const _this = this;
  let money = 0;
  if (type == 0) {    //借
    for (const i in _this.pingZhengModel.rows) {
      if (_this.pingZhengModel.rows[i].kuaiJiKeMuText == val) {
        const j = _this.pingZhengModel.rows[i].jieMoney;
        const d = _this.pingZhengModel.rows[i].daiMoney;
        money += parseFloat(jquery.trim(j) == '' ? 0 : j);
        money -= parseFloat(jquery.trim(d) == '' ? 0 : d);

      }
    }
  } else {            //贷
    for (const i in _this.pingZhengModel.rows) {
      if (_this.pingZhengModel.rows[i].kuaiJiKeMuText == val) {
        const j = _this.pingZhengModel.rows[i].jieMoney;
        const d = _this.pingZhengModel.rows[i].daiMoney;
        money += parseFloat(jquery.trim(d) == '' ? 0 : d);
        money -= parseFloat(jquery.trim(j) == '' ? 0 : j);
      }
    }
  }
  return money;
}

function listen(event) {
  // al;
  if (event.keyCode === 13) {
    this.send(); // 发送文本
    event.preventDefault(); // 阻止浏览器默认换行操作
    return false;
  }
}

// 查询末级科目余额表
function getBalance(obj, num, i) {
  const _this = this;
  const objs = {
    'requestMap.iyear': _this.iyear,
    'requestMap.ccode': num
  };
  const vmObj = this;
  jquery.ajax({
    type: 'post',
    url: urlPath + '/voucher!queryKMMoney',
    data: objs,
    success: function(res) {
      if (res.map['orgin'] == '1') {
        // _thisye(1, num);
      } else {
        _this.jsye(0, num);

      }
      /*_this.$set(_this.pingZhengModel.rows[i], 'orgin', res.map['orgin'])
      _this.$set(_this.pingZhengModel.rows[i], 'kmye', res.map['money'])*/
      if (parseFloat(res) < 0) {
        jquery(obj).find('span').css('color', 'red');
      } else {
        jquery(obj).find('span').css('color', 'grey');
      }
    },
    error: function(xhr) {
      jquery('body').html(xhr.responseText);
    }
  });
}

// 获取摘要
async function getAbstracts() {
  const {queryAbstracts} = apiProcess();
  const abstracts = await queryAbstracts();
  for (const i in abstracts) {
    abstracts[i].hide = false;
  }
  this.abstracts = abstracts;
}

function renderKMName() {
  this.getSubs();
  for (const i in this.pingZhengModel.rows) {
    if (this.pingZhengModel.rows[i]['kuaiJiKeMuText'] == '') continue;
    const ccode = this.pingZhengModel.rows[i]['kuaiJiKeMuText'].split(' ')[0];
    this.pingZhengModel.rows[i]['kuaiJiKeMuText'] = ccode + ' ' + this.findKMName(ccode);
  }
}

async function keMuListApi({iyear: year, callback}) {
  const {queryKeMuListApi} = apiProcess();
  return await queryKeMuListApi({year});
}

// 获取会计科目
async function getSubs(callback) {
  const iyear = this.iyear.split('-')[0];
  const keMuList = await this.keMuListApi({iyear, callback});
  this.$store.state.keMuList = keMuList;
}

// 获取当前凭证
function getAddVoucherData() {
  const c = this.pingZhengModel.rows;
  const voucherList = [];
  const objs = {
    'jsonRequest': {},
    'msg': ''
  };
  let bol2 = false;
  for (const i in this.pingZhengModel.rows) {
    if (this.pingZhengModel.rows[i].jieMoney == '' && this.pingZhengModel.rows[i].daiMoney == '') {
      continue;
    } else {
      bol2 = true;
      if (this.pingZhengModel.rows[i].zhaiYao == '') {
        objs['msg'] = '摘要不能为空';
        return objs;
      }
      if (this.pingZhengModel.rows[i].kuaiJiKeMuText == undefined || this.pingZhengModel.rows[i].kuaiJiKeMuText == '') {
        objs['msg'] = '科目不能为空';
        return objs;
      }
    }
    const obj = {
      'cdigest': this.pingZhengModel.rows[i].zhaiYao,
      'ccode': this.pingZhengModel.rows[i].kuaiJiKeMuText.split(' ')[0],
      'mc': this.pingZhengModel.rows[i].daiMoney,
      'md': this.pingZhengModel.rows[i].jieMoney,
      'inx': this.pingZhengModel.rows[i].daiMoney,
      // 辅助核算
      'fuZhuHeSuan': this.tableFuZhuHeSuan.rows[i] == null ? '' : this.tableFuZhuHeSuan.rows[i],
      'msg': ''

    };
    voucherList.push(obj);
  }
  if (bol2 == false) {
    objs['msg'] = '未填入数据';
    return objs;
  }
  objs['jsonRequest'] = JSON.stringify(voucherList);
  if (this.billSumMoneyJM != this.billSumMoneyDM) {
    layer.alert('借贷方金额不相等,不能保存');
    return null;
  }
  // if (true) {
  //   const msg = ' ';
  // }
  return objs;
}

function exportData2() {
  const _this = this;
  const c = this.pingZhengModel.rows;
  const voucherList = [];
  const objs = {
    'jsonRequest': {},
    'msg': ''
  };
  let bol2 = false;
  // 检查会计科目
  const kjsubs = JSON.parse(JSON.stringify(this.pingZhengModel.rows));
  /* for(let i in _this.subs){
       if(jquery.trim(_this.subs[i].ccode)=='101115'){
           console.log(_this.subs[i])
           console.log(":::"+kjsubs[3].kuaiJiKeMuText)
       }
   }*/
  for (const i in kjsubs) {
    let bol = false;
    for (const j in _this.subs) {
      if (((_this.subs[j].ccode + ' ' + _this.subs[j].ccodepath) == kjsubs[i].kuaiJiKeMuText) || jquery.trim(kjsubs[i].kuaiJiKeMuText) == '') {
        bol = true;
        break;
      } else {
        console.log(kjsubs[i].kuaiJiKeMuText);
      }
    }
    if (bol == false) {
      objs['msg'] = '会计科目错误,请检查';
      return objs;
    }
  }

  for (const i in this.pingZhengModel.rows) {
    if (this.pingZhengModel.rows[i].jieMoney == '' && this.pingZhengModel.rows[i].daiMoney == '') {
      continue;
    } else {
      bol2 = true;
      if (this.pingZhengModel.rows[i].zhaiYao == '') {
        objs['msg'] = '摘要不能为空';
        return objs;
      }

      //debugger
      if (this.pingZhengModel.rows[i].kuaiJiKeMuText == undefined || this.pingZhengModel.rows[i].kuaiJiKeMuText == '') {

        objs['msg'] = '科目不能为空';
        return objs;
      }
    }
    const obj = {
      'cdigest': this.pingZhengModel.rows[i].zhaiYao,
      'ccode': this.pingZhengModel.rows[i].kuaiJiKeMuText.split(' ')[0],
      'mc': this.pingZhengModel.rows[i].daiMoney,
      'md': this.pingZhengModel.rows[i].jieMoney,
      'inx': this.pingZhengModel.rows[i].daiMoney,
      'msg': ''

    };
    voucherList.push(obj);
  }
  if (bol2 == false) {
    objs['msg'] = '未填入数据';
    return objs;
  }
  objs['jsonRequest'] = JSON.stringify(voucherList);
  if (this.billSumMoneyJM != this.billSumMoneyDM) {
    layer.alert('借贷方金额不相等,不能保存');
    return null;
  }
  // if (true) {
  //   msg = ' ';
  // }
  return objs;
}

// 检查金额
function jieDaiInputHandle(i, type, obj) {
  const row = this.pingZhengModel.rows[i];
  const inputValue = this.pingZhengModel.rows[i][type];

  // 相等功能
  if (inputValue == '=') {
    // handleEqualKey.call(this, {i, type, obj});
    return;
  }

  // 处理金额
  // this.pingZhengModel.rows[i][type] = toMoneyInputStr(this.pingZhengModel.rows[i][type], 12);
}
const jGrid=ref([])
const dGrid=ref([])
const zhaiYaoGrid=ref([])
const kuaiJiKeMuGrid=ref([])
const fuZheHeSuanGrid=ref([])

// // 确保在每次变更之前重置引用
// onBeforeUpdate(()=>{
//   zhaiYaoGrid.value = [];
//   kuaiJiKeMuGrid.value = [];
// })

function focusJieGrid(rowIndex) {
  this.focusTextEditor(this.$refs['jGrid' + (rowIndex - 1)][0].parentElement);
}

function focusKuaiJiKeMuGrid(rowIndex) {
  kuaiJiKeMuGrid.value[rowIndex].setupState.focus();
}

function tHide(obj) {
  jquery(obj).hide();
  jquery(obj).closest('td').find('ul').show();
}

function ulShowJ(obj) {
  jquery('#app td .ulX').hide();
  jquery(obj).parent().find('ul').show();
}

// 凭证显示
function pingzhengUlShow(obj) {
  jquery('#app td .ulX').hide();
  jquery(obj).parent().find('ul').show();
  jquery(obj).parent().find('ul>li').removeClass('active');
  jquery(obj).parent().find('ul>li:first').toggleClass('active');
}

function ulShowD(obj) {
  jquery('#app td .ulX').hide();
  jquery(obj).parent().find('ul').show();
}

function kjkmUlShow(obj) {
  jquery(obj).closest('td').find('ul:first').css('top', (jquery(obj).parent().offset().top + jquery(obj).parent().height()) + 'px');
  jquery(obj).closest('td').find('ul:first').css('left', jquery(obj).parent().offset().left + 'px');
  jquery(obj).closest('td').find('ul:eq(1)').css('top', (jquery(obj).parent().offset().top + jquery(obj).parent().height() + 200) + 'px');
  jquery(obj).closest('td').find('ul:eq(1)').css('left', jquery(obj).parent().offset().left + 'px');
  this.subFindSrowsAPI('');
  jquery('#app td .ulX').hide();
  console.log(jquery(obj).parent().find('ul').size());
  jquery(obj).parent().find('ul').show();
  jquery(obj).parent().find('ul').each(function() {
    console.log(jquery(this).css('display'));

  });
  jquery(obj).parent().find('ul>li').removeClass('active');
  jquery(obj).parent().find('ul>li:first').toggleClass('active');

}

function hintForAbstract(obj) {
  // jquery(obj).attr("placeholder",'摘要列表:"ctrl+x"键')
}

function ulShow(obj) {
  this.subFindSrowsAPI('');
  jquery('#app td .ulX').hide();
  jquery(obj).parent().find('ul').show();
  jquery(obj).parent().find('ul>li').removeClass('active');
  jquery(obj).parent().find('ul>li:first').toggleClass('active');
}

function ulHide(obj) {
  jquery(obj).attr('placeholder', '');
  setTimeout(function() {
    jquery(obj).closest('td').find('ul').hide();
  }, 250);
}

function ulHide2(obj) {
  jquery(obj).closest('td').find('ul').hide();
}



function setItemRef(el){
  console.log(el);
}
// 键盘设置参数
function keyUpSetVal(obj, type) {
  // parm1 行数 , parm2 属性名  if判断是否借贷框输入
  if (type == 'jieMoney' || type == 'daiMoney') {
    this.ulShowJ(obj);
    jquery(obj).hide();
  } else {
    this.pingZhengModel.rows[jquery(obj).closest('tr').index()][type] = jquery.trim(jquery(obj).text());
    this.ulHide(obj);
    this.colFeed(obj);
  }
}

function textareaEnter(obj, type) {
  if (jquery.trim(jquery(obj).next().find('.active').text()) == '') {
    //this.pingZhengModel.rows[jquery(obj).closest("tr").index()][type] = jquery.trim(jquery(obj).next().find(".active").text())
  } else {
    this.pingZhengModel.rows[jquery(obj).closest('tr').index()][type] = jquery.trim(jquery(obj).next().find('.active').text());
  }
  jquery(obj).next().hide();
  /*setTimeout(function () {
      vueObj.colFeed(obj)
  }, 100)*/
}

function textareaEnter2(obj, type, event) {
  if (jquery(obj).next().css('display') == 'block') {
    this.pingZhengModel.rows[jquery(obj).closest('tr').index()][type] = jquery.trim(jquery(obj).next().find('.active').attr('ccode')) + ' ' + jquery.trim(jquery(obj).next().find('.active').attr('ccodepath'));
    this.pingZhengModel.rows[jquery(obj).closest('tr').index()][type + '_num'] = jquery(obj).next().find('.active').attr('money');
  }
  jquery(obj).val(jquery(obj).val().replace('\n', ''));
  this.getBalance(jquery(obj).closest('td').find('.balance span'), jquery(obj).next().find('.active').attr('money'), jquery(obj).closest('tr').index());
  jquery(obj).closest('td').find('ul').hide();
  if (this.focusTextEditorBan == true) {
    this.rowFeed(jquery(obj).closest('tr'));

  } else {
    this.colFeedJ(obj);
  }
}

function lineFeed(lineNum, abstractVal) {
  if (this.$refs['abstractGrid' + (lineNum + 1)] == null) {
    this.addTr(lineNum);
  }
  this.$nextTick(function() {
    this.$refs['abstractGrid' + (lineNum + 1)][0].enter(abstractVal);
    if (this.billSumMoneyJM > this.billSumMoneyDM) {
      if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
        this.$nextTick(function() {
          const obj = jquery(this.$refs['dGrid' + (lineNum + 1)][0]);
          this.clearLeftVal(obj);
          this.rowsWatch(this.pingZhengModel.rows);
          this.pingZhengModel.rows[lineNum + 1].daiMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
          this.pingZhengModel.rows[lineNum + 1]['daiMoney1'] = this.formatMoneyAPI(this.pingZhengModel.rows[lineNum + 1].daiMoney == 0 ? '' : this.pingZhengModel.rows[lineNum + 1].daiMoney);
          this.rowsWatch(this.pingZhengModel.rows);

        });
      }
    } else {
      if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
        this.$nextTick(function() {
          const obj = jquery(this.$refs['jGrid' + (lineNum + 1)][0]);
          this.clearRightVal(obj);
          this.rowsWatch(this.pingZhengModel.rows);
          this.pingZhengModel.rows[lineNum + 1].jieMoney = this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM);
          this.pingZhengModel.rows[lineNum + 1]['jieMoney1'] = this.formatMoneyAPI(this.pingZhengModel.rows[lineNum + 1].jieMoney == 0 ? '' : this.pingZhengModel.rows[lineNum + 1].jieMoney);
          this.rowsWatch(this.pingZhengModel.rows);
        });

      }
    }
    this.rowsWatch(this.pingZhengModel.rows);
  });
}

// 上下键选择列表
function ulKeyup(point, obj) {
  // 初始位置
  if (jquery(obj).parent().find('.active').length == 0) {
    jquery('td>li').removeClass('active');
    jquery(obj).parent().find('li:first').toggleClass('active');
    return;
  }
  if (point == 'up') {
    if (jquery(obj).parent().find('.active').index() != 0) {
      const temp = jquery(obj).parent().find('.active');
      jquery(obj).parent().find('.active').prev().addClass('active');
      temp.removeClass('active');
    }
  } else if (point == 'down') {
    if (jquery(obj).parent().find('.active').index() + 1 != jquery(obj).parent().find('li').length) {
      const temp = jquery(obj).parent().find('.active');
      jquery(obj).parent().find('.active').next().addClass('active');
      temp.removeClass('active');
    }
  }
  const objPointerHeight = jquery(obj).parent().find('.active')[0].offsetTop;
  const objHeight = jquery(obj).parent().find('.active').outerHeight();
  if (objPointerHeight - 3 > objHeight * 4) {
    jquery(obj).closest('td').find('ul').scrollTop(objPointerHeight - objHeight * 4);
  }
}

function openAddSubjectPage(tr, obj) {
  const _this = this;
  this.showPageAddKM = true;
  this.$nextTick(function() {
    setTimeout(function() {
      _this.$refs['chooseKM'].click();
    });
  });
  this.dataPageKMAdd.exportData.obj = tr;
  this.dataPageKMAdd.exportData.dom = obj;
}

function addKMTopChoose(target) {
  if (target._value.trim() == '') {
    return;
  }
  const _this = this;
  const fireOnThis = _this.$refs['kmToplist'].firstElementChild;
  const evObj = document.createEvent('MouseEvents');
  evObj.initMouseEvent('mousedown', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
  fireOnThis.dispatchEvent(evObj);
}

// 换格
function colFeed(obj) {
  if (jquery(obj).closest('td').index() + 1 != jquery(obj).closest('tr').find('td').length) {
    this.focusTextEditor(jquery(obj).closest('td').next());
    jquery(obj).closest('td').next().find('textarea').focus();
    if (jquery.trim(jquery(obj).closest('td').next().find('textarea').val()) == '') {
      this.kjkmUlShow(jquery(obj).closest('td').next().find('textarea'));
      jquery(obj).closest('td').next().find('ul').show();
      jquery(obj).closest('td').next().find('ul>li:first').addClass('active');
    }
  } else {  // 没有下格换行
    this.rowFeed(jquery(obj).closest('tr'));
  }
}

// 借方换格
function colFeedJ(obj) {
  if (jquery(obj).closest('li').index() + 1 != jquery(obj).closest('ul').find('>td').length) {
    this.focusTextEditor(jquery(obj).closest('li').next());
    setTimeout(function() {
      jquery(obj).closest('li').next().find('ul').css('display', 'none');
      jquery(obj).closest('li').next().find('textarea').show();
      jquery(obj).closest('li').next().find('textarea').focus();
      jquery(obj).closest('li').next().find('ul').hide();
    }, 200);
  } else {  // 没有下格换行
    this.rowFeed(jquery(obj).closest('ul'));
  }
}

// 贷方换格
function colFeedD(obj, i) {
  const vueObj = this;
  this.rowFeed(jquery(obj).closest('tr'));
  if (this.billSumMoneyJM > this.billSumMoneyDM) {
    if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
      this.$nextTick(function() {
        const o = jquery(obj).closest('tr').next().find('td:last>textarea');
        this.pingZhengModel.rows[i + 1].daiMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
        o.val(this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM));
        vueObj.formatMoney(o, 'daiMoney');
      });


    }
  } else {
    if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
      this.$nextTick(function() {
        const o = jquery(obj).closest('tr').next().find('td:eq(-2)>textarea');
        this.pingZhengModel.rows[i + 1].jieMoney = this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM);
        o.val(this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM));
        vueObj.formatMoney(o, 'jieMoney');
      });

    }
  }
}

// 自动填借贷金额
function selfMotionNum(i) {
  if (this.pingZhengModel.rows[i + 1].daiMoney == '' && this.pingZhengModel.rows[i + 1].jieMoney == '') {
    if ((this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM)) >= 0) {
      for (const j in this.pingZhengModel.rows[i + 1]['jieMoney1']) {
        this.pingZhengModel.rows[i + 1]['jieMoney1'][j] = '';
      }
      this.pingZhengModel.rows[i + 1].jieMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
    } else {
      for (const j in this.pingZhengModel.rows[i + 1]['daiMoney1']) {
        this.pingZhengModel.rows[i + 1]['daiMoney1'][j] = '';
      }
      this.pingZhengModel.rows[i + 1].daiMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
    }
  }
}

// 没有下一行新增一行
function rowFeed(obj) {
  if (jquery(obj).index() + 1 == jquery(obj).closest('ul').find('ul').length) {
    this.pingZhengModel.rows.push(createPingZhengRowModel({
      zhaiYao: '',
      kuaiJiKeMuCode: '',
      jieMoney: '0.00',
      daiMoney: '0.00'
    }));
    this.$nextTick(function() {
      jquery('#app tbody>tr:eq(-2)>td:first>textarea').focus();
      this.rowFeedInit(jquery(obj).index());
    });
  } else {
    this.rowFeedInit(jquery(obj).index());
    jquery(obj).closest('ul').next().find('td:first>textarea').focus();
    jquery(obj).closest('ul').addClass('trFocusColor');
    jquery('.voucher-item').scrollTop(jquery('.voucher-item')[0].scrollHeight - jquery('.voucher-item').height());
  }
  setTimeout(function() {
    jquery('.voucher-item').scrollTop(jquery('.voucher-item')[0].scrollHeight);
  }, 100);
}

// 换行后执行的方法
function rowFeedInit(i) {
  // 复制上一行摘要
  this.pingZhengModel.rows[i + 1].zhaiYao = this.pingZhengModel.rows[i].zhaiYao;
}

// 转换金额格式
function formatMoney(obj, type) {
  // let moneyArr = this.formatMoneyAPI(jquery(obj).val() == 0 ? "" : jquery(obj).val());
  // this.pingZhengModel.rows[jquery(obj).closest("ul").index()][type + "1"] = moneyArr;

}

// 摘要列表
function abstractUl(obj) {
  if (jquery(obj).closest('td').find('ul').css('display') == 'none') {
    this.abstractFindSrows(obj);
  } else {
    jquery(obj).closest('td').find('ul').hide();
  }
}

// 转换金额格式
function formatMoneyAPI(moneyArr) {
  moneyArr = String(moneyArr);
  moneyArr = moneyArr == null ? '' : moneyArr;
  if (moneyArr == 0) moneyArr = '';
  if (moneyArr.split('.').length > 1 && moneyArr.split('.')[1] == 0) {
    moneyArr = moneyArr.split('.')[0];
  }
  moneyArr = String(moneyArr).split('.');
  if (moneyArr.length > 1) {
    let empty = [];
    if (parseInt(moneyArr[0]) < 0) {
      moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
    }
    let num = moneyArr[0].split('');
    for (let i = 0; i < Object.getOwnPropertyNames(moneyBase).length - 2 - num.length - 1; i++) {
      empty.push('');
    }
    const float = moneyArr[1].split('');
    if (float.length == 1) {
      float.push('0');
    }
    if (float[float.length - 1] == '\n') {
      float.pop();
    }
    moneyArr = empty.concat(num.concat(float));
  } else {
    let empty = [];
    if (parseInt(moneyArr[0]) < 0) {
      moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
    }
    let num = moneyArr[0].split('');
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

// 清除借方金额
function clearLeftVal(obj) {
  jquery(obj).closest('li').prev().find('textarea').hide();
  this.pingZhengModel.rows[jquery(obj).closest('ul').index()].jieMoney = toMoneyStr2(0);
}
const pingZhengModel=pingZhengModelStore.getPingZhengModel
// 清除贷方金额
function clearRightVal(obj) {
  pingZhengModel.rows
  jquery(obj).closest('li').next().find('textarea').hide();

  this.pingZhengModel.rows[jquery(obj).closest('ul').index()].daiMoney = toMoneyStr2('0');
}

// 合计
function billSumMoneyMet() {
  // let sum = 0;
  // for (const tr in this.pingZhengModel.rows) {
  //   sum += row.jieMoney + row.daiMoney;
  // }
}

//减法函数
function Subtr(arg1, arg2) {

  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns {Number}
 */
function accAdd(arg1, arg2) {
  let r1, r2, m, c;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    const cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}

function kjkmUlHide(obj) {
  this.subFindSrowsAPI('');
  this.$nextTick(function() {
    jquery(obj).closest('td').find('ul').hide();
  });
}

// 摘要模糊查询
function abstractFindSrows(obj) {
  jquery(obj).val(jquery(obj).val().replace('\n', ''));
  const arr = [];
  let bol = false;
  for (const i in this.abstracts) {
    if (jquery.trim(jquery(obj).val()) == '') {
      bol = true;
      this.abstracts[i].hide = false;
      continue;
    }
    if (this.abstracts[i].accabname.split(jquery.trim(jquery(obj).val())).length > 1) {
      this.abstracts[i].hide = false;
      bol = true;
    } else {

      this.abstracts[i].hide = true;
    }
  }
  if (bol) {
    jquery(obj).closest('td').find('ul').show();
  } else {
    jquery(obj).closest('td').find('ul').hide();
  }
}

// 会计科目模糊查询
function subFindSrows(obj) {
  jquery(obj).closest('td').find('.balance span').text('');
  jquery(obj).removeAttr('num');
  jquery(obj).val(jquery(obj).val().replace('\n', ''));
  const arr = [];
  this.subFindSrowsAPI(jquery.trim(jquery(obj).val()));
  setTimeout(function() {
    jquery(obj).closest('td').find('ul').show();
    jquery(obj).closest('td').find('ul>li').removeClass('active');
    jquery(obj).closest('td').find('ul>li:first').addClass('active');
  }, 550);
}

// 会计科目模糊查询Api
function subFindSrowsAPI(val) {
  for (const i in this.subs) {
    if (val == '') {
      this.subs[i].hide = false;
      continue;
    }
    if (this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 1 || this.subs[i].ccodename.split(val).length > 1 || (jquery.trim(this.subs[i].ccode) + ' ' + jquery.trim(this.subs[i].ccodepath)).split(val).length > 1) {
      this.subs[i].hide = false;
    } else if (this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 2 || jquery.trim(this.subs[i].ccode) + ' ' + jquery.trim(this.subs[i].ccodepath) == val) {
      this.subs[i].hide = false;
    } else {
      this.subs[i].hide = true;
    }
  }
}

function findSrows(arr, like) {
  const likeArr = [];
  for (const a in arr) {
    if (a.split(like).length > 1) {
      likeArr.push(a);
    }
  }
  return likeArr;
}

function checkKJKMData(obj, ix) {
  const vueObj = this;
  this.$nextTick(function() {
    let bol = false;
    for (const i in vueObj.subs) {
      if ((vueObj.subs[i].ccode + ' ' + vueObj.subs[i].ccodepath) == jquery(obj).val()) {
        bol = true;
      }
    }
    if (!bol) {
      vueObj.rows[ix]['kuaiJiKeMuText'] = '';
    }
  });
  jquery(obj).closest('td').find('ul').hide();
}

function addTr(i) {

  this.assist.splice(i + 1, 0, {});
  this.pingZhengModel.rows.push(createPingZhengRowModel({
    zhaiYao: '',
    kuaiJiKeMuCode: '',
    jieMoney: '0.00',
    daiMoney: '0.00'
  }));
  // setTimeout(function () {
  //     jquery(".voucher-item").scrollTop(jquery(".voucher-item")[0].scrollHeight);
  // }, 100)
}

function insertTr(i) {
  pingZhengModelStore.getPingZhengModel.rows.splice(i, 0, createPingZhengRowModel({
    zhaiYao: '',
    kuaiJiKeMuCode: '',
    jieMoney: '0.00',
    daiMoney: '0.00'
  }));

  // this.assist.splice(i + 1, 0, {})
  // this.pingZhengModel.rows.splice(i + 1, 0, JSON.parse(JSON.stringify(_trBase)));
  // this.pingZhengModel.rows[i + 1] = this.pingZhengModel.rows[i]
  // this.pingZhengModel.rows[i] = JSON.parse(JSON.stringify(_trBase))
  // this.assist[i + 1] = this.assist[i]
  // this.assist[i] = {}
  // setTimeout(function () {
  //     jquery(".voucher-item").scrollTop(jquery(".voucher-item")[0].scrollHeight);
  // }, 100)
}

function delTr(i) {
  const {rows}=pingZhengModelStore.getPingZhengModel
  if(rows.length>4){
    rows.splice(i, 1);
  }
  // this.assist.splice(i, 1);
  // if (this.pingZhengModel.rows.length < 4) {
  //   const obj = JSON.parse(JSON.stringify(this.pingZhengModel.rows[0]));
  //   obj.zhaiYao = '';
  //   obj.kuaiJiKeMuText = '';
  //   obj.jieMoney = toMoney(0);
  //   obj.daiMoney = toMoneyStr2(0);
  //   this.pingZhengModel.rows.push(obj);
  //   this.jdRenderUl();
  // }
  // this.proprowsWatch(this.pingZhengModel.rows, this.pingZhengModel.rows);
}

// function trBeShow(i) {
//   for (const j in this.pingZhengModel.rows) {
//     this.trBeHide(j);
//   }
//   this.pingZhengModel.rows[i].showTrBe = true;
//   this.$set(this.pingZhengModel.rows, i, this.pingZhengModel.rows[i]);
// }
//
// function trBeHide(i) {
//   this.pingZhengModel.rows[i].showTrBe = null;
//   this.$set(this.pingZhengModel.rows, i, this.pingZhengModel.rows[i]);
// }


// 借贷手动渲染
function jdRenderUl() {
  this.rowsWatch(this.pingZhengModel.rows);
  for (const i in this.pingZhengModel.rows) {
    if (this.pingZhengModel.rows[i].jieMoney == 0) this.pingZhengModel.rows[i].jieMoney = toMoneyStr2(0);
    if (this.pingZhengModel.rows[i].daiMoney == 0) this.pingZhengModel.rows[i].daiMoney = toMoneyStr2(0);

  }
}

function findKMName(ccode) {
  this.getSubs();
  for (const i in this.subs) {
    if (ccode == this.subs[i].ccode) {
      return this.subs[i].ccodename;
    }
  }
}

// 设置数据
function setData(data) {
  this.getSubs();
  const rows = [];
  for (const i in data) {
    const tr = {
      'zhaiYao': data[i]['zhaiYao'],
      'kuaiJiKeMuText': data[i]['kuaiJiKeMuText'] + ' ' + this.findKMName(data[i]['kuaiJiKeMuText']),
      'jieMoney': data[i].jieMoney,
      'daiMoney': data[i].daiMoney,
      'money': '',
      'orgin': '',
    };
    rows.push(tr);
  }
  if (rows.length < 4) {
    for (let i = 0; i <= 4 - rows.length; i++) {
      rows.push({
        'zhaiYao': '',
        'kuaiJiKeMuText': '',
        'jieMoney': toMoneyStr2(0),
        'daiMoney': toMoneyStr2(0)
      });
    }
  }
  this.pingZhengModel.rows = rows;

  this.proprows1 = rows;
  this.renderKMName();
  this.jdRenderUl(); // 渲染数据
}

// 补空数据
function supplementrows() {
  if (this.pingZhengModel.rows.length < 4) {
    for (let i = 0; i <= 4 - this.pingZhengModel.rows.length; i++) {
      this.pingZhengModel.rows.push({
        'zhaiYao': '',
        'kuaiJiKeMuText': '',
        'jieMoney': toMoneyStr2(0),
        'daiMoney': toMoneyStr2(0)
      });
    }
    this.jdRenderUl(this.pingZhengModel.rows);
  }
}

function checkJD() {
  if (this.billSumMoneyJM != this.billSumMoneyDM) {
    this.$parent.$parent.popupPage = null;
    layer.alert('错误,借贷方不相等');
  }
}

// 手动渲染会计科目
function renderSubject() {
  for (const rowsI in this.pingZhengModel.rows) {
    for (const subI in this.subs) {
      if (this.subs[subI].ccode == this.pingZhengModel.rows[rowsI]['kuaiJiKeMuText']) {
        this.pingZhengModel.rows[rowsI].kuaiJiKeMuText = this.subs[subI].ccode + ' ' + this.subs[subI].ccodename;
        this.getBalance(jquery('#voucherBill tr:eq(' + rowsI + ')>td:eq(1)').find('.balance span'), this.subs[subI].ccode, rowsI);
      }
    }
  }
}

function kmSelectChoose() {
  jquery('.selectChoose').on('click', function() {
    jquery(this).find('ul').toggle();
  });
  jquery('.selectChoose button').on('blur', function() {
    const _this = this;
    setTimeout(function() {
      jquery(_this).closest('div').find('ul').hide();
    }, 100);
  });
  jquery('.selectChoose').on('mouseleave', function() {
    const _this = this;
    setTimeout(function() {
      jquery(_this).find('ul').hide();
    }, 100);
  });
}

// 查询所有科目
function queryKM(data) {
  /*let _this = this;
  let iyear;
  jquery.ajax({
      type: 'post',

      url: urlPath + '/voucher!queryKM',
      data: {
          'requestMap.like': jquery.trim(data.like),
          'requestMap.iyear': _this.iyear.split("-")[0]
      },
      async: false,
      success: function (res) {
          _this.dataPageKMAdd.topNameList = res.list
      },
      error: function (xhr) {
          jquery('body').html(xhr.responseText)
      }
  });*/
}

function clearAddKMData() {
  this.dataPageKMAdd = {
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
      obj: {}
    }
  };
  this.queryKM(this.dataPageKMAdd.queryData);

}

function backkm(obj) {
  jquery(obj).closest('td').find('textarea').click();
}

function kmulShow(obj) {
  jquery(obj).next().show();
}

function kmulShow1(obj) {
  jquery(obj).next().toggle();
}

function kmulHide(obj) {
  jquery(obj).closest('.selectChoose').find('ul').hide();
}

function chooseTopKM(obj, topObj) {
  const ordervalue = this.jici[0].ordervalue;
  let aaa = 0;
  for (let i = 0; i < ordervalue.split("-").length; i++) {
    aaa = aaa + parseInt(ordervalue.split('-')[i]);
  }
  this.kmulHide(obj);
  let bol = false;
  //增加之前检查是否有期初、本期发生
  jquery.ajaxSettings.async = false;
  jquery.post(urlPath + '/findSubjectType!findByCode', {
    year: this.iyear,
    ccodeNum: topObj.ccode
  }, function(list) {
    console.log(list[0].md_d + '>>' + list[0].md_j + '>>' + list[0].yearf_d + '>>' + list[0].yearf_j);
    if ((parseFloat(list[0].md_d) != 0 || parseFloat(list[0].md_j) != 0) && (parseFloat(list[0].yearf_d) != 0 || parseFloat(list[0].yearf_j) != 0)) {
      layer.open({
        type: 1,
        content: '此科目已做期初或本期发生。不能增加下级科目！',
        btn: ['确定'],
        success: function(layero, index) {
          this.escQuit = function(event) {
            if (event.keyCode === 0x1B) {
              layer.close(index);
              console.log('peace and love');
              return false; //阻止系统默认回车事件
            }
          };
          jquery(document).on('keydown', this.escQuit); //监听键盘事件
        },
        end: function() {
          jquery(document).off('keydown', this.escQuit); //解除键盘事件
        }
      });
      bol = true;
    } else {
      // if (parseInt(topObj.ccode.length) < parseInt(aaa)) {
      // } else {
      //   layer.alert('已超出科目编码规则,请前往设置中心进行调整');
      //   bol = true;
      // }
    }
  });
  jquery.ajaxSettings.async = true;
  if (bol) {
    this.dataPageKMAdd.queryData.like = '';
    return;
  }
  this.dataPageKMAdd.addData.year = this.iyear;
  this.$set(this.$store.state, 'addvouchPageIyear', this.iyear);
  this.dataPageKMAdd.addData.igradeNum = parseInt(topObj.igrade) + 1;
  this.dataPageKMAdd.addData.cclass = topObj.cclass;
  this.dataPageKMAdd.addData.bproperty = topObj.bproperty;
  this.dataPageKMAdd.queryData.like = topObj.ccode + ' ' + topObj.ccodename;
  this.dataPageKMAdd.addData.num = topObj.ccode;
  this.dataPageKMAdd.addData.topName = topObj.ccodename;
  this.queryKMMaxNum();
  const _this = this;
  setTimeout(function() {
    _this.$refs['KMNameInput'].focus();
  });
}

function scrollChange(obj) {
  this.$set(this.$store.state, 'vouchTableScrollY', obj.scrollTop);
}

function proprowsWatch(newVal, oldName) {
  this.pingZhengModel.rows = newVal;
  for (const i in this.pingZhengModel.rows) {
    if (this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuText'].split(' ')[0]] == null) {
      this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuText'].split(' ')[0]] = {
        'j': 0,
        'd': 0
      };
    }
    if (this.pingZhengModel.rows[i]['assist'] != null) {
      this.assist[i] = {};
      if (this.pingZhengModel.rows[i]['assist']['部门'] != null) this.assist[i]['部门'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['部门']);
      if (this.pingZhengModel.rows[i]['assist']['个人往来'] != null) this.assist[i]['个人往来'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['个人往来']);
      if (this.pingZhengModel.rows[i]['assist']['客户'] != null) this.assist[i]['客户'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['客户']);
      if (this.pingZhengModel.rows[i]['assist']['供应商'] != null) this.assist[i]['供应商'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['供应商']);
      if (this.pingZhengModel.rows[i]['assist']['项目'] != null) this.assist[i]['项目'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['项目']);
      if (this.pingZhengModel.rows[i]['assist']['存货'] != null) this.assist[i]['存货'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['存货']);
    }
    this.$set(this.assist, i, this.assist[i]);
    this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuText'].split(' ')[0]]['j'] += this.pingZhengModel.rows[i].jieMoney;
    this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuText'].split(' ')[0]]['d'] += this.pingZhengModel.rows[i].daiMoney;
    if (this.pingZhengModel.rows.orgin == undefined) this.pingZhengModel.rows[i].orgin = '';
    if (this.pingZhengModel.rows.money == undefined) this.pingZhengModel.rows[i].money = '';

    if (jquery.trim(this.pingZhengModel.rows[i].zhaiYao) != '' || jquery.trim(this.pingZhengModel.rows[i].kuaiJiKeMuText) != '') {
      this.getBalance(jquery('#voucherBill tbody tr:eq(' + i + ') td:eq(1) ul'), this.rows[i].kuaiJiKeMuText.split(' ')[0], i);
    }
    this.pingZhengModel.rowsWatch(this.pingZhengModel.rows);

  }
}
function zhaiYaoChange(i,$event){

  focusKuaiJiKeMuGrid(i)
  pingZhengModelStore.commitRowZhaiYao({rowIndex:i,zhaiYao:$event})
}
function saveKeyup(e) {

  e.preventDefault();
  var currKey = 0;
  currKey = e.keyCode || e.which || e.charCode;
  if (currKey == 83 && (e.ctrlKey || e.metaKey)) {
    this.$store.state.saveNewPingZhengAndContinue();
    return false;
  }
}

function rowFuZhuHeSuanModelSsFuZhuHeSuan(rowFuZhuHeSuanModel) {
  let isFuZheHeSuan = false;
  Object.keys(rowFuZhuHeSuanModel).forEach(key => {
    if (rowFuZhuHeSuanModel[key] != null) {
      isFuZheHeSuan = true;
    }
  });
  return isFuZheHeSuan;
}

function focusJieMoneyGrid(rowIndex) {
  jGrid.value[rowIndex].setupState.focus();
  // setTimeout(function() {
  //   target.style.display='block'
  //   setTimeout(function() {
  //     target.focus()
  //   }, 500);
  //   target.select()
  //   source.target.style.display='none'
  // });
}
const fuZhuHeSuanHtml=ref([])
function focusFuZhuHeSuan(rowIndex) {

  // fuZhuHeSuanHtml.value[rowIndex].vnode.el.click();
}
async function kuaiJiKeMuChange(row, kuaiJiKeMuText) {
  // row.data['kuaiJiKeMuText'] = kuaiJiKeMuText;
  // row.data['kuaiJiKeMuCode'] = kuaiJiKeMuText.split(' ')[0];
  // await fuZhuHeSuanHandle(row.data,row.fuZhuHeSuan);
  // const rowFuZhuHeSuanModel = fuZhuHeSuanModel(row.fuZhuHeSuan);
  // rowFuZhuHeSuanModelSsFuZhuHeSuan(rowFuZhuHeSuanModel) ? row.focusFuZhuHeSuan() : focusJieMoneyGrid(rowIndex);
}

function jieMoneyGridChange(){

}

function addRowButton(i){
  insertTr(i)
  // setTimeout(function(){trBeShow(i)}.bind(this))
}
function deleteRowButton(i){
  delTr(i)
  // trBeHide(i)
  // trBeShow(i+1)
  // insertTr(i)
  // setTimeout(function(){trBeShow(i)}.bind(this))
}

// watch(pingZhengModelStore.getPingZhengModel,()=>pingZhengModelStore.syncRowListFuZhuHeSuanHtml().then(),{deep:true,immediate:true})

watch(pingZhengModelStore.getPingZhengModel,()=>pingZhengModelStore.syncRowListHover(),{immediate:true})


function kuaiJiKeMuChangeBlur(i){
  // setTimeout(()=>{
  //   if(pingZhengModelStore.getRowListFuZhuHeSuan[i]!=0){
  //     fuZheHeSuanGrid.value[i].setupState.focus()
  //   }
  // },500)

}
async function rowNext({rowIndex,zhaiYao}){
  if(pingZhengRowsRef.value[rowIndex+1]==null){
    pingZhengModelStore.createRow()
    await nextTick()
  }

  pingZhengRowsRef.value[rowIndex+1].setupState.newLineHandle(zhaiYao)
}
</script>
<style scoped>

#pageEditZoom {
  border-radius: 5px;
  -moz-border-radius: 5px;
  height: 546px;
  position: relative;
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
  width: 1200px;
  padding: 20px 0;
  border: 1px solid rgb(215, 215, 215);
  background: white
}

#pageEditZoom .pageEditZoomSelect {

  font-size: 13px;
  color: black;
  background-color: #fbfbfb;
  border: 1px solid #d5d5d5;
  padding: 6px 12px;
  border: none;
  width: 90px;
  text-align: center;
  text-align-last: center;
  border-bottom: 1px solid black
}

#pageEditZoom .pageEditZoomInput {
  border-radius: 0 !important;
  font-size: 13px;text-align:center;color: #858585;background-color: #fbfbfb;padding: 6px 12px;box-sizing:border-box;width:65px;    border:none !important;border-bottom: solid 1px black !important; color: black !important;

}

#pageEditZoom .pageEditZoomDate {
  position:absolute;top:49px;text-align:center;color: grey;margin:0 auto;left:calc((100% - 145px)/2) !important;

}

.subtractionImg{
  position:absolute;left:-2px;cursor:pointer;margin-top:16px;margin-left:29px;width:20px
}
</style>
<style src="../assets/styles/boozui/boozui.css" scoped></style>
<style scoped>
.voucher-item.default{
  overflow-y:auto;height:241px;clear: both
}
.voucher-item.screen{
  overflow-y:auto;height:741px;clear: both
}
</style>