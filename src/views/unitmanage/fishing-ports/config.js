// 单位管理

// 渔港列表
export const fishingPortListTable = [
  {
    label: "渔港编号",
    field: "id"
  },
  {
    label: "渔港名称",
    field: "companyName"
  },
  {
    label: "渔港级别",
    field: "subTypeStr"
  },
  {
    label: "单位地址",
    field: "addressStr"
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
    label: "渔港状态",
    field: "companyStatusStr"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];
// 详情页 收集信息
export const collectInformationTable = [
  {
    label: "企业名称",
    field: "companyName"
  }
];

// 详情页 运输信息
export const transportationInformationTable = [
  {
    label: "企业名称",
    field: "companyName"
  }
];
// 详情页 处置信息
export const disposalInformationTable = [
  {
    label: "企业名称",
    field: "companyName"
  }
];
// 详情页 危废转移联单的产废主体
export const conjoinedBodyTable = [
  {
    label: "产废主体单位名称",
    field: "companyName"
  }
];
// 详情页 危废转移联单记录
export const conjoinedRecordTable = [
  {
    label: "联单编号",
    field: "orderNo"
  },
  {
    label: "运输企业名称",
    field: "transporterName"
  },
  {
    label: "处置企业名称",
    field: "consumerName"
  },
  {
    label: "废物名称",
    field: "wasteTypeStr"
  },
  {
    label: "重量(kg)",
    field: "originWeight"
  },
  {
    label: "开始时间",
    sortable: true,
    field: "createTimeStr"
  },
  {
    label: "联单进度",
    field: "statusStr"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];
// 详情页 设备信息
export const equipmentInformationTable = [
  {
    label: "当前归属",
    field: "companyName"
  },
  {
    label: "设备型号",
    field: "version"
  },
  {
    label: "序列号",
    field: "serialNo"
  },
  {
    label: "在线状态",
    field: "onlineStatusStr"
  },
  {
    label: "设备状态",
    field: "deviceStatusStr"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];
// 详情页 台账列表
export const standingBookTable = [
  {
    label: "日期",
    field: "time"
  },
  {
    label: "产生量",
    field: "produceEnd"
  },
  {
    label: "利用处置量",
    field: "consumeEnd"
  },
  {
    label: "转移量",
    field: "transferEnd"
  },
  {
    label: "上期存储量",
    field: "previousRemainEnd"
  },
  {
    label: "当前存储量",
    field: "currentRemainEnd"
  },
  {
    label: "污染风险量",
    field: "pollutionEnd"
  }
];
