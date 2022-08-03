/* ----------------- 生态环保 --------------- */

// 渔船纳污记录

export const fishingvesselTabel = [
  {
    label: "渔船名称",
    field: "shipName"
  },
  {
    label: "船籍港",
    field: "shipAddress"
  },
  {
    label: "纳污类型",
    slotName: "slotWasteType"
  },
  {
    label: "纳污重量(kg)",
    field: "weight"
  },
  {
    label: "纳污地点",
    field: "workAddress",
  },
  {
    label: "接收方",
    field: "receiveShip",
  },
  {
    label: "更新时间",
    sortable: true,
    slotName: "slotupdateTime"
  },
]

// 环保培训
export const trainingTabel = [
  {
    label: "资料名称",
    field: "content"
  },
  {
    label: "资料类型",
    slotName: "slotType"
  },
  {
    label: "上传人",
    field: "username"
  },
  {
    label: "更新时间",
    sortable: true,
    slotName: "slotupdateTime"
  },
  {
    label: "发布管理",
    otherConfig:{
      width:'160'
    },
    slotName: "data_Manage",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]

// 政策相关
export const policyrelatedTabel = [
  {
    label: "链接标题",
    field: "content"
  },
  {
    label: "链接",
    slotName: "slotpath"
  },
  {
    label: "来源",
    slotName: "slotpolicyType"
  },
  {
    label: "更新时间",
    sortable: true,
    slotName: "slotupdateTime",
  },
  {
    label: "操作",
    field: "",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]






