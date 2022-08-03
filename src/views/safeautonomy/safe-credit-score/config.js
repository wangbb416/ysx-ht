/* ----------------- 安全自治 --------------- */

// 安全信用分
export const safecreditscoreTabel = [
  {
    label: "渔船名称",
    field: "companyName"
  },
  {
    label: "船籍港",
    field: "fishBoatAddress"
  },
  {
    label: "安全信用得分",
    field: "score"
  },
  {
    label: "更新时间",
    sortable: true,
    slotName: "slotUpdateTime"
  },
  {
    label: "操作",
    field: "",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]
