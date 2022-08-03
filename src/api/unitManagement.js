/* ----------------- 单位管理 --------------- */
import axios from "./axios";

// 渔港列表
export function fishingPortList(data) {
  return axios({
    method: "get",
    url: "/companies/port/search",
    params: data
  });
}
// 渔港列表 - 删除
export function fishingPortDelete(itemId) {
  return axios({
    method: "delete",
    url: `/companies/port/${itemId}`
  });
}
// 渔港列表 - 详情
export function fishingPortDetail(itemId) {
  return axios({
    method: "get",
    url: `/companies/port/${itemId}/detail`
  });
}
// 渔港列表 - 编辑
export function fishingPortEdit(itemId, data) {
  return axios({
    method: "put",
    url: `/companies/port/${itemId}`,
    data: data
  });
}
// 渔港列表 - 新增
export function fishingPortAdd(data) {
  return axios({
    method: "post",
    url: `/companies/port`,
    data: data
  });
}
// betahy2api.tian-wang.com20191204141124685SCP339621
// 渔船列表
export function fishingBoatList(data) {
  return axios({
    method: "get",
    url: "/companies/boats/search",
    params: data
  });
}
// 渔船列表 - 删除
export function fishingBoatDelete(itemId) {
  return axios({
    method: "delete",
    url: `/companies/boats/${itemId}`
  });
}
// 渔船列表 - 详情
export function fishingBoatDetail(itemId) {
  return axios({
    method: "get",
    url: `/companies/boats/${itemId}/detail`
  });
}
// 渔船列表 - 编辑
export function fishingBoatEdit(itemId, data) {
  return axios({
    method: "put",
    url: `/companies/boats/${itemId}`,
    data: data
  });
}
// 渔船列表 - 新增
export function fishingBoatAdd(data) {
  return axios({
    method: "post",
    url: `/companies/boats`,
    data: data
  });
}
// 渔船预警列表
export function fishingBoatWarningList(data) {
  return axios({
    method: "get",
    url: "/companies/alarm/search",
    params: data
  });
}
// 收集企业列表
export function collectCompaniesList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/companies/list",
    params: data
  });
}
// 收集企业列表 - 删除
export function collectCompaniesDelete(itemId) {
  return axios({
    method: "delete",
    url: `/companies/collector/${itemId}`
  });
}
// 收集企业列表 - 详情
export function collectCompaniesDetail(itemId) {
  return axios({
    method: "get",
    url: `/companies/collector/${itemId}/detail`
  });
}
// 收集企业列表 - 编辑
export function collectCompaniesEdit(itemId, data) {
  return axios({
    method: "put",
    url: `/companies/collector/${itemId}`,
    data: data
  });
}
// 收集企业列表 - 新增
export function collectCompaniesAdd(data) {
  return axios({
    method: "post",
    url: `/companies/collector`,
    data: data
  });
}
// 运输企业列表
export function transportationCompanyList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/companies/list",
    params: data
  });
}
// 运输企业列表 - 删除
export function transportationCompanyDelete(itemId) {
  return axios({
    method: "delete",
    url: `/companies/transport/${itemId}`
  });
}
// 运输企业列表 - 详情
export function transportationCompanyDetail(itemId) {
  return axios({
    method: "get",
    url: `/companies/transport/${itemId}/detail`
  });
}
// 运输企业列表 - 编辑
export function transportationCompanyEdit(itemId, data) {
  return axios({
    method: "put",
    url: `/companies/transport/${itemId}`,
    data: data
  });
}
// 运输企业列表 - 新增
export function transportationCompanyAdd(data) {
  return axios({
    method: "post",
    url: `/companies/transport`,
    data: data
  });
}
// 处置企业列表
export function disposalBusinessList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/companies/list",
    params: data
  });
}
// 处置企业列表 - 删除
export function disposalBusinessDelete(itemId) {
  return axios({
    method: "delete",
    url: `/companies/consumer/${itemId}`
  });
}
// 处置企业列表 - 详情
export function disposalBusinessDetail(itemId) {
  return axios({
    method: "get",
    url: `/companies/consumer/${itemId}/detail`
  });
}
// 处置企业列表 - 编辑
export function disposalBusinessEdit(itemId, data) {
  return axios({
    method: "put",
    url: `/companies/consumer/${itemId}`,
    data: data
  });
}
// 处置企业列表 - 新增
export function disposalBusinessAdd(data) {
  return axios({
    method: "post",
    url: `/companies/consumer`,
    data: data
  });
}
// 运营企业列表
export function operatingBusinessList(data) {
  return axios({
    method: "get",
    url: "fish-easy/company/companies/operation",
    params: data
  });
}
// 运营企业列表 - 删除
export function operatingBusinessDelete(itemId) {
  return axios({
    method: "delete",
    url: `/companies/operation/${itemId}`
  });
}
// 运营企业列表 - 详情
export function operatingBusinessDetail(itemId) {
  return axios({
    method: "get",
    url: `/companies/operation/${itemId}/detail`
  });
}
// 运营企业列表 - 编辑
export function operatingBusinessEdit(itemId, data) {
  return axios({
    method: "put",
    url: `/companies/operation/${itemId}`,
    data: data
  });
}
// 运营企业列表 - 新增
export function operatingBusinessAdd(data) {
  return axios({
    method: "post",
    url: `/companies/operation`,
    data: data
  });
}
// 监管企业列表
export function supervisionCompanyList(data) {
  return axios({
    method: "get",
    url: "/companies/superviser/search",
    params: data
  });
}
// 监管企业列表-删除
export function supervisionCompanyDelete(itemId) {
  return axios({
    method: "delete",
    url: `/companies/superviser/${itemId}`
  });
}
// 监管企业列表-详情
export function supervisionCompanyDetail(itemId) {
  return axios({
    method: "get",
    url: `/companies/superviser/${itemId}/detail`
  });
}
// 监管企业列表-编辑
export function supervisionCompanyEdit(itemId, data) {
  return axios({
    method: "put",
    url: `/companies/superviser/${itemId}`,
    data: data
  });
}
// 监管企业列表-新增
export function supervisionCompanyAdd(data) {
  return axios({
    method: "post",
    url: `/companies/superviser`,
    data: data
  });
}
// 企业管辖范围
export function enterpriseJurisdiction(data) {
  return axios({
    method: "get",
    url: `/companies/${data}/location`
  });
}
// 载具信息
export function carrierInformation(data) {
  return axios({
    method: "get",
    url: `/vehicle`,
    params: data
  });
}
// 污染物入仓记录
export function pollutantInto(data) {
  return axios({
    method: "get",
    url: `/storage`,
    params: data
  });
}
// 收油记录
export function collectGasRecord(data) {
  return axios({
    method: "get",
    url: `/collections`,
    params: data
  });
}
// 接收联单
export function receptionOrder(data) {
  return axios({
    method: "get",
    url: `/collections`,
    params: data
  });
}
// 接收联单 - 详情
export function receptionOrderDetail(itemId) {
  return axios({
    method: "get",
    url: `/collections/${itemId}/detail/upgrade`
  });
}

