/* ----------------- 供应链服务 --------------- */


// 财务管理
export const financiallistTabel = [
  {
    label: "提现单号",
    field: "withdrawNo"
  },
  {
    label: "商家名称",
    field: "merchantName"
  },
  {
    label: "提现金额",
    field: "withdrawMoney"
  },
  {
    label: "操作人",
    field: "auditUser"
  },
  {
    label: "提现到",
    slotName: "slotWithdrawTo",
  },
  {
    label: "收款人",
    field: "realName"
  },
  {
    label: "收款账号",
    field: "withdrawAccount"
  },
  {
    label: "提现时间",
    sortable: true,
    field: "createTime",
    slotName: "slotCreateTime",
  },
  {
    label: "提现状态",
    field: "withdrawStatus",
    slotName: "slotWithdrawStatus",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]
