import axios from './axios';

export function login(data) {
  return axios({
    method: "post",
    url: "/login/web",
    data: data
  })
}

export function logout() {
  return axios({
    method: "post",
    url: "/logout/web"
  })
}

export function getUserRegion(data) {
  return axios({
    method: "get",
    url: "/fish-easy/haiyou/display/getUserRegion",
  })
}


// 用户菜单
export function getUserMenus() {
  return axios({
    method: "get",
    url: '/users/menus',
  })
}

/* ------------ 萤石云视频 ------------ */

// 固定监控视频获取：
export function getMonitorVideo(data) {
  return axios({
    method: "post",
    url: "/devices/video/listBySerialNo",
    data: data,
  })
}


/* ------------ 渔省心 ------------ */

// 建议汇总
export function getsuggest(data) {
  return axios({
    method: "get",
    url: "/zlb/getsuggest",
    params: data
  })
}

// 处理建议
export function dealsuggest(data) {
  return axios({
    method: "post",
    url: "/zlb/dealsuggest",
    data: data
  })
}

// 参观核查记录
export function checkRecord(data) {
  return axios({
    method: "get",
    url: "/visit/apply/web/search",
    params: data
  })
}


// 参观核查记录 -- 审核
export function checkRecordOpration(data) {
  return axios({
    method: "put",
    url: "/visit/apply/approval",
    data: data
  })
}

// 信用评分
export function creditScore(data) {
  return axios({
    method: "get",
    url: "/companies/credit/score/search",
    params: data
  })
}

// 信用评分 - 详情
export function creditScoreDetail(data) {
  return axios({
    method: "get",
    url: "/companies/credit/score/detail",
    params: data
  })
}


// 安全核查记录
export function securityCheckRecord(data) {
  return axios({
    method: "get",
    url: "/security/check/searchPc",
    params: data
  })
}

// 安全核查记录 - 详情
export function securityCheckRecordDetail(id) {
  return axios({
    method: "get",
    url: `/security/check/${id}`
  })
}


// 出入港记录
export function portRecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/ship/shipInOut",
    params: data
  })
}

// 出入港记录-下载
export function downloadPortRecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/ship/export",
    params: data,
    responseType: 'blob'
  })
}

// 港口清洁
export function cleanerPortRecord(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/material/cleaner/recordPage",
    params: data
  })
}

// 港口清洁 - 删除
export function cleanerPortDelete(data) {
  return axios({
    method: "POST",
    url: "/fish-easy/company/material/cleaner/delete",
    data: data
  })
}

// 港口清洁 - 新增
export function cleanerPortAdd(data) {
  return axios({
    method: "POST",
    url: "/fish-easy/company/material/cleaner/add",
    data: data
  })
}

// 港口清洁 - 编辑
export function cleanerPortUpdate(data) {
  return axios({
    method: "POST",
    url: "/fish-easy/company/material/cleaner/update",
    data: data
  })
}

