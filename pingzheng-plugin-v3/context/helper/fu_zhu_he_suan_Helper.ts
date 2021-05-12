
// @ts-nocheck
/* eslint-disable */
import {fuZhuHeSuanModel} from '../model/pingzheng_model';

let exports = {};
export default exports;

export function castFuZhuHeSuanModel(fuZhuHeSuanApiData) {
    const fuZhuHeSuanModel = createEmptyFuZhuHeSuanModel();
    // this.$refs.dataList.style.display = 'none'
    if (fuZhuHeSuanApiData.bperson == '1') {
        fuZhuHeSuanModel.fzEmp = '';
    }
    // if (fuZhuHeSuanApiData.brelativeUnit == '1'){
    //     fuZhuHeSuanModel.fzEmp=''
    // }
    if (fuZhuHeSuanApiData.bdept == '1') {
        fuZhuHeSuanModel.fzDept = '';
    }
    if (fuZhuHeSuanApiData.bitem == '1') {
        fuZhuHeSuanModel.fzXiangMuMulu = '';
    }
    if (fuZhuHeSuanApiData.binventory == '1') {
        fuZhuHeSuanModel.fzCunHuo = '';
    }
    if (fuZhuHeSuanApiData.br == '1') {
        fuZhuHeSuanModel.fzCustomer = '';
    }
    if (fuZhuHeSuanApiData.be == '1') {
        fuZhuHeSuanModel.fzSupplier = '';
    }
    return fuZhuHeSuanModel;
}

export function createEmptyFuZhuHeSuanModel() {
    return fuZhuHeSuanModel({
        // 部门
        fzDept: null,
        // 个人往来
        fzEmp: null,
        // 客户
        fzCustomer: null,
        // 供应商
        fzSupplier: null,
        // 存货
        fzCunHuo: null,
        // 项目
        fzXiangMuMulu: null
    });
}

export function assignFuZuHeSuan(pingZhengRow,apiData) {
  const rowDataFuZuHeSuanColumns=apiDataCastFuZhuHeSuanModel(apiData)
  Object.assign(pingZhengRow, {...rowDataFuZuHeSuanColumns});
}

export function apiDataCastFuZhuHeSuanModel(apiData) {
    const fuZhuHeSuanModel = castFuZhuHeSuanModel(apiData);
    return fuZhuHeSuanModel;

}

export function clearFuZhuHeSuan(pingZhengRow) {

    Object.assign(pingZhengRow, {...createEmptyFuZhuHeSuanModel()});
}

export function verifyKuaiJiKeMu(fuZhuHeSuanModel, pingZhengRow) {
    let errorList = [];
    Object.keys(fuZhuHeSuanModel).map(key => {

        if (key == null) {
            if (row[key] != null) {
                errorList.push(key);

            }
        }

    });
    return [
        errorList.length > 0,
        {errorList}
    ];
}


