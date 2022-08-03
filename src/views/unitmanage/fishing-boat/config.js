/* ----------------- 单位管理 --------------- */

// 渔船列表
export const fishingBoatTable = [
  {
    label: "渔船编号",
    field: "id"
  },
  {
    label: "船名",
    field: "companyName"
  },
  {
    label: "船籍港",
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
    label: "渔业公司",
    field: "parentNameStr"
  },
  {
    label: "渔船状态",
    field: "companyStatusStr"
  },
  {
    label: "健康码",
    field: "healthCode"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  }
];
export const tableConfig1 = [
  {
    field: "recordNo",
    label: "联单编号"
  },
  {
    field: "shipName",
    label: "船名"
  },
  {
    field: "collectionCompanyName",
    label: "收集企业"
  },
  {
    field: "collectionUserName",
    label: "收集员"
  },
  {
    field: "wasteTypeStr",
    label: "污染物种类"
  },
  {
    field: "wasteWeight",
    label: "污染物数量(kg)"
  },
  {
    field: "statusStr",
    label: "联单进度"
  },
  {
    field: "workAddress",
    label: "作业地点"
  },
  {
    field: "startTimeStr",
    sortable: true,
    label: "开始时间"
  },
  {
    field: "endTimeStr",
    sortable: true,
    label: "结束时间"
  },
  {
    slotName: "data_Operate",
    label: "操作",
    otherConfig: {width: "120"}
  }
];
export const tableConfig2 = [
  {
    field: "actionTime",
    sortable: true,
    label: "时间"
  },
  {
    field: "portName",
    label: "港口"
  },
  {
    field: "actionStateStr",
    label: "进/出港"
  }
];
export const tableConfig3 = [
  {
    field: "createTime",
    sortable: true,
    label: "时间 "
  },
  {
    field: "preState",
    label: "变化前"
  },
  {
    field: "modifiedState",
    label: "变化后"
  },
  {
    field: "changType",
    label: "变化类型"
  }
];
export const tableConfig4 = [
  {
    field: "beginTime",
    sortable: true,
    label: "开始时间 "
  },
  {
    field: "endTime",
    sortable: true,
    label: "结束时间"
  },
  {
    field: "alarmTypeDesc",
    label: "预警类型 "
  }
];
export const pollutantReceivingSiteTable = [
  {
    field: "createTime",
    sortable: true,
    label: "上传时间"
  },
  {
    field: "operator",
    label: "上传人"
  },
  {
    slotName: "data_Operate",
    label: "操作",
    otherConfig: {width: "120"}
  }
];
