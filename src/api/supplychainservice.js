/* ----------------- 供应链服务 --------------- */
import axios from "./axios";

// 渔家乐管理
export function fishermanList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishFun/listPage",
    params: data
  });
}

// 新增
export function fishermanListAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/fishFun/add",
    data: data
  });
}

// 修改
export function fishermanListEdit(data) {
  return axios({
    method: "put",
    url: "/fish-easy/company/fishFun/update",
    data: data
  });
}

// 删除
export function fishermanHouseManageDelete(data) {
  return axios({
    method: "delete",
    url: "/fish-easy/company/fishFun/delete",
    params: data
  });
}

// 导出
export function fishermanListExport(data) {
  return axios({
    method: "get",
    url: "/fish-easy/company/fishFun/export",
    params: data,
    responseType: "blob"
  });
}

// 上下架
export function goToAndFromTheShelves(data) {
  return axios({
    method: "put",
    url: "/fish-easy/company/fishFun/status",
    params: data
  });
}

// 添加子项目
export function addSubProject(data) {
  return axios({
    method: "post",
    url: "/fish-easy/company/fishFun/projectAdd",
    data: data
  });
}


// 订单管理
export function ordermanageList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/orderMerchant/getPageOrderMerchantByParam",
    params: data,
  })
}

// 导出
export function downloadOrderManage(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/orderMerchant/excelOutOrderMerchantByParam",
    params: data,
    responseType: "blob"
  });
}

// 详情列表
export function ordermanageDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/orderMerchant/getOrderMerchantDetailById",
    params: data,
  })
}

// 手动完成订单
export function getOrderManually(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/orderMerchant/getFinishOrder",
    params: data,
  })
}

// 手动订单入账
export function getOrderEntry(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/orderMerchant/getSettlementOrder",
    params: data,
  })
}


// 商品管理
export function commodityManageList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoods/page",
    params: data,
  })
}

// 导出
export function downloadCommodityManage(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoods/listExport",
    params: data,
    responseType: "blob"
  });
}

// 详情
export function commodityManageDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoods/getOne",
    params: data,
  })
}

// 上架
export function commodityManageAgreePut(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoods/agreePut",
    params: data,
  })
}

// 下架
export function commodityManageRejectPut(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoods/rejectPut",
    params: data,
  })
}


// 分类管理
export function classificationList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoodsCategory/page",
    params: data,
  })
}

// 新增
export function classificationAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/shopProduct/ysxGoodsCategory/add",
    data: data
  });
}

// 修改
export function classificationEdit(data) {
  return axios({
    method: "put",
    url: "/fish-easy/shopProduct/ysxGoodsCategory/edit",
    data: data
  });
}

// 详情
export function classificationDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoodsCategory/detail",
    params: data,
  });
}

// 分类类目
export function categoryList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopProduct/ysxGoodsCategory/list",
    params: data,
  });
}

// 状态切换
export function classificationEnableValue(data) {
  return axios({
    method: "put",
    url: "/merchant/enable",
    data: data
  });
}


// 商家管理
export function merchantList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopUser/merchant/page",
    params: data,
  })
}

// 新增
export function merchantAdd(data) {
  return axios({
    method: "post",
    url: "/fish-easy/shopUser/merchant/add",
    data: data
  });
}

// 修改
export function merchantUpdate(data) {
  return axios({
    method: "put",
    url: "/fish-easy/shopUser/merchant/update",
    data: data
  });
}

// 状态切换
export function changeStatusValue(data) {
  return axios({
    method: "put",
    url: "/fish-easy/shopUser/merchant/enable",
    data: data
  });
}

// 获取码头数据
export function dockdataDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/companies/get",
    params: data,
  });
}

// 详情
export function merchantDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopUser/merchant/detail",
    params: data,
  })
}


// 财务管理
export function financialManageList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/fim/income/page",
    params: data,
  })
}

// 审核
export function financialWithdrawalAudit(data) {
  return axios({
    method: "post",
    url: "/fish-easy/shopOrder/fim/income/audit",
    data: data
  });
}


// 售后管理
export function aftersalesManageList(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/orderAfterSale/getPageOrderAfterSaleByParam",
    params: data,
  })
}

// 详情
export function aftersalesManageDetail(data) {
  return axios({
    method: "get",
    url: "/fish-easy/shopOrder/orderAfterSale/getOrderAfterDetailById",
    params: data,
  })
}

// 申诉处理
export function aftersalesDealwith(data) {
  return axios({
    method: "post",
    url: "/fish-easy/shopOrder/orderAfterSale/audit",
    data: data
  });
}



