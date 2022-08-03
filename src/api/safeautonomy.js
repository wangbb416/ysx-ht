/* ----------------- 安全自治 --------------- */

import axios from "./axios";

// 安全信用分
export function safecreditscoreList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishSafe/managePage",
    params: data
  })
}

// 安全信用分-详情
export function safecreditscoreDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishSafe/illegalDetail",
    params: data
  })
}

// 安全信用分-下载
export function downloadsafecreditscore(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishSafe/managePageExport",
    params: data,
    responseType: 'blob'
  })
}

// 预警信息管理
export function earlywarningmanageList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/shipAlarm/getShipAlarms",
    params: data
  })
}

// 预警信息管理-下载
export function downloadearlywarningmanage(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/shipAlarm/exportShipAlarms",
    params: data,
    responseType: 'blob'
  })
}


// 安全学习
export function safelearningList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/studyMaterial/page",
    params: data
  })
}

// 安全学习-新增
export function checkSafelearningAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/studyMaterial/add",
    data: data
  })
}

// 安全学习-发布、撤回
export function releaseSafelearningList(data) {
  return axios({
    method: "put",
    url: "/fish-easy/company/studyMaterial/publish",
    params: data
  })
}

// 安全学习-删除
export function safelearningListDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/studyMaterial/delete",
    params: data
  })
}


// 安全学习-下载
export function downloadSafelearning(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/studyMaterial/export",
    params: data,
    responseType: 'blob'
  })
}


// 学习记录
export function learningrecordList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/page",
    params: data
  })
}

// 学习记录-详情
export function learningrecordDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/details",
    params: data
  })
}

// 学习记录-下载
export function downloadlearningrecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/export",
    params: data,
    responseType: 'blob'
  })
}


// 政策相关
export function safepolicyrelatedList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/policyMaterial/page",
    params: data
  })
}

// 政策相关-新增
export function checkSafepolicyrelatedAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/policyMaterial/add",
    data: data
  })
}

// 政策相关-删除
export function safepolicyrelatedDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/policyMaterial/delete",
    params: data
  })
}


// 政策相关-下载
export function downloadSafepolicyrelated(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/policyMaterial/export",
    params: data,
    responseType: 'blob'
  })
}
