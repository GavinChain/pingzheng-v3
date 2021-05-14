<template>
  <div class="a" style="position:fixed;left:calc(( 100% - 100px ) / 2);top:calc(( 100% - 100px ) / 2);background:white;border:solid 1px blue;z-index: 100000000">
    <div style="text-align: center">
      <p style="cursor: pointer" @click="printType='print'" :class="printType=='print'?'active':''">普通打印</p>
      <p style="cursor: pointer" @click="console.log('bb1'),printType='taoda'" ref="taodaPage"
         :class="printType=='taoda'?'active':''">专业套打</p>
    </div>
    <div style="margin:0 auto;text-align: center">
      <ul v-show="printType=='print'">
        <el-button @focus.native="chooseVal(null)" ref="a4">A4两版（居中）</el-button>
<!--        <%&#45;&#45;-->
<!--        <el-button @focus.native="chooseVal('invoice')" ref="invoice">发票版</el-button>-->
<!--        &#45;&#45;%>-->
      </ul>
      <ul v-show="printType=='taoda'">
        <el-button @focus.native="chooseVal('taoda-KPJ101')" ref="kpj101">KPJ101-210*127纵向打印</el-button>
        <el-button @focus.native="chooseVal('taoda-KPJ101')" ref="kpj101">KPJ106H-A4横向打印</el-button>
<!--        <%&#45;&#45;-->
<!--        <el-button @focus.native="chooseVal('taoda-KPJ103')" ref="kpj103">KPJ103-140*240打印</el-button>-->
<!--        &#45;&#45;%>-->
      </ul>
    </div>
    <div style="text-align: center">
<!--      <%&#45;&#45;-->
<!--      <el-button style="cursor: pointer" @click="$alert('往后版本发布')" type="success" plain>预览</el-button>-->
<!--      &#45;&#45;%>-->
      <el-button type="success" @click="confirm(type)"  style="cursor: pointer;background: rgb(122,193,87)">
        打印及预览
      </el-button>
    </div>
  </div>
</template>

<script setup>
import {h, onMounted, render} from 'vue';
import {ElButton} from 'element-plus'
import {usePingZhengPrintStoreWidthOut} from '../../store/modules/pingzhengPrint';
const urlPath = '<%=request.getContextPath()%>';
const printType = 'print';
const type = null;
const history = {};
const printStore=usePingZhengPrintStoreWidthOut()

function chooseVal(type) {
  // 记录历史记录
  this.recordHistory(type);
  this.type = type;
}

function recordHistory(type) {
  this.history.value = type;
  /*$.ajax({
      type:'post',
      url:urlPath + '/voucher!setPrintHistory',
      data:{'usedHistory':this.history},
      dataType:'JSON',
      success:function(list){
          console.log('记录成功')

      }
  });*/
  printStore.setPrintHistory()
  // axios.post(urlPath + '/voucher!setPrintHistory', Qs.stringify({'usedHistory': this.history}, {
  //   arrayFormat: 'indices',
  //   allowDots: true
  // }))
  //     .then(function(res) {
  //       console.log('记录成功');
  //     }.bind(this))
  //     .catch(function(error) {
  //       console.log(error);
  //     });
}

async function confirm(type) {
  const printPageSfc=(await import('./type/print.vue')).default
  const div=document.createElement('div')
  document.body.append(div)
  render(h({
    setup(){
      return ()=><printPageSfc></printPageSfc>
    }
  }),div)
  // if (type == 'invoice') {
  //   this.$confirm('请确认打印设置调整到自定义比例, 是否继续?', '提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(() => {
  //     this.$message({
  //       type: 'success',
  //       message: '准备打印!',
  //       duration: 600
  //     });
  //     parent.initExportData2(type);
  //     parent.dataPrint();
  //   }).catch(() => {
  //     this.$message({
  //       type: 'info',
  //       message: '已取消打印',
  //       duration: 600
  //     });
  //   });
  // } else {
  //   parent.dataPrint(type);
  // }
}

// 查询用户历史常用记录
function checkHistoryChoose() {
  printStore.checkPrintHistory()
  // axios.post(urlPath + '/voucher!checkPrintHistory', {})
  //     .then(function(res) {
  //       this.history = res.data.obj == null ? {} : {};
  //       switch (this.history.value) {
  //         case('invoice'):
  //           this.$refs.invoice.$el.focus();
  //           break;
  //         case('taoda-KPJ101'):
  //           this.$refs.taodaPage.click();
  //           this.$nextTick(function() {
  //             this.$refs.kpj101.$el.focus();
  //           });
  //           break;
  //         case('taoda-KPJ103'):
  //           this.$refs.taodaPage.click();
  //           this.$nextTick(function() {
  //             this.$refs.kpj103.$el.focus();
  //           });
  //           break;
  //         default:
  //           this.$refs.a4.$el.focus();
  //       }
  //     }.bind(this))
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  /* this.$refs.asss.$el.focus()*/
}

onMounted(() => checkHistoryChoose());
</script>
<style scope>
#app ul {
  display: inline-block;
  height: 50px;
  padding-left: 0
}

#app p {
  display: inline-block;
}

#app .active {
  color: rgb(47, 150, 136);
  border-bottom: solid 2px rgb(47, 150, 136);
}
</style>

<!--<link rel="stylesheet"-->
<!--      href="<%=request.getContextPath()%>/module/_sys/common/suite/vue/elementui/css/elementui.css">-->

<!--<script type="text/javascript" src="<%=request.getContextPath()%>/cwerp/assets/js/jquery-2.0.3.min.js"></script>-->
<!--<script src="<%=request.getContextPath()%>/common/js/frame/vue.js"></script>-->
<!--<script src="<%=request.getContextPath()%>/common/js/frame/axios.js"></script>-->
<!--<script src="<%=request.getContextPath()%>/common/js/frame/qs.js"></script>-->
<!--<script src="<%=request.getContextPath()%>/module/_sys/common/suite/vue/elementui/js/elementui.js"></script>-->
