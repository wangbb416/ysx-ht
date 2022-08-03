/* ----------------- 生态环保 --------------- */

// 环保三色码-列表
export const environmentalthreeTabel = [
  {
    label: "渔船名称",
    field: "companyName"
  },
  {
    label: "船籍港",
    slotName: "homePort"
  },
  {
    label: "环保三色码",
    slotName: "healthCodeStateType"
  },
  {
    label: "更新时间",
    sortable: true,
    field: "updateTime",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]

// 环保三色码-配置列表
export const environmentalconfigureTabel = [
  {
    label: "配置名称",
    field: "name"
  },
  {
    label: "船籍港",
    field: "paramDesc"
  },
  {
    label: "黄码(入港次数达到)",
    field: "inPortTimesToYellow"
  },
  {
    label: "黄码(且未排污天数超过)",
    field: "unThrowWasteTimeToYellow"
  },
  {
    label: "红码(入港次数达到)",
    field: "inPortTimesToRed"
  },
  {
    label: "红码(且未排污天数超过)",
    field: "unThrowWasteTimeToRed"
  },
  {
    label: "周期开始时间",
    sortable: true,
    field: "runTime",
  },
]

