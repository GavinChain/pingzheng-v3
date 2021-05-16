<template>
  <ul

      class="firstRow"
      style="position: relative"
  >
    {{ row.rowIndex }}
    <div>
      <div
          style="width:0;float:left;padding:0;display:block;border:0;left: 0;position:absolute;-moz-user-select:none;"
          colspan="0"
          unselectable="on"
          onselectstart="return false;"
      >
        <div
            v-show="row.hover"
            @click="addRowButton(rowIndex)"
            style="    position: absolute;
    left: -49px;width:50px;height: 60px;"
        >
          <img class="subtractionImg">
        </div>
      </div>
    </div>
    <li class="col-serial">
      {{ rowIndex + 1 }}
    </li>
    <li class="col1">
      <ZhaiYaoGrid
          @ref="row.commitZhaiYaoRef"
          v-model="row.zhaiYao"
          :abstracts="abstracts"
          @change="focusKuaiJiKeMuGrid(rowIndex)"
      />
    </li>
    <li class="col2">
      <KuaiJiKeMuGrid
          @ref="row.commitKuaiJiKemuGridRef"

          v-if="subs.length"
          :val="row.kuaiJiKeMuText"
          :update-page="updatePage"
          :row-index="i+1"
          :assist-val="assist[i]"
          :iyear="iyear"
          :subs="subs"
          @blur="kuaiJiKeMuChangeBlur(row)"
          @kuaiJiKeMuChange="kuaiJiKeMuChange(row,$event)"
      />
    </li>

    <li class="col3" style="">
      <FuZhuHeSuanGrid @ref="row.commitFuZhuHeSuanRef" v-model="row.fuZhuHeSuan"></FuZhuHeSuanGrid>
    </li>
    <li class="col4"/>
    <li class="col-jie" style="position: relative">
      <JieMoneyGrid v-model="row.jieMoney"
                    @ref="row.commitJieMoneyGridRef"
                    @money-change="dGrid[i].setupState.focus()"
                    @input="row.daiMoney='0.00'"/>
    </li>
    <li class="col-dai" style="position: relative">
      <DaiMoneyGrid v-model="row.daiMoney"
                    :equals-event="()=>15"
                    @ref="row.commitDaiMoneyGridRef"
                    @money-change="zhaiYaoGrid[i+1]!=null?zhaiYaoGrid[i+1].setupState.focus():''"
                    @input="clearRightVal"/>
    </li>
    <div
        style="width:0;padding:0;display:block;border:0;position:absolute;right: 0;-moz-user-select:none;"
        colspan="0"
        unselectable="on"
        onselectstart="return false;"
    >
      <div
          v-show="pingZhengRowHover[i]"
          @click="deleteRowButton(i)"
          style="    width: 31px;
    height: 60px;
    position: absolute;
    right: -32px;
    text-align: right;
    cursor: pointer;"
      >
        <img
            class="addImg"
            style="width:20px;margin-top:16px;-moz-user-select:none;"
            unselectable="on"
            onselectstart="return false;"
        >
      </div>
    </div>
    <li style="clear: both"/>
  </ul>

</template>
<script setup>
import {defineProps, ref, watch} from "vue";
import {usePingZhengModelStoreWidthOut} from "../../store/modules/pingZhengModel";
import MoneyGrid from '../components/money_grid.vue'
import ZhaiYaoGrid from './column-zhaiYao.vue'
import KuaiJiKeMuGrid from './column-kuaiJiKeMu.vue'
import JieMoneyGrid from './column-money-grid.vue'
import DaiMoneyGrid from './column-money-grid.vue'
const props = defineProps(['modelValue','rowIndex'])
const row = ref()
const rowIndex = ref()
const pingZhengModelApi = usePingZhengModelStoreWidthOut()

const zhaiYaoRef=ref()
const kuaiJiKemuGridRef=ref()
const uZhuHeSuanRef=ref()
const jieMoneyGridRef=ref()
const daiMoneyGridRef=ref()



watch(props, () => {
  row.value = props.modelValue
  rowIndex.value = props.rowIndex
},{immediate:true})
</script>