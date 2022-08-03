/* ----------------- 安全自治 --------------- */

// 学习记录
export const learningrecordTabel = [
  {
    label: "学员姓名",
    field: "useName"
  },
  {
    label: "学员身份",
    slotName: "slotLastRole"
  },
  {
    label: "资料类型",
    slotName: "slotLastType"
  },
  {
    label: "资料名称",
    field: "content"
  },
  {
    label: "更新时间",
    sortable: true,
    slotName: "slotEndTime"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]
