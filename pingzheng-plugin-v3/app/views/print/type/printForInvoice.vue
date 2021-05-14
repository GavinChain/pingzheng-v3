<template>
  <div id="printPage" style="background:white;width:100%;height:100%;font-family: '宋体'">
    <div class="singleData" style="width:100%;height:80%;position:relative;page-break-after: always" v-for="table in printTableData">
      <table style="width:93%;margin-left: 5.5%;">
        <thead>
        <tr>
          <th :colspan="Object.keys(table.title).length" style="padding: 0px 20px;border: none;position: relative;">
            <span style="font-size:24px;font-weight:800;margin-bottom:20px">{{exportName}}</span>
            <br>
            <span style="font-size:14px;text-align: center;font-weight: 400">日期:{{table.info['日期']}}</span>
            <span style="font-size:14px;float:right;position:absolute;right:0;top:15px;font-weight: 400">附单据数:{{table.info['附单据数']}}</span>
          </th>
        </tr>
        <tr>
          <th :colspan="Object.keys(table.title).length" style="border:none;position:relative;height:35px;">
            <span class="company" style="text-align:left;font-size:14px;position:absolute;left:0;top:5px;font-weight: 400">核算单位:{{table.info['核算单位']}}</span>
            <span style="font-size:14px;position:absolute;right:0;top:5px;font-weight: 400">
                        凭证号:{{table.info['凭证号']}}-<span style="float:right;font-size: 12px;margin-left:0px;">{{table.partNum['num']}}/{{table.partNum['totalNum']}}</span>
                    </span>
          </th>
        </tr>
        <tr>
          <th v-for="i,titleName in table.title" style="font-weight: 900;font-size:16px"><b>{{titleName}}</b></th>
        </tr>
        </thead>
        <tbody style="font-size:14px;">
        <tr v-for="obj in table.body">
          <td v-for="key,titleName in table.title" style="font-size:14px;font-weight:400;padding:10px 0"><span>{{obj[key]}}</span></td>
        </tr>
        </tbody>
        <tfoot>
        <tr style="font-size:14px;">
          <td style="font-weight: 900;border:solid 1px rgb(46, 46, 46);text-align:left" colspan="2"><span style="font-weight: 400;">合计：</span>{{table.info.合计}}</td>
          <td style="border:solid 1px rgb(46, 46, 46);text-align:right">{{table.footer.sum}}</td>
          <td style="border:solid 1px rgb(46, 46, 46);text-align:right">{{table.footer.sum}}</td>
        </tr>
        <%--  <tr>
          <td :colspan="Object.keys(table.title).length"> 凭证数量：{{table.footer.vouchNum}}
            附单据数：{{table.footer.num}}合计：{{table.footer.sum}}
          </td>
        </tr>--%>
        <tr style="text-align: left;">
          <td :colspan="Object.keys(table.title).length">
            <span style="font-size:14px;display:inline-block;width:22.5%">记账:{{table.info['记账']}}</span>
            <span style="font-size:14px;display:inline-block;width:22.5%">审核:{{table.info['审核']}}</span>
            <span style="font-size:14px;display:inline-block;width:22.5%">出纳:{{table.info['出纳']}}</span>
            <span style="font-size:14px;display:inline-block;width:22.5%">制单:{{table.info['制单']}}</span>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script setup>
import {usePrint} from './ts/print'
import {ref} from 'vue';
const state=ref(usePrint())
</script>
