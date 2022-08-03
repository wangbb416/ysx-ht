/* ----------------- 公益活动 --------------- */

import axios from './axios';


// 先锋驿站
export function pioneerstationList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/pioneerStation/page",
    params: data
  })
}

// 先锋驿站-新增
export function pioneerstationAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/pioneerStation/add",
    data: data
  })
}

// 先锋驿站-修改
export function pioneerstationUpdate(data) {
  return axios({
    method: "put",
    url: "/fish-easy/company/pioneerStation/edit",
    data: data
  })
}

// 先锋驿站-删除
export function pioneerstationDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/pioneerStation/delete",
    params: data
  })
}


// 先锋驿站-下载
export function downloadPioneerstation(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/pioneerStation/exportPage",
    params: data,
    responseType: 'blob'
  })
}

// 参观申请记录
export function visitapplicationrecordList(data) {
  return axios({
    method: "get",
    url: "/visit/apply/web/search",
    params: data
  })
}

// 参观申请记录-下载
export function downloadVisitapplicationrecord(data) {
  return axios({
    method: "get",
    url: "/visit/apply/web/export",
    params: data,
    responseType: 'blob'
  })
}

// 参观申请记录-通过、拒绝
export function operaVisitapplicationrecord(data) {
  return axios({
    method: "put",
    url: "/visit/apply/approval",
    data: data
  })
}


// 宣传教育
export function publicityeducationList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/studyMaterial/page",
    params: data
  })
}

// 宣传教育-发布、撤回
export function releasePublicityeducation(data) {
  return axios({
    method: "put",
    url: "/fish-easy/company/studyMaterial/publish",
    params: data
  })
}

// 宣传教育-删除
export function publicityeducationDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/studyMaterial/delete",
    params: data
  })
}


// 宣传教育-下载
export function downloadpublicityeducation(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/studyMaterial/export",
    params: data,
    responseType: 'blob'
  })
}

// 宣传教育-新增
export function publicityeducationAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/studyMaterial/add",
    data: data
  })
}


// 宣教记录
export function publicityrecordList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/page",
    params: data
  })
}

// 宣教记录-详情
export function publicityrecordDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/details",
    params: data
  })
}

// 宣教记录-下载
export function downloadPublicityrecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/userHistory/export",
    params: data,
    responseType: 'blob'
  })
}



// 线下培训 - 记录
export function offlineTrainRecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/zlbActivityRecord/page",
    params: data
  })
}


// 线下培训 - 新增
export function offlineTrainAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/zlbActivityRecord/add",
    data: data
  })
}


// 线下培训 - 编辑
export function offlineTrainEdit(data) {
  return axios({
    method: "put",
    url: "/fish-easy/company/zlbActivityRecord/edit",
    data: data
  })
}

// 线下培训 - 下载
export function offlineTrainDownload(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/zlbActivityRecord/detailWeb/export",
    params: data,
    responseType: 'blob'
  })
}

// 线下培训 - 详情
export function offlineTrainRecordDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/zlbActivityRecord/detailWeb",
    params: data
  })
}

