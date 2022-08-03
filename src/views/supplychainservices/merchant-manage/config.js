/* ----------------- 供应链服务 --------------- */

// 商家管理
export const businessManagementTable = [
  {
    label: "商家编号",
    field: "merchantNo"
  },
  {
    label: "商家名称",
    field: "merchantName"
  },
  {
    label: "主营业务",
    field: "mainBusiness",
    slotName: "slotMainBusiness",
  },
  {
    label: "收货地点",
    field: "shippingAddress"
  },
  {
    label: "联系人",
    field: "merchantContacts"
  },
  {
    label: "联系电话",
    field: "courierPhone"
  },
  {
    label: "详细收货地址",
    field: "addressDetail"
  },
  {
    label: "修改时间",
    sortable: true,
    field: "updateTime",
    slotName: "slotUpdateTime",
  },
  {
    label: "创建时间",
    sortable: true,
    field: "createTime",
    slotName: "slotCreateTime",
  },
  {
    label: "是否启用",
    slotName: "data_enable",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  }
];
