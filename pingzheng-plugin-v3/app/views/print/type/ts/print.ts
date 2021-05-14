import {computed, ref} from 'vue';

export function usePrint(){
    const state={
        utilUrl: '',
        printSrc: '',
        showPage: true,
        customerFullName: '',
        table: {
            name: '报表',
            partNum: {'num': '', 'total': ''}, // 分录
            title: {
                科目编码: 'num',
                科目名称: 'name',
                借方发生: 'j',
                贷方发生: 'd'
            },
            body: [
                {
                    'num': '',
                    'name': '',
                    'j': '',
                    'd': ''
                }
            ],
            footer: {
                'vouchNum': '',
                'num': '',
                'sum': ''
            },
            info: {
                '附单据数': '',
                '核算单位': '',
                '日期': '',
                '凭证号': '',
                '记账': '',
                '审核': '',
                '出纳': '',
                '制单': ''
            }
        }
    }
    const sumMoneyChina=computed( function () {
        // let money;
        // if (billSumMoneyJnum == 0) {
        //     state.billSumMoney2 = "零元整"
        // } else if (billSumMoneyJnum != billSumMoneyDnum) {
        //     state.billSumMoney2 = ""
        // } else {
        //     state.billSumMoney2 = convertCurrency(billSumMoneyJnum);
        // }
        return null
    })
    const printTableData=computed(function () {
        let newTables = [];
        // for (let i in state.tables) {
        //     let count = 0;
        //     // 凭证转分录
        //     let totalNum = Math.ceil(state.tables[i].body.length / 5);
        //     while (count * 5 < state.tables[i].body.length) {
        //         let singleData = JSON.parse(JSON.stringify(state.tables[i]));
        //         singleData.body = state.tables[i].body.slice(count * 5, count * 5 + 5);
        //         while (singleData.body.length < 5) {
        //             singleData.body.push({
        //                 'z': '',
        //                 'k': '',
        //                 'd': '',
        //                 'j': ''
        //             })
        //         }
        //         singleData.partNum = {};
        //         singleData.partNum['num'] = count + 1;
        //         singleData.partNum['totalNum'] = totalNum;
        //         newTables.push(singleData);
        //         count++
        //     }
        // }
        return newTables
    })
    return state
}

