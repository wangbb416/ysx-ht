/* ----------------- 供应链服务 --------------- */

// 渔家乐管理
export const fishermanSManagementTable = [
  {
    label: "渔家乐名称",
    field: "baseName"
  },
  {
    label: "类型",
    field: "type"
  },
  {
    label: "地址",
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
  // {
  //   label: "发布管理",
  //   slotName: "data_Manage",
  //   otherConfig: { width: "180" }
  // },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];
