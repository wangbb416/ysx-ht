/* ----------------- 安全自治 --------------- */


// 预警信息管理
export const earlywarningmanageTabel = [
  {
    label: "渔船名称",
    field: "companyName"
  },
  {
    label: "船籍港",
    field: "shipRegistrationPort"
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
    label: "预警类型",
    field: "alarmType"
  },
  {
    label: "更新时间",
    sortable: true,
    field: "updateTime",
    slotName: "slotUpdateTime"
  },
]


// 安全学习
export const safelearningTabel = [
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
    slotName: "data_Manage",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]


// 政策相关
export const safepolicyrelatedTabel = [
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
