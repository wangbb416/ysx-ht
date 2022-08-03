/* ----------------- 金融服务 --------------- */

import axios from "./axios";

// 贷款记录
export function loanRecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/financial/loanApply",
    params: data
  });
}
// 贷款下载
export function downLoanRecord(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/financial/export",
    data: data,
    responseType: 'blob'
  });
}

// 银行管理
export function bankmanageList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/financial/getBankManage",
    params: data
  })
}

// 银行管理-下载
export function downloadBankmanage(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/financial/getBankManage/export",
    params: data,
    responseType: 'blob'
  })
}

// 银行管理-修改  上、下架
export function bankmanageUpdate(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/financial/updateBankManage",
    data: data,
  })
}


