/* ----------------- 生态环保 --------------- */

import axios from './axios';

// 环保信用分
export function creditpointsList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishCredit/environmentList",
    params: data
  })
}

// 环保信用分-下载
export function downloadcreditpoints(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishCredit/environmentExport",
    params: data,
    responseType: 'blob'
  })
}

// 环保信用分-详情
export function creditpointsDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishCredit/environmentDetail",
    params: data
  })
}

// 环保三色码
export function threecolorList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/healthCode/page",
    params: data
  })
}

// 环保三色码-下载
export function downloadthreecolor(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/healthCode/exportPage",
    params: data,
    responseType: 'blob'
  })
}

// 环保三色码-修改
export function threecolorUpdate(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/healthCode/update",
    data: data,
  })
}

// 环保三色码-详情
export function threecolorDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/healthCode/getHealthCodeLog",
    params: data
  })
}

// 环保三色码-详情-申报任务单
export function declarationTask(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/collectionRecord/page",
    params: data
  })
}

// 环保三色码-详情-进出港
export function inboundOutbound(data) {
  return axios({
    method: "get",
    url: "/companies/ship-in-out-record",
    params: data
  })
}


// 环保三色码-配置
export function threecolorConfigureList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/dataConfig/healthCodeConfigPage",
    params: data
  })
}

// 环保三色码-配置-新增
export function threecolorConfigureAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/dataConfig/addHealthCodeConfig",
    data: data
  })
}

// 渔船纳污记录
export function fishingVesselList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/collectionRecord/page",
    params: data
  })
}

// 渔船纳污记录-下载
export function downloadfishingVessel(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/collectionRecord/export",
    params: data,
    responseType: 'blob'
  })
}

// 环保培训
export function environmentaltrainingList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/studyMaterial/page",
    params: data
  })
}

// 环保培训-新增
export function checkEnvironmentaltrainingAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/studyMaterial/add",
    data: data
  })
}

// 环保培训-发布、撤回
export function releaseEnvironmentaltraining(data) {
  return axios({
    method: "put",
    url: "/fish-easy/company/studyMaterial/publish",
    params: data,
  })
}

// 环保培训-删除
export function environmentaltrainingDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/studyMaterial/delete",
    params: data,
  })
}


// 环保培训-下载
export function downloadenvironmentaltraining(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/studyMaterial/export",
    params: data,
    responseType: 'blob'
  })
}


// 培训记录
export function trainingrecordList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/page",
    params: data
  })
}

// 培训记录-详情
export function trainingrecordDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/details",
    params: data
  })
}

// 培训记录-下载
export function downloadtrainingrecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/export",
    params: data,
    responseType: 'blob'
  })
}

// 政策相关
export function policyrelatedList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/policyMaterial/page",
    params: data
  })
}

// 政策相关-新增
export function policyrelatedAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/policyMaterial/add",
    data: data
  })
}

// 政策相关-删除
export function policyrelatedDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/policyMaterial/delete",
    params: data
  })
}

// 政策相关-下载
export function downloadpolicyrelated(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/policyMaterial/export",
    params: data,
    responseType: 'blob'
  })
}

