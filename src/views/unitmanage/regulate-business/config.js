/* ----------------- 单位管理 --------------- */

// 监管单位列表
export const supervisionCompanyTable = [
  {
    label: "单位编号",
    field: "id"
  },
  {
    label: "单位名称",
    field: "companyName"
  },
  {
    label: "企业地址",
    field: "address"
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
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];

// 管辖范围
export const rangeTable = [
  {
    label: "管辖范围",
    field: "name"
  }
];
