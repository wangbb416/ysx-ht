/* ----------------- 供应链服务 --------------- */


// 售后管理
export const aftersaleslistTabel = [
  {
    label: "退款单号",
    field: "aftersaleNo"
  },
  {
    label: "订单编号",
    field: "merchantOrderNo"
  },
  {
    label: "订单金额",
    field: "totalMoney"
  },
  {
    label: "退款理由",
    field: "refundReason"
  },
  {
    label: "申请退款时间",
    sortable: true,
    field: "applyTime",
    slotName: "slotApplyTime",
  },
  {
    label: "商家名称",
    field: "merchantName"
  },
  {
    label: "退款状态",
    field: "status",
    slotName: "slotStatus",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]

// 售后管理-详情列表
export const aftersalesDetaillistTabel = [
  {
    label: "商品",
    field: "goodsName"
  },
  {
    label: "单价(元/件)",
    field: "goodsUnitPrice"
  },
  {
    label: "数量(件)",
    field: "buyNumber"
  },
  {
    label: "商品总价(元)",
    field: "goodsTotalPrice"
  },
  {
    label: "订单总金额",
    field: "orderMerchantGoodsTotalPrice",
  },

]
