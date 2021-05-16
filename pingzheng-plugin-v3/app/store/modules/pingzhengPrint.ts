import {defineStore} from 'pinia';
// import {convertCurrency} from '../../../../plugins_backup/pingzheng/helper/jizhangHelper';
// import {
//     addThousands, openPrintPopup,
//     toDecimal2
// } from '../../../../plugins_backup/pingzheng/views/print/print_popup';
import {store} from '../index';
import {usePingZhengModelStore, usePingZhengModelStoreWidthOut} from './pingZhengModel';
import {addThousands, toDecimal2} from "../../views/print/print";
import {convertCurrency} from "../../helper/jizhangHelper";


// @ts-ignore
export const usePingZhengPrintStore = defineStore({
    id: 'pingzhengprint',
    state: (): any => ({}),

    actions: {

        singleInitExportData2(dom, voucherData) {
            let tables = [];
            // 对应数据
            let vouchRow = voucherData;
            let sumMoneyChina;
            if (vouchRow.sumMoney == 0) {
                sumMoneyChina = '零元整';
            } else {
                sumMoneyChina = convertCurrency(vouchRow.sumMoney);
            }

            let table = {
                title: {
                    摘要: 'z',
                    科目: 'k',
                    借方: 'j',
                    贷方: 'd'
                },
                body: [
                    {
                        'z': '',
                        'k': '',
                        'j': '',
                        'd': ''
                    }
                ],
                footer: {
                    'vouchNum': '',
                    'num': '',
                    'sum': addThousands(toDecimal2(vouchRow.sumMoney))
                },
                info: {
                    '附单据数': vouchRow.voucherBillNum,
                    '核算单位': '',
                    '日期': vouchRow.fillInDate,
                    '凭证号': vouchRow.vouchType + '-' + vouchRow.inoId,
                    '记账': '',
                    '审核': '',
                    '出纳': '',
                    '制单': vouchRow.fillPsn,
                    '合计': addThousands(sumMoneyChina)
                }
            };
            // $.ajax({
            //     type: 'post',
            //     url: urlPath + '/customer!get',
            //     async: false,
            //     success: function(res) {
            //         table.info['核算单位'] = res.obj['adKehuNameFull'];           // 核算单位
            //
            //     },
            //     error: function(xhr) {
            //         $('body').html(xhr.responseText);
            //     }
            // });
            // $('.table_body').find('>ul').each(function() {
            //     let row = [];
            //     row[0] = $(this).find('.col1 textarea').val();
            //     row[1] = $(this).find('.col2 textarea').val();
            //     row[2] = $(this).find('.col-jie textarea').val();
            //     row[3] = $(this).find('.col-dai textarea').val();
            //     row[2] = row[2] == '0' || $.trim(row[2]) == '' || row[2] == '0.00' ? '' : addThousands(changeTwoDecimal_f(row[2]));
            //     row[3] = row[3] == '0' || $.trim(row[3]) == '' || row[3] == '0.00' ? '' : addThousands(changeTwoDecimal_f(row[3]));
            //     let rowObj = {
            //         'z': row[0],
            //         'k': row[1],
            //         'd': addThousands(row[3]),
            //         'j': addThousands(row[2])
            //     };
            //     table.body.push(rowObj);
            // });
            // table.body = table.body.slice(1, table.body.length);
            // tables.push(table);
            // // debugger
            // initExportData('记账凭证', tables, urlPath + '/cwerp/jizhang/component/list/export');
        },
        async setPrintHistory(){

        },
        async checkPrintHistory(){

        },
        openPrintPopup(){


        },

        singlePrintBoot(dom, voucherData) {
            const pingZhengModelStore=usePingZhengModelStoreWidthOut()
            const pingZhengModel=pingZhengModelStore.getPingZhengModel
            // 填入数据
            let pingZhengRow = {
                date: pingZhengModel.props.date,
                pingZhengType: pingZhengModel.props.pingZhengNumOfMonth,
                pingZhengMonthNum: pingZhengModel.props.pingZhengNumOfMonth,
                danJuNum: pingZhengModel.props.danJuNum,
                fillPsn: pingZhengModel.props.zdr,
                sumMoney: 10,
            };
            this.singleInitExportData2(null, pingZhengRow);
        }
    }
});

// Need to be used outside the setup
export function usePingZhengPrintStoreWidthOut() {
    return usePingZhengPrintStore(store);
}
