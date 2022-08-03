/* ----------------- 公益活动 --------------- */

// 参观申请记录
export const visitapplicationrecordTabel = [
  {
    label: "申请单位",
    field: "companyName"
  },
  {
    label: "参观人数",
    field: "visitNum"
  },
  {
    label: "参观日期",
    sortable: true,
    field: "visitDate"
  },
  {
    label: "负责人姓名",
    field: "principalName"
  },
  {
    label: "负责人电话",
    field: "principalPhone"
  },
  {
    label: "操作",
    field: "lastLoginTime",
    slotName: "data_Operate",
    otherConfig: { width: "150" }
  }
];

// 宣传教育
export const publicityeducationTabel = [
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
    slotName: "data_Manage"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];
