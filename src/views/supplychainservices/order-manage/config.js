/* ----------------- 供应链服务 --------------- */


// 订单列表
export const orderlistTabel = [
  {
    label: "订单编号",
    field: "merchantOrderNo"
  },
  {
    label: "订单状态",
    field: "merchantOrderStatus",
    slotName: "slotMerchantOrderStatus",
  },
  {
    label: "下单时间",
    sortable: true,
    field: "createTime",
    slotName: "slotCreateTime",
  },
  {
    label: "商家名称",
    field: "merchantName"
  },
  {
    label: "订单金额",
    field: "totalPrice"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "200"}
  },
]

// 订单详情列表
export const orderDetaillistTabel = [
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
    label: "商品状态",
    field: "orderChildStatus",
    slotName: "slotOrderChildStatus",
  },
  {
    label: "订单总金额",
    field: "orderMerchantGoodsTotalPrice",
  },

]