// 接收联单 - 污染物接收现场
export function receptionSite(itemId) {
  return axios({
    method: "get",
    url: `/collections/upload/listNo/${itemId}`
  });
}
// 进出港记录(仅展示近1年记录);
export function investAndExported(data) {
  return axios({
    method: "get",
    url: `/companies/ship-in-out-record`,
    params: data
  });
}
// 健康码变化记录（仅展示近1年记录）
export function healthCodeChangeRecord(data) {
  return axios({
    method: "get",
    url: `/fish-easy/company/healthCode/getHealthCodeLog`,
    params: data
  });
}
// 预警记录
export function warningRecord(data) {
  return axios({
    method: "get",
    url: `/companies/alarm/search`,
    params: data
  });
}
// 信息总览
export function informationOverview(itemId) {
  return axios({
    method: "get",
    url: `/companies/${itemId}/fishingPort/data`
  });
}
// 收集信息
export function collectInformation(itemId) {
  return axios({
    method: "get",
    url: `/companies/${itemId}/collector/relation`
  });
}
// 运输信息
export function transportInformation(itemId) {
  return axios({
    method: "get",
    url: `/companies/${itemId}/transport/relation`
  });
}
// 处置信息
export function disposalInformation(itemId) {
  return axios({
    method: "get",
    url: `/companies/${itemId}/consumer/relation`
  });
}
// 危废转移联单的产废主体
export function dangerousInjectionTransfer(itemId) {
  return axios({
    method: "get",
    url: `/companies/${itemId}/subject/relation`
  });
}
// 危废转移联单记录
export function dangerousWasteTransferListRecord(data) {
  return axios({
    method: "get",
    url: `/wt/orders/search`,
    params: data
  });
}
// 设备信息
export function deviceInformation(data) {
  return axios({
    method: "get",
    url: `/devices/search`,
    params: data
  });
}
// 设备详情
export function equipmentDetails(itemId, data) {
  return axios({
    method: "get",
    url: `/devices/${itemId}/detail`,
    params: data
  });
}
// 台账
export function accountTable(itemId, data) {
  return axios({
    method: "get",
    url: `/standingBook/producer/${itemId}/recode`,
    params: data
  });
}
// 渔船台账
export function fishingAccountTable(itemId, data) {
  return axios({
    method: "get",
    url: `/standingBook/fishboat/${itemId}`,
    params: data
  });
}
// 下载
export function downloadFishingBoatList(data) {
  return axios({
    method: "get",
    url: "/companies/download/template",
    params: data,
    responseType: "blob"
  });
}
// 导出
export function exportExcel(data) {
  return axios({
    method: "get",
    url: "/companies/boat/export",
    params: data,
    responseType: "blob"
  });
}
// 导入
export function importExcel(data) {
  return axios({
    method: "post",
    url: "/companies/import",
    data: data
  });
}
// 错误文件导出
export function importExcelError(data) {
  return axios({
    method: "get",
    url: "/companies/import/error",
    params: data,
    responseType: "blob"
  });
}
