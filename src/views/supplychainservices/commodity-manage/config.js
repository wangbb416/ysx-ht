/* ----------------- 供应链服务 --------------- */


// 商品管理
export const commoditylistTabel = [
  {
    label: "商品编号",
    field: "goodsNo"
  },
  {
    label: "商品名称",
    field: "goodsName"
  },
  {
    label: "商品规格",
    field: "goodsSpec"
  },
  {
    label: "单价(元/件)",
    field: "price"
  },
  {
    label: "库存(件)",
    field: "remain"
  },
  {
    label: "已售出(件)",
    field: "sell"
  },
  {
    label: "商品状态",
    field: "goodsCheckStatus",
    slotName: "slotGoodsCheckStatus",
  },
  {
    label: "是否上架",
    field: "sale",
    slotName: "slotSale",
  },
  {
    label: "添加时间",
    sortable: true,
    field: "createTime",
    slotName: "slot_CreateTime",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "250"}
  },
]
