/* ----------------- 政策直通 --------------- */

import axios from "./axios";

// 政策补贴列表-查询
export function policySubsidies(data) {
  return axios({
    method: "get",
    url: "fish-easy/policyGrants/detail",
    params: data
  });
}
// 政策补贴-下载
export function downPolicySubsidies(data) {
  return axios({
    method: "post",
    url: "/fish-easy/policyGrants/detailExport",
    data: data,
    responseType: 'blob'
  });
}

// 惠渔政策
export function favorablefishingpolicyList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/policyMaterial/page",
    params: data
  })
}

// 惠渔政策-新增
export function checkFavorablefishingpolicyAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/policyMaterial/add",
    data: data
  })
}

// 惠渔政策-删除
export function favorablefishingpolicyDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/policyMaterial/delete",
    params: data
  })
}


// 惠渔政策-下载
export function downloadFavorablefishingpolicy(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/policyMaterial/export",
    params: data,
    responseType: 'blob'
  })
}

// 评价汇总
export function zlbEvaluateRecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/zlbEvaluateRecord/page",
    params: data
  })
}
