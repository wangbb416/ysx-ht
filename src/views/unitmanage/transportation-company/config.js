/* ----------------- 单位管理 --------------- */

// 运输企业列表
export const transportationCompanyTable = [
  {
    label: "企业编号",
    field: "id"
  },
  {
    label: "企业名称",
    field: "companyName"
  },
  {
    label: "企业地址",
    field: "address"
  },
  {
    label: "联系人",
    field: "linkman"
  },
  {
    label: "联系电话",
    field: "phone"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];

// 载具信息
export const carrierInformationTable = [
  {
    label: "载具名称",
    field: "vehicleName"
  },
  {
    label: "载具类型",
    field: "vehicleTypeStr"
  },
  {
    label: "载具号牌",
    field: "vehicleCode"
  },
  {
    label: "载重量(kg)",
    field: "vehicleLoad"
  },
  {
    label: "负责人",
    field: "linkman"
  },
  {
    label: "负责人电话",
    field: "phone"
  },
  {
    label: "资质证号",
    field: "transLicense"
  },
  {
    label: "资质图片",
    slotName: "data_licensePictures"
  }
];
