/* ----------------- 金融服务 --------------- */

// 银行管理
export const bankmanageTabel = [
  {
    label: "银行名称",
    field: "bankName"
  },
  {
    label: "银行类型",
    field: "bankType"
  },
  {
    label: "咨询热线",
    field: "mobile"
  },
  {
    label: "附件",
    slotName: "data_bankType"
  },
  {
    label: "发布管理",
    slotName: "data_Manage"
  },
  {
    label: "操作",
    field: "",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  }
];

// 银行管理-查看
export const bankmanageDetailTabel = [
  {
    label: "文件",
    field: "path",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  }
];

