/* ----------------- 单位管理 --------------- */

// 渔船预警列表
export const fishingBoatWarningTable = [
  {
    label: "渔船编号",
    field: "companyId"
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
    field: "parentName"
  },
  {
    label: "预警类型",
    field: "alarmTypeDesc"
  },
  {
    label: "预警时间",
    sortable: true,
    field: "beginTimeStr"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];
