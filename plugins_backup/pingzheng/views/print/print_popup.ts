
// @ts-nocheck
import './print';
import './export';
import {convertCurrency} from '../../helper/jizhangHelper';
import {initExportData} from './print';
export function toDecimal2(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

export function addThousands(num) {
  if (num == null) return "";
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  if (num && num.toString().indexOf('.') == -1) {
    return (num + '').replace(reg, '$&,');
  } else {
    return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ",";
    });
  }
}
// 预备打印
export function openPrintPopup() {
  layui.use('layer', () => {
    layui.layer.open({
      type: 2,
      title: '打印选项',
      maxmin: false,
      shadeClose: true, //点击遮罩关闭层
      area: ['530px', '460px'],
      content: '/ysd/cwerp/jizhang/component/print_optionp'
    });
  });
}



