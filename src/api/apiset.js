const serviceModule = {};
// const domainRoute = "/lsxh"
const newWeb = '/new-web'
// import newApi from "./newApi"

/**
 * 公共------------------------------------
 */
// 获取字典
serviceModule.queryDictDataByTypes = function () {
    var p = {
        // url: "/admin/api/dict/queryDictDataByTypes",
        url: '/web/api/dict/queryDictDataByTypes',
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 查询设备列表
// deviceType 1手环 2车辆定位器 3磅秤 4视频监控,默认查全部
// status 0启用 1禁用 不传查所有

serviceModule.getDeviceGps = function () {
    var p = {
        // url: "/device/device/getDeviceList",
        // method: "get",
        url: '/web/api/device/getDeviceList',
        method: 'post',
        baseURL: newWeb
    };
    return p;
};
//获取oss配置
serviceModule.getOssToken = function () {
    var p = {
        // url: "/bridgeTrilateralApi/oss/getToken",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/oss/getToken",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 登录
serviceModule.login = function () {
    var p = {
        // url: "/auth/user/web/login",
        // method: "post",
        // baseURL: newWeb
        url: '/auth/login',
        method: 'post',
        baseURL: newWeb
    };
    return p;
};
// 修改密码
serviceModule.updatePassword = function () {
    var p = {
        // url: "/auth/user/web/updatePassword",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/opr/changePwd",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 获取用户信息
serviceModule.getUserInfoByToken = function () {
    var p = {
        // url: "/auth/user/getToken",
        // method: "get",
        // baseURL: newWeb
        url: "/auth/getCurrentUser",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 获取用户信息
serviceModule.getResourceTreeList = function () {
    var p = {
        url: "/web/api/user/getResourceTreeList",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 退出登录
serviceModule.userLogout = function () {
    var p = {
        // url: "/admin/api/dict/queryDictDataByTypes",
        url: '/auth/logout',
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// --------清运需求管理-----------

//分页
serviceModule.declareGetPage = function () {
    var p = {
        // url: "/blueCycle/collect/getCollectOrderPageListByParams",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/collect/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 新增
serviceModule.declareCreate = function () {
    var p = {
        // url: "/blueCycle/collect/createCollectOrder",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/collect/createCollectOrder",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// // 通过管理员获取小蓝之家列表
// serviceModule.getHomeByUser = function () {
//     var p = {
//         // url: "/auth/company/getHomeByUser",
//         // method: "get",
//         // baseURL: newWeb
//         url: "/web/api/company/blue/getEnableList",
//         method: "post",
//         baseURL: newWeb
//
//     };
//     return p;
// };

// 修改
serviceModule.declareUpdate = function () {
    var p = {
        // url: "/blueCycle/collect/updateCollectOrder",
        // method: "put",
        // baseURL: newWeb
        url: "/web/api/collect/updateCollectOrder",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 删除
serviceModule.declareDelete = function () {
    var p = {
        // url: "/blueCycle/collect/deleteCollectOrderById?id=" + id,
        // method: "delete",
        // baseURL: newWeb
        url: "/web/api/collect/deleteCollectOrderByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 详情
serviceModule.declareDetail = function () {
    var p = {
        // url: "/blueCycle/collect/getCollectOrderById",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/collect/getCollectOrderByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// --------小蓝之家管理-----------

// 分页列表
serviceModule.blueHouseGetByPage = function () {
    var p = {
        // url: "/auth/company/getSBCompanyByName",
        // method: "get",
        url: '/web/api/company/blue/getByPage',
        method: 'post',
        baseURL: newWeb
    };
    return p;
};
// 获取所有小蓝之家列表不分页
serviceModule.getXiaolanData = function () {
    var p = {
        // url: "/auth/company/getSBCompanyByName",
        // method: "get",
        url: '/web/api/company/blue/getByStatus',
        method: 'post',
        baseURL: newWeb
    };
    return p;
};

// 清运统计
serviceModule.collectToInputStatistics = function () {
    var p = {
        // url: "/blueCycle/collect/collectToInputStatistics",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/collect/collectToInputStatistics",
        method: "post",
        baseURL: newWeb
    };
    return p;
}
// 清运统计 导出
serviceModule.collectToInputStatisticsExport = function () {
    var p = {
        // url: "/blueCycle/collect/collectToInputStatisticsExport",
        // method: "get",
        // baseURL: newWeb,
        url: "/web/api/collect/collectToInputStatisticsExport",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


//  --------清运需求审核-----------

// 列表
serviceModule.getInfoList = function () {
    var p = {
        // url: "/blueCycle/collect/getCollectOrderPageListByParams",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/collect/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 详情
serviceModule.getInfoDetail = function () {
    var p = {
        // url: "/blueCycle/collect/getCollectOrderById",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/collect/getCollectOrderByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 审核
serviceModule.checkCollectOrder = function () {
    var p = {
        // url: "/blueCycle/collect/checkCollectOrder",
        // method: "put",
        // baseURL: newWeb
        url: "/web/api/collect/checkCollectOrder",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// --------待清运需求汇总-----------

// 获取列表
serviceModule.getPageCollectOrderData = function () {
    var p = {
        // url: "/blueCycle/collect/getCollectOrderPageListByParams",
        // url: "/blueCycle/collect/getWaitingForClearingList",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/collect/getWaitingForClearingList",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

//  --------联单管理-----------
// 联单管理列表
serviceModule.getLianDanList = function () {
    var p = {
        url: "/blueCycle/handleOrder/getPageHandleOrderList",
        method: "get",
        baseURL: newWeb
    };
    return p;
};
// 导出
serviceModule.getHandleOrderListExport = function () {
    var p = {
        url: "/blueCycle/handleOrder/getHandleOrderListExport",
        method: "get",
        baseURL: newWeb,
    };
    return p;
};

// 查(分页)
serviceModule.getTransportGetByPage = function () {
    var p = {
        // url: "/auth/company/getTransportCompany",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/company/transport/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 查(不分页,启用的)
serviceModule.getTransportCompany = function () {
    var p = {
        // url: "/auth/company/getTransportCompany",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/company/transport/getEnableAll",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// --------运输公司管理 车辆-----------
// 增
serviceModule.createTransportVihicleCompany = function () {
    var p = {
        // url: "/auth/vehicle/createVehicle",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/add",
        method: "post",
        baseURL: newWeb

    };
    return p;
};

// 查
serviceModule.getTransportVihicleCompany = function () {
    var p = {
        // url: "/auth/vehicle/getVehiclePage",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// 根据运输公司编号查询车辆信息
serviceModule.getAllTransportVihicle = function () {
    var p = {
        // url: "/auth/vehicle/getVehicleList",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/getAllEnableByCompanyNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 根据运输公司编号查询不同状态的车辆信息
serviceModule.getAllTransportVihicleByStatus = function () {
    var p = {
        // url: "/auth/vehicle/getVehicleList",
        // method: "get",
        // baseURL: domainRoute
        url: "/web/api/transport/vehicle/getByStatus",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// --------运输公司管理 司机-----------

// 增
// serviceModule.createTransportDriverCompany = function () {
//     var p = {
//         url: "/driver/createDriver",
//         method: "post",
//         baseURL: newWeb
//     };
//     return p;
// };

// 删
// serviceModule.deleteTransportDriver = function (id) {
//     var p = {
//         url: "/driver/deleteDriverById?id=" + id,
//         method: "delete",
//         baseURL: newWeb
//     };
//     return p;
// };

// 改
// serviceModule.updateTransportDriver = function () {
//     var p = {
//         url: "/driver/updateDriver",
//         method: "post",
//         baseURL: newWeb
//     };
//     return p;
// };

// 查
serviceModule.getTransportDriver = function () {
    var p = {
        // url: "/admin/api/transport/driver/getByPage",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// --------清运调度单管理-----------

// 增
serviceModule.createTransportDispatch = function () {
    var p = {
        // url: "/blueCycle/transportClearOrder/createTransportClearOrder",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transportClearOrder/createTransportClearOrder",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 删
serviceModule.deleteTransportDispatch = function () {
    var p = {
        // url: `/blueCycle/transportClearOrder/deleteTransportClearOrderById?id=${id}`,
        // method: "delete",
        // baseURL: newWeb
        url: "/web/api/transportClearOrder/deleteTransportClearOrderByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 改
serviceModule.updateTransportDispatch = function () {
    var p = {
        // url: "/blueCycle/transportClearOrder/updateTransportClearOrder",
        // method: "put",
        // baseURL: newWeb
        url: "/web/api/transportClearOrder/updateTransportClearOrder",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 查
serviceModule.getTransportDispatch = function () {
    var p = {
        // url: "/blueCycle/transportClearOrder/getTransportClearOrderPageListByParams",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transportClearOrder/getPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 查询调度单详情
serviceModule.getTransportDispatchDetail = function () {
    var p = {
        // url: "/blueCycle/transportClearOrder/getTransportClearOrderById",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/transportClearOrder/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// 根据运输公司编号查询启用运输司机信息
serviceModule.getAllTransportGriver = function () {
    var p = {
        // url: "/admin/api/transport/driver/getByCompany",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/getByCompany",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// --------中转仓-----------

// 入仓管理列表
serviceModule.getInputStore = function () {
    var p = {
        // url: "/blueCycle/storageInputOrder/getStorageInputOrderPageListByParams",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/storageInputOrder/getStorageInputOrderPageListByParams",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 入库管理列表
serviceModule.getStoreList = function () {
    var p = {
        // url: "/blueCycle/storageInputOrder/getStorageInputOrderPageList",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/storageInputOrder/getPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 查询视频列表
serviceModule.getVideoUrlPage = function () {
    var p = {
        // url: "/device/videoUrl/getVideoUrlPage",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/video/getVideoUrl",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 查询海塑码列表
// serviceModule.getseaplasticCodePage = function () {
//     var p = {
//         // url: "/blueCycle/storageInputOrder/getStorageInputOrderPageList",
//         // method: "post",
//         // baseURL: newWeb
//         url: "/web/api/storageInputOrder/getPage",
//         method: "post",
//         baseURL: newWeb
//     };
//     return p;
// };

/* ------------ 中转仓调度单管理 ------------ */

// 增
serviceModule.createTransitDispatch = function () {
    var p = {
        // url: "/blueCycle/storageOutputOrder/createStorageOutputOrder",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/storageOutputOrder/createStorageOutputOrder",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 删
serviceModule.deleteTransitDispatch = function () {
    var p = {
        // url: `/blueCycle/storageOutputOrder/deleteStorageOutputOrderById?id=${id}`,
        // method: "delete",
        // baseURL: newWeb
        url: "/web/api/storageOutputOrder/deleteStorageOutputOrderById",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 改
serviceModule.updateTransitDispatch = function () {
    var p = {
        // url: "/blueCycle/storageOutputOrder/updateStorageOutputOrder",
        // method: "put",
        // baseURL: newWeb
        url: "/web/api/storageOutputOrder/updateStorageOutputOrder",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 查
serviceModule.getTransitDispatch = function () {
    var p = {
        // url: "/blueCycle/storageOutputOrder/getStorageOutputOrderPageListByParams",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/storageOutputOrder/getPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 获取中转仓调度单详情
serviceModule.getTransitDispatchDetail = function () {
    var p = {
        // url: "/blueCycle/storageOutputOrder/getStorageOutputOrderById",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/storageOutputOrder/getStorageOutputOrderByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 查询所有运输公司
// serviceModule.getAllTransportCompany = function () {
//     var p = {
//         url: "/getAllTransportCompany",
//         method: "post",
//         baseURL: newWeb
//     };
//     return p;
// };


// 通过运输公司查询所有司机
// serviceModule.getAllTransportDriver = function () {
//     var p = {
//         url: "/getAllTransportDriver",
//         method: "post",
//         baseURL: newWeb
//     };
//     return p;
// };

// 通过塑料种类库存
serviceModule.getStockByPlasticType = function () {
    var p = {
        // url: "/blueCycle/storageOrder/getStorageOrderPageList",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/storageOrder/getStorageOrderPageList",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 获取所有处置企业
serviceModule.getAllDisposalEnterprise = function () {
    var p = {
        // url: "/auth/company/getHandleCompany",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/getByStatus",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

/* ------------ 产品溯源 ------------ */

serviceModule.getPlasticBlockTraceSourcePageByParams = function () {
    var p = {
        // url: "/blueCycle/plasticBlock/getPlasticBlockTraceSourcePageByParams",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/plasticBlock/getPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 产品溯源导出
serviceModule.traceSourceExport = function () {
    var p = {
        // url: "/blueCycle/download/order/pdf/zip",
        // method: "post",
        // baseURL: newWeb,
        url: "/web/api/plasticBlock/order/pdf/zip",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 时间轴
// serviceModule.getTimeBase = function (id) {
//     var p = {
//         url: "/blueCycle/plasticBlock/getPlasticBlockTraceDetail/"+id,
//         method: "get",
//         baseURL: newWeb
//     };
//     return p;
// };
// 产品溯源详情
serviceModule.getTimeBase = function () {
    var p = {
        // url: "/blueCycle/plasticBlock/getPlasticBlockTraceDetailById",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/plasticBlock/getPlasticBlockTraceDetailByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 产品溯源-过程管理
serviceModule.getProcessmanage = function () {
    var p = {
        // url: "/blueCycle/plasticBlock/processManagement",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/plasticBlock/processManagement",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// --------oss删除-----------
serviceModule.ossDelete = function () {
    var p = {
        url: "/bridgeTrilateralApi/oss/deleteFile",
        method: "delete",
        baseURL: newWeb
    };
    return p;
};
// --------塑料类型-----------
serviceModule.getDictionaryListByCode = function () {
    var p = {
        // url: "/blueCycle/dictionary/getDictionaryListByCode",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/goods/category/getByParentCategoryNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

serviceModule.getStatisticalAnalysis = function () {
    var p = {
        // url: "/blueCycle/cockpit/getStatisticalAnalysis",
        // method: "get",
        // baseURL: newWeb,
        url: "/web/api/cockpit/getStatisticalAnalysis",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
/**
 * 中转仓管理
 */
//查询所有中转仓,不分页
//status不传查所有状态
serviceModule.getStorageDevice = function () {
    var p = {
        // url: "/admin/api/company/warehouse/getByStatus",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/getByStatus",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 新增
serviceModule.warehouseAdd = function () {
    var p = {
        // url: "/admin/api/company/warehouse/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 列表
serviceModule.warehouseGetByPage = function () {
    var p = {
        // url: "/admin/api/company/warehouse/getByPage",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 详情
serviceModule.warehouseDetail = function () {
    var p = {
        // url: "/admin/api/company/warehouse/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 禁用
serviceModule.warehouseDisable = function () {
    var p = {
        // url: "/admin/api/company/warehouse/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 启用
serviceModule.warehouseEnable = function () {
    var p = {
        // url: "/admin/api/company/warehouse/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 删除
serviceModule.warehouseDelete = function () {
    var p = {
        // url: "/admin/api/company/warehouse/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 编辑
serviceModule.warehouseEdit = function () {
    var p = {
        // url: "/admin/api/company/warehouse/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/warehouse/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

/**
 * 造粒厂
 */
// 列表
serviceModule.plantGetByPage = function () {
    var p = {
        // url: "/admin/api/company/disposal/plant/getByPage",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 新增
serviceModule.plantAdd = function () {
    var p = {
        // url: "/admin/api/company/disposal/plant/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 删除
serviceModule.plantDelete = function () {
    var p = {
        // url: "/admin/api/company/disposal/plant/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 禁用
serviceModule.plantDisable = function () {
    var p = {
        // url: "/admin/api/company/disposal/plant/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 启用
serviceModule.plantEnable = function () {
    var p = {
        // url: "/admin/api/company/disposal/plant/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 详情
serviceModule.plantDetail = function () {
    var p = {
        // url: "/admin/api/company/disposal/plant/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 修改
serviceModule.plantEdit = function () {
    var p = {
        // url: "/admin/api/company/disposal/plant/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/disposal/plant/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
/**
 * 手环吊坠
 */
// 列表
serviceModule.braceletGetByPage = function () {
    var p = {
        // url: "/admin/api/device/bracelet/getByPage",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/bracelet/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 新增
serviceModule.braceletAdd = function () {
    var p = {
        // url: "/admin/api/device/bracelet/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/bracelet/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 详情
serviceModule.braceletDetail = function () {
    var p = {
        // url: "/admin/api/device/bracelet/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/bracelet/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 删除
serviceModule.braceletDelete = function () {
    var p = {
        // url: "/admin/api/device/bracelet/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/bracelet/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 禁用
serviceModule.braceletDisable = function () {
    var p = {
        // url: "/admin/api/device/bracelet/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/bracelet/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 启用
serviceModule.braceletEnable = function () {
    var p = {
        // url: "/admin/api/device/bracelet/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/bracelet/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 编辑
serviceModule.braceletEdit = function () {
    var p = {
        // url: "/admin/api/device/bracelet/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/bracelet/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
/**
 * GPS设备管理
 */
// 列表
serviceModule.obdGetByPage = function () {
    var p = {
        // url: "/admin/api/device/obd/getByPage",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/obd/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 新增
serviceModule.obdAdd = function () {
    var p = {
        // url: "/admin/api/device/obd/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/obd/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 详情
serviceModule.obdDetail = function () {
    var p = {
        // url: "/admin/api/device/obd/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/obd/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 删除
serviceModule.obdDelete = function () {
    var p = {
        // url: "/admin/api/device/obd/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/obd/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 禁用
serviceModule.obdDisable = function () {
    var p = {
        // url: "/admin/api/device/obd/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/obd/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 启用
serviceModule.obdEnable = function () {
    var p = {
        // url: "/admin/api/device/obd/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/obd/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 编辑
serviceModule.obdEdit = function () {
    var p = {
        // url: "/admin/api/device/obd/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/obd/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
/**
 * 摄像头
 */
// 列表
serviceModule.cameraGetByPage = function () {
    var p = {
        // url: "/admin/api/device/camera/getByPage",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/camera/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 新增
serviceModule.cameraAdd = function () {
    var p = {
        // url: "/admin/api/device/camera/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/camera/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 详情
serviceModule.cameraDetail = function () {
    var p = {
        // url: "/admin/api/device/camera/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/camera/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 删除
serviceModule.cameraDelete = function () {
    var p = {
        // url: "/admin/api/device/camera/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/camera/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 禁用
serviceModule.cameraDisable = function () {
    var p = {
        // url: "/admin/api/device/camera/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/camera/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 启用
serviceModule.cameraEnable = function () {
    var p = {
        // url: "/admin/api/device/camera/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/camera/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 编辑
serviceModule.cameraEdit = function () {
    var p = {
        // url: "/admin/api/device/camera/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/device/camera/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
/**
 *
 * @returns 角色管理
 */
// 组织列表
serviceModule.getOrganizationData = function () {
    var p = {
        url: "/web/api/permission/blue/getDeptList",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 列表
serviceModule.getRolegetByPage = function () {
    var p = {
        // url: "/admin/api/role/getRoleCompanyList",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/permission/blue/role/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 获取权限树列表
serviceModule.menuList = function () {
    var p = {
        // url: "/admin/api/role/getRoleCompanyList",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/permission/blue/getList",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// 启用
serviceModule.roleEnable = function () {
    var p = {
        url: '/web/api/permission/blue/role/enable',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 禁用
serviceModule.roleDisable = function () {
    var p = {
        url: '/web/api/permission/blue/role/disable',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 删除
serviceModule.roleDelete = function () {
    var p = {
        url: '/web/api/permission/blue/role/delete',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 编辑角色
serviceModule.roleEdit = function () {
    var p = {
        url: '/web/api/permission/blue/role/edit',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 新增角色
serviceModule.roleAdd = function () {
    var p = {
        url: '/web/api/permission/blue/role/add',
        method: 'post',
        baseURL: newWeb
    }
    return p
}

/**
 * 用户管理
 */
// 不分页角色列表
serviceModule.getRoleList = function () {
    var p = {
        url: "/web/api/permission/blue/role/getRoleList",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 新增
serviceModule.userAdd = function () {
    var p = {
        // url: "/admin/api/user/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/opr/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 列表
serviceModule.userGetByPage = function () {
    var p = {
        // url: "/admin/api/user/getByPage",
        // url: "/auth/user/getByPage",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/blue/getByPage",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 禁用
serviceModule.userDisable = function () {
    var p = {
        // url: "/admin/api/user/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/opr/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 启用
serviceModule.userEnable = function () {
    var p = {
        // url: "/admin/api/user/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/opr/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 删除
serviceModule.userDelete = function () {
    var p = {
        // url: "/admin/api/user/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/opr/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 详情
serviceModule.userGetById = function () {
    var p = {
        // url: "/admin/api/user/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/blue/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 编辑
serviceModule.userEdit = function () {
    var p = {
        // url: "/admin/api/user/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/user/opr/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 查询角色名称列表
serviceModule.getRoleCompanyList = function () {
    var p = {
        // url: "/admin/api/user/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/permission/blue/getRoleDeptBizList",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// ---------------- 小兰之家 -----------------
// 获取详情
serviceModule.getHomeDetail = function () {
    var p = {
        // url: "/admin/api/company/blue/getById",
        url: "/web/api/company/blue/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 新增
serviceModule.addBlueHouse = function () {
    var p = {
        // url: "/admin/api/company/blue/add",
        url: '/web/api/company/blue/add',
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 删除
serviceModule.deleteBlueHouse = function () {
    var p = {
        // url: "/admin/api/company/blue/delete",
        url: '/web/api/company/blue/delete',
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 修改
serviceModule.updateHome = function () {
    var p = {
        // url: "/admin/api/company/blue/edit",
        url: "/web/api/company/blue/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 启用
serviceModule.enableBlueHouse = function () {
    var p = {
        // url: "/admin/api/company/blue/enable",
        url: '/web/api/company/blue/enable',
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 禁用
serviceModule.disableHome = function () {
    var p = {
        // url: "/admin/api/company/blue/disable",
        url: '/web/api/company/blue/disable',
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// --------- 运输公司管理 -------

// 获取详情
serviceModule.getTransferCompanyDetail = function () {
    var p = {
        // url: "/admin/api/company/transport/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/transport/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 查询所有启用的运输公司
serviceModule.getEnableTransferCompany = function () {
    var p = {
        // url: "/admin/api/company/transport/getEnableAll",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/transport/getEnableAll",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 增
serviceModule.addTransferCompany = function () {
    var p = {
        // url: "/admin/api/company/transport/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/transport/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 删
serviceModule.deleteTransferCompany = function () {
    var p = {
        // url: "/admin/api/company/transport/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/transport/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 改
serviceModule.updateTransferCompany = function () {
    var p = {
        // url: "/admin/api/company/transport/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/transport/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 启用
serviceModule.openTransferCompany = function () {
    var p = {
        // url: "/admin/api/company/transport/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/transport/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 禁用
serviceModule.disableTransferCompany = function () {
    var p = {
        // url: "/admin/api/company/transport/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/company/transport/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// --------- 司机管理 -------

// 获取详情
serviceModule.getDriverDetail = function () {
    var p = {
        // url: "/admin/api/transport/driver/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 增
serviceModule.addDrive = function () {
    var p = {
        // url: "/admin/api/transport/driver/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 删
serviceModule.deleteDrive = function () {
    var p = {
        // url: "/admin/api/transport/driver/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 改
serviceModule.updateDrive = function () {
    var p = {
        // url: "/admin/api/transport/driver/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 启用
serviceModule.openDrive = function () {
    var p = {
        // url: "/admin/api/transport/driver/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 禁用
serviceModule.disableDrive = function () {
    var p = {
        // url: "/admin/api/transport/driver/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/client/driver/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};


// ---------手环 -------------

// 查询已启用手环
// serviceModule.getEnableDriverGps = function () {
//     var p = {
//         url: "/admin/api/device/bracelet/getEnableAll",
//         method: "post",
//         baseURL: newWeb
//     };
//     return p;
// };

// --------- 车辆管理 -------

// 获取详情
serviceModule.getVihicleDetail = function () {
    var p = {
        // url: "/admin/api/transport/vehicle/getById",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/getByNo",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 增
serviceModule.addVihicle = function () {
    var p = {
        // url: "/admin/api/transport/vehicle/add",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/add",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 删
serviceModule.deleteVihicle = function () {
    var p = {
        // url: "/admin/api/transport/vehicle/delete",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/delete",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 改
serviceModule.updateVihicle = function () {
    var p = {
        // url: "/admin/api/transport/vehicle/edit",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/edit",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 启用
serviceModule.openVihicle = function () {
    var p = {
        // url: "/admin/api/transport/vehicle/enable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/enable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 禁用
serviceModule.disableVihicle = function () {
    var p = {
        // url: "/admin/api/transport/vehicle/disable",
        // method: "post",
        // baseURL: newWeb
        url: "/web/api/transport/vehicle/disable",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// --------OCR识别------------

// 驾驶证识别
serviceModule.recognizeDrivingLicenseByUrl = function () {
    var p = {
        // url: "/admin/ocr/recognizeDrivingLicenseByUrl",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/ocr/recognizeDrivingLicenseByUrl",
        method: "post",
        baseURL: newWeb
    };
    return p;
};

// 行驶证识别
serviceModule.recognizeVehicleLicenseByUrl = function () {
    var p = {
        // url: "/admin/ocr/recognizeVehicleLicenseByUrl",
        // method: "get",
        // baseURL: newWeb
        url: "/web/api/ocr/recognizeVehicleLicenseByUrl",
        method: "post",
        baseURL: newWeb
    };
    return p;
};
// 身份证识别
serviceModule.recognizeIdcardByUrl = function () {
    var p = {
        // url: '/admin/ocr/recognizeIdcardByUrl',
        // method: 'get',
        // baseURL: newWeb
        url: "/web/api/ocr/recognizeIdCardByUrl",
        method: "post",
        baseURL: newWeb
    }
    return p
}

/**
 * 视频评级
 */
serviceModule.updateVideoRate = function () {
    var p = {
        // url: '/device/videoUrl/updateVideoUrl',
        // method: 'put',
        // baseURL: newWeb
        url: "/web/api/video/updateVideoUrl",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 评级列表
serviceModule.getVideoTypeByTime = function () {
    var p = {
        // url: '/blueCycle/handlePrillOrder/getVideoTypeByTime',
        // method: 'get',
        // baseURL: newWeb
        url: "/web/api/video/rate/getVideoTypeList",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 根据类型查找
serviceModule.getOrderByVideo = function () {
    var p = {
        // url: '/blueCycle/handlePrillOrder/getOrderByVideo',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/video/rate/getVideoByOrder",
        method: "post",
        baseURL: newWeb
    }
    return p
}
/**
 * 成员管理
 */
// 根据小蓝之家id查询启用的小蚂蚁
serviceModule.getEnableAllAnt = function () {
    var p = {
        // url: '/admin/api/client/ants/getEnableAll',
        // method: 'get',
        // baseURL: newWeb
        url: "/web/api/client/ants/getEnableAllByCompanyNo",
        method: "post",
        baseURL: newWeb
    }
    return p
}

/**
 * 物料平衡表
 */
// 汇总
serviceModule.getMaterialBalanceCountDto = function () {
    var p = {
        // url: '/blueCycle/materialBalance/getMaterialBalanceCountDto',
        url: '/web/api/materialBalance/getMaterialBalanceCountDto',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 导出
serviceModule.excelAllMaterialBalance = function () {
    var p = {
        // url: '/blueCycle/materialBalance/excelAllMaterialBalance',
        url: '/web/api/materialBalance/excelAllMaterialBalance',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 塑料详情
serviceModule.getMaterialTypeCountDto = function () {
    var p = {
        // url: '/blueCycle/materialBalance/getMaterialTypeCountDto',
        url: '/web/api/materialBalance/getMaterialTypeCountDto',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 入库-总计
serviceModule.getCountStorageInputOrderTotalWeight = function () {
    var p = {
        // url: '/blueCycle/storageInputOrder/getCountStorageInputOrderTotalWeight',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/materialBalance/getCountStorageInputOrderTotalWeight",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 出库-总计
serviceModule.getCountStorageOutputOrderTotalWeight = function () {
    var p = {
        // url: '/blueCycle/storageOutputOrder/getCountStorageOutputOrderTotalWeight',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/materialBalance/getCountStorageOutputOrderTotalWeight",
        method: "post",
        baseURL: newWeb
    }
    return p
}
/**
 * 接收管理
 */
// 列表
serviceModule.getreceiveOrder = function () {
    var p = {
        // url: '/blueCycle/receiveOrder/page',
        // method: 'post',
        // baseURL: newWeb
        url: '/web/api/receiveOrder/page',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 增
serviceModule.addreceiveOrder = function () {
    var p = {
        // url: '/blueCycle/receiveOrder/add',
        // method: 'post',
        // baseURL: newWeb
        url: '/web/api/receiveOrder/add',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 改
serviceModule.editreceiveOrder = function () {
    var p = {
        // url: '/blueCycle/receiveOrder/edit',
        // method: 'post',
        // baseURL: newWeb
        url: '/web/api/receiveOrder/edit',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 详情
serviceModule.detailreceiveOrder = function () {
    var p = {
        // url: '/blueCycle/receiveOrder/getById',
        // method: 'get',
        // baseURL: newWeb
        url: '/web/api/receiveOrder/getByNo',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 删除
serviceModule.deletereceiveOrder = function () {
    var p = {
        // url: '/blueCycle/receiveOrder/delete',
        // method: 'get',
        // baseURL: newWeb
        url: '/web/api/receiveOrder/delete',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
//根据小蓝之家ID查询接收单
serviceModule.getReceiveOrderById = function () {
    var p = {
        // url: '/blueCycle/receiveOrder/getByHomeId',
        // method: 'get',
        // baseURL: newWeb
        url: '/web/api/receiveOrder/getByHomeNo',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 获取地区信息
serviceModule.getRegion = function () {
    var p = {
        url: '/admin/api/region/getRegion',
        method: 'get',
        baseURL: newWeb
    }
    return p
}
// 获取小蚂蚁列表
serviceModule.getByPageAnts = function () {
    var p = {
        // url: '/admin/api/client/ants/getByPage',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/getByPage",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 根据id查详情数据
serviceModule.getByIdAnts = function () {
    var p = {
        // url: '/admin/api/client/ants/getById',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/getByNo",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 新增小蚂蚁
serviceModule.addAnts = function () {
    var p = {
        // url: '/admin/api/client/ants/add',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/add",
        method: "post",
        baseURL: newWeb
    }
    return p
}

serviceModule.editAnts = function () {
    var p = {
        // url: '/admin/api/client/ants/edit',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/edit",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 启用小蚂蚁
serviceModule.enableAnts = function () {
    var p = {
        // url: '/admin/api/client/ants/enable',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/enable",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 禁用小蚂蚁
serviceModule.disableAnts = function () {
    var p = {
        // url: '/admin/api/client/ants/disable',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/disable",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 删除小蚂蚁
serviceModule.deleteAnts = function () {
    var p = {
        // url: '/admin/api/client/ants/delete',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/delete",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 查询轨迹
serviceModule.getDeviceLocationList = function () {
    var p = {
        // url: '/blueCycle/fence/getDeviceLocationList',
        url: '/web/api/fence/getDeviceLocationList',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 电子围栏 列表
serviceModule.getClientDeviceAlarmPage = function () {
    var p = {
        // url: '/blueCycle/fence/getClientDeviceAlarmPage',
        url: '/web/api/fence/getClientDeviceAlarmPage',
        method: 'post',
        baseURL: newWeb
    }
    return p
}
// 预警列表
serviceModule.clientDeviceAlarmList = function () {
    var p = {
        // url: '/auth/clientDeviceAlarm/getPage',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/fence/getPage",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 详情
serviceModule.clientAntsGetById = function () {
    var p = {
        // url: '/admin/api/client/ants/getById',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/client/ants/getByNo",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 记过,忽略
serviceModule.clientDeviceAlarmAudit = function () {
    var p = {
        // url: '/auth/clientDeviceAlarm/audit',
        // method: 'post',
        // baseURL: newWeb
        url: "/web/api/fence/audit",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 围栏
serviceModule.getTraceGeofenceList = function () {
    var p = {
        // url: '/blueCycle/traceGeofence/getTraceGeofenceList',
        // method: 'get',
        // baseURL: newWeb
        url: "/web/api/traceGeofence/getTraceGeofenceList",
        method: "post",
        baseURL: newWeb
    }
    return p
}
/**
 *
 * @returns 监管单位
 */
// 分页列表
serviceModule.superviseGetByPage = function () {
    var p = {
        url: "/web/api/company/supervise/getByPage",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 详情
serviceModule.superviseGetByNo = function () {
    var p = {
        url: "/web/api/company/supervise/getByNo",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 启用
serviceModule.superviseEnable = function () {
    var p = {
        url: "/web/api/company/supervise/enable",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 禁用
serviceModule.superviseDisable = function () {
    var p = {
        url: "/web/api/company/supervise/disable",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 删除
serviceModule.superviseDelete = function () {
    var p = {
        url: "/web/api/company/supervise/delete",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 编辑
serviceModule.superviseEdit = function () {
    var p = {
        url: "/web/api/company/supervise/edit",
        method: "post",
        baseURL: newWeb
    }
    return p
}
// 新增
serviceModule.superviseAdd = function () {
    var p = {
        url: "/web/api/company/supervise/add",
        method: "post",
        baseURL: newWeb
    }
    return p
}
/**
 * 角色管理
 */
// 分页列表
// serviceModule.roleGetByPage = function () {
//     var p = {
//         url: "/web/api/permission/blue/role/getByPage",
//         method: "post",
//         baseURL: newWeb
//     }
//     return p
// }
// // 启用
// serviceModule.roleEnable = function () {
//     var p = {
//         url: "/web/api/permission/blue/role/enable",
//         method: "post",
//         baseURL: newWeb
//     }
//     return p
// }
// // 禁用
// serviceModule.roleDisable = function () {
//     var p = {
//         url: "/web/api/permission/blue/role/disable",
//         method: "post",
//         baseURL: newWeb
//     }
//     return p
// }
// // 删除
// serviceModule.roleDelete = function () {
//     var p = {
//         url: "/web/api/permission/blue/role/delete",
//         method: "post",
//         baseURL: newWeb
//     }
//     return p
// }
// // 编辑
// serviceModule.roleEdit= function () {
//     var p = {
//         url: "/web/api/permission/blue/role/edit",
//         method: "post",
//         baseURL: newWeb
//     }
//     return p
// }
// // 新增
// serviceModule.roleAdd= function () {
//     var p = {
//         url: "/web/api/permission/blue/role/add",
//         method: "post",
//         baseURL: newWeb
//     }
//     return p
// }
const ApiSetting = {
    ...serviceModule,
    // ...newApi
};

export default ApiSetting;
