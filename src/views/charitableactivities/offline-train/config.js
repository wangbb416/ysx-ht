
/* ----------------- 运营管理 --------------- */

export const OfflineTrainRecordConfig = [
  {
    label: "活动名称",
    field: "name"
  },
  {
    label: "组织单位",
    field: "organization"
  },
  {
    label: "活动地址",
    field: "address"
  },
  {
    label: "活动时间",
    field: "timeRange",
    otherConfig: { "min-width": "200" }
  },
  {
    label: "参与人数",
    field: "totalNum",
    default: "0"
  },
  {
    label: "平均参与时长",
    field: "avgTime",
    default: "0"
  },
  {
    label: "操作",
    field: "",
    slotName: "data_Operate",
    otherConfig: { width: "180" }
  },
]


export const OfflineTrainRecordDetailConfig = [
  {
    label: "学员姓名",
    field: "userName"
  },
  {
    label: "学员身份",
    field: "userRole",
    slotName: "data_userRole",
  },
  {
    label: "手机号",
    field: "mobile",
  },
  {
    label: "活动名称",
    field: "activityName"
  },
  {
    label: "活动地址",
    field: "activityAddress"
  },
  {
    label: "签到时间",
    field: "beginTime",
    slotName: "beginTime",
  },
  {
    label: "签退时间",
    field: "endTime",
    slotName: "endTime",
  },
  {
    label: "参与时长(分钟)",
    field: "totalTime"
  },
  {
    label: "签订协议",
    field: "protocol",
    slotName: "protocol",
  }
]


