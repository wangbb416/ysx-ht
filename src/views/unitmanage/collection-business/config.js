/* ----------------- 单位管理 --------------- */

// 收集企业列表
export const collectCompaniesTable = [
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
// 污染物入仓记录
export const pollutantIntoTable = [
  {
    label: "记录编号",
    field: "recordNo"
  },
  {
    label: "收集企业",
    field: "companyName"
  },
  {
    label: "收集人员",
    field: "username"
  },
  {
    label: "污染物种类",
    field: "wasteTypeDesc"
  },
  {
    label: "云仓序列号",
    field: "deviceSerialNo"
  },
  {
    label: "收集量(kg)",
    field: "collectionWeight"
  },
  {
    label: "入仓量(kg)",
    field: "storageWeight"
  },
  {
    label: "状态",
    field: "statusStr"
  },
  {
    label: "入仓时间",
    sortable: true,
    field: "workEndTimeStr"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];
