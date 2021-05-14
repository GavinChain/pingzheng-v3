<template>
  <div id="printPage" style="background:white;width:100%;height:100%;font-family: '宋体'">
    <div class="singleData" style="width:100%;height:45.45%;position:relative;padding-top:12px" v-for="table in printTableData">
      <table style="width:91.5%;margin-left: 8.4%;margin-top:0px">
        <thead>
        <tr style="height:70px">
          <th :colspan="Object.keys(table.title).length"
              style="padding: 0px 20px;border: none;position: relative;height: 0">
            <div style="margin-top:-23px">
              <span style="font-size:24px;font-weight:800;margin-bottom:20px">{{exportName}}</span>
              <br>
              <span style="font-size:14px;text-align: center;font-weight: 400">日期:{{table.info['日期']}}</span>
              <span style="font-size:14px;float:right;position:absolute;right:8px;top:0px;font-weight: 400">附单据数:{{table.info['附单据数']}}</span>
            </div>
          </th>
        </tr>
        <tr>
          <th :colspan="Object.keys(table.title).length" style="border:none;position:relative;height:10px;">
                    <span class="company"
                          style="text-align:left;font-size:14px;position:absolute;left:20px;top:-48px;font-weight: 400"><span style="opacity: 0">核算单位:</span>{{table.info['核算单位']}}</span>
            <span style="font-size:14px;position:absolute;right:8px;top:-46px;font-weight: 400">
                        凭证号:{{table.info['凭证号']}}-<span style="float:right;font-size: 12px;margin-left:0px;">{{table.partNum['num']}}/{{table.partNum['totalNum']}}</span>
                    </span>
          </th>
        </tr>
        <tr style="opacity: 0">
          <th v-for="i,titleName in table.title" style=" font-weight: 900;font-size:16px"><b>{{titleName}}</b></th>
        </tr>
        </thead>
        <tbody style="font-size:14px;">
        <tr v-for="obj in table.body">
          <td v-for="key,titleName in table.title" style="font-size:14px;font-weight:400;padding:10px 0"><span>{{obj[key]}}</span>
          </td>
        </tr>
        <tr style="font-size:14px;height:34px">
          <td style="font-weight: 900;text-align:left;position: relative" colspan="2">
            <div style="position: absolute;bottom:7px">

                    <span
                        style="margin-right:35px;font-weight: 400;opacity: 0">合计：</span>{{table.info.合计}}
            </div>
          </td>
          <td style="text-align:right">{{table.footer.sum}}</td>
          <td style="text-align:right">{{table.footer.sum}}</td>
        </tr>
        <%--  <tr>
          <td :colspan="Object.keys(table.title).length"> 凭证数量：{{table.footer.vouchNum}}
            附单据数：{{table.footer.num}}合计：{{table.footer.sum}}
          </td>
        </tr>--%>
        <tr style="height:25px;text-align: left;">
          <td :colspan="Object.keys(table.title).length" style="position:relative">
            <span style="opacity:0;font-size:14px;display:inline-block;width:22.5%">记账:{{table.info['记账']}}</span>
            <span style="opacity:0;font-size:14px;display:inline-block;width:22.5%">审核:{{table.info['审核']}}</span>
            <span style="opacity:0;font-size:14px;display:inline-block;width:22.5%">出纳:{{table.info['出纳']}}</span>
            <span style="font-size:14px;display:inline-block;width:22.5%;padding-left: 40px;box-sizing: border-box;position: absolute;bottom:0px">
                        <span style="opacity:0;">制单:</span>{{table.info['制单']}}
                    </span>
          </td>
        </tr>
        </tbody>
        <tfoot>

        </tfoot>
      </table>
    </div>
  </div>
</template>
<style>
table th:nth-of-type(1){
  width:21.5%;
}
table th:nth-of-type(2){
  width:48%;
}
table th:nth-of-type(3){
  width:15.25%;
}
table th:nth-of-type(4){
  width:15.25%;
}
table tbody tr{
  height:49px
}
table tbody tr td:nth-of-type(1){
  text-align: left;
}
table tbody tr td:nth-of-type(2){
  text-align: left;
}
table tbody tr td:nth-of-type(3){
  text-align: right;
}
table tbody tr td:nth-of-type(4){
  text-align: right;
}
</style>
