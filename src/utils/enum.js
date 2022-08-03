// 企业类型
export const CompanyType = {
  1: "渔船",
  2: "渔港",
  3: "收集企业",
  4: "运输企业",
  5: "处置企业",
  6: "运营企业",
  7: "监管单位"
};
export const CompanyTypeOption = [
  {label: "渔船", value: 1},
  {label: "渔港", value: 2},
  {label: "收集企业", value: 3},
  {label: "运输企业", value: 4},
  {label: "处置企业", value: 5},
  {label: "运营企业", value: 6},
  {label: "监管单位", value: 7}
];

// 政策直通
// 1、补助类型
export const policySubsidyType = {
  0: "转产补助",
  1: "拆解补助",
  2: "专项资金补助",
  3: "救生筏补助"
};
// 金融服务
// 1、银行类型
export const bankType = {
  1: "交通银行",
  2: "农商行"
};
// 2、贷款类型
export const loanType = {
  1: "抵押贷款",
  2: "信用贷款"
};
// 供应链服务
// 1、一级类目
export const primaryCategoryType = {
  1: "生活物资",
  2: "生产物资",
  3: "维修保养",
  4: "其它"
};
// 单位管理
// 1、渔港状态
export const fishingPortStatusType = {
  1: "已联网",
  2: "未联网"
};
// 2、渔港级别
export const fishingPortLevelType = {
  0: "中心渔港",
  1: "一级渔港",
  2: "二级渔港",
  3: "三级渔港",
  4: "等级以下"
};
// 3、渔船状态
export const fishingBoatType = {
  1: "正常",
  2: "当年未产废",
  // '3': '应产废未产废',
  // '4': '当年未产废，应产废未产废'
  3: "超一年未产废",
  4: "应产废未产废",
  5: "当年未产废，应产废未产废",
  6: "超一年未产废，应产废未产废"
};
// 4、渔船预警状态
export const fishingBoatWarningType = {
  2: "当年未产废",
  // '3': '应产废未产废',
  // '4': '当年未产废，应产废未产废'
  3: "超一年未产废",
  4: "应产废未产废",
  5: "当年未产废，应产废未产废",
  6: "超一年未产废，应产废未产废"
};
// 5、渔船健康码
export const boatHealthCodeType = {
  0: "绿码",
  1: "黄码",
  2: "红码"
};
// 6、载具类型
export const carryType = {
  0: "车",
  1: "接收船",
  2: "收集船（含监管一体机)"
};
// 7、 状态
export const statusType = {
  1: "正常",
  2: "异常"
};
// 8、 污染物种类
export const contaminationType = {
  C110007: "废铅酸电池",
  C110011: "含油污水",
  C110012: "生活污水",
  C110013: "废机油",
  C110014: "含有毒液体物质的污水",
  C110015: "生活垃圾",
  C110016: "油包",
  C110017: "废蓄电池",
  C110018: "易腐垃圾",
  C110019: "可回收垃圾",
  C110020: "有害垃圾",
  C110021: "船舶垃圾",
  C110022: "废旧渔网",
  C110023: "废弃泡沫",
  C110024: "废旧塑料"
};
// 9，联单进度
export const jointPolicyType = {
  // '1': '已入仓',
  // '2': '未入仓'
  1: "已接收",
  2: "已入仓",
  3: "运输中",
  4: "已处置"
};
// 10，在线状态
export const onlineStatusType = {
  1: "在线",
  2: "离线",
  3: "内部联网断开",
  4: "休眠"
};
// 11，设备状态
export const deviceStatusType = {
  1: "正常",
  2: "预警",
  3: "故障",
  4: "预警、故障",
  5: "异常"
};
// 12，运输签署
export const signingType = {
  1: "运输未签署",
  2: "运输已签署",
  3: "已完成"
};
// 健康码状态
export const HealthCode = [
  {label: "绿码", value: '0'},
  {label: "黄码", value: '1'},
  {label: "红码", value: '2'}
];

// 船籍港
export const HomePort = [
  {label: "渔港名称", value: "companyName"},
  {label: "渔港编号", value: "companyId"}
];

// 是否
export const AutoState = [
  {label: "是", value: '0'},
  {label: "否", value: '1'}
];

// 资料类型
export const MaterialType = [
  {label: "图文", value: 1},
  {label: "视频", value: 2}
];

// 学员身份
export const StudentStatus = [
  {label: "渔名渔企", value: 1},
  {label: "机关干部", value: 2},
  {label: "学校师生", value: 3},
  {label: "其他群众", value: 4}
];

// 来源
export const SourceType = [
  {label: "浙江省农业农村厅", value: '0'},
  {label: "其他", value: '1'}
];

// 污染物来源
export const WasteType = [
  {label: "废铅酸电池", value: "C110007"},
  {label: "含油污水", value: "C110011"},
  {label: "生活污水", value: "C110012"},
  {label: "废机油", value: "C110013"},
  {label: "含有毒液体物质的污水", value: "C110014"},
  {label: "生活垃圾", value: "C110015"},
  {label: "油包", value: "C110016"},
  {label: "废蓄电池", value: "C110017"},
  {label: "易腐垃圾", value: "C110018"},
  {label: "可回收垃圾", value: "C110019"},
  {label: "有害垃圾", value: "C110020"},
  {label: "船舶垃圾", value: "C110021"},
  {label: "废旧渔网", value: "C110022"},
  {label: "废弃泡沫", value: "C110023"},
  {label: "废旧塑料", value: "C110024"}
];

// 银行类型
export const BankType = [
  {label: "交通银行", value: "交通银行"},
  {label: "农商行", value: "农商行"}
];

// 预警类型
export const AlertType = [
  {label: "当年未产废", value: 2},
  {label: "超一年未产废", value: 3},
  {label: "应产废未产废", value: 4},
  {label: "当年未产废，应产废未产废", value: 5},
  {label: "超一年未产废，应产废未产废", value: 6}
];

export const userIdentity = {
  0: "非渔民",
  1: "渔民"
};

// 订单状态
export const OrderStatus = [
  {label: "待支付", value: 1},
  {label: "待发货", value: 10},
  {label: "已发货", value: 20},
  {label: "已取消", value: 30},
  {label: "退款完成", value: 50},
  {label: "已签收", value: 60},
  {label: "已完成", value: 100},
];


// 商品状态
export const Goodstatus = [
  {label: "未审核", value: '0'},
  {label: "审核通过", value: '1'},
  {label: "审核拒绝", value: '2'},
  {label: "取消审核", value: '3'},
  {label: "申请审核", value: '4'},
];

// 库存
export const GoodsRemain = [
  {label: "已售罄", value: '0'},
];

// 证件类型
export const RegisterType = [
  {label: "身份证", value: '0'},
  {label: "护照", value: '1'},
];

// 主营业务
export const MainBusiness = [
  {label: "生活物资", value: 1},
  {label: "生产物资", value: 2},
  {label: "维修保养", value: 3},
  {label: "其他", value: 4},
];

// 支付方式
export const PayType = [
  {label: "支付宝", value: '1'},
  {label: "微信", value: '2'},
  {label: "云闪付", value: '3'},
];

// 是否
export const AutoSale = [
  {label: "是", value: '1'},
  {label: "否", value: '0'}
];

// 退款单状态
export const RefundOrderStatus = [
  {label: "待商家审核", value: '0'},
  {label: "商家审核已通过", value: '10'},
  {label: "商家已拒绝", value: '20'},
  {label: "待平台审核", value: '21'},
  {label: "平台已拒绝", value: '25'},
  {label: "平台已同意", value: '30'},
  {label: "用户已取消", value: '35'},
  {label: "退款中", value: '40'},
  {label: "退款失败", value: '50'},
  {label: "已完成", value: '100'},
];

// 财务审核
export const WithdrawStatus = [
  {label: "待审核", value: '1'},
  {label: "提现拒绝", value: '2'},
  {label: "已同意", value: '3'},
  {label: "提现中", value: '4'},
  {label: "提现失败", value: '5'},
  {label: "提现成功", value: '100'},
];


// 退款原因类型
export const RefundReasonType = [
  {label: "质量问题", value: '1'},
  {label: "数量不足", value: '2'},
  {label: "买多了/不想要", value: '3'},
  {label: "和店家协商一致", value: '4'},
];

// 退款原因类型
export const EvaluationGrad = [
  {label: "一星", value: 1},
  {label: "二星", value: 2},
  {label: "三星", value: 3},
  {label: "四星", value: 4},
  {label: "五星", value: 5},
];


/* ----------------- 状态事件 --------------- */

// 建议三个选项以上
export function datafiltering(value, arr) {
  // console.log(arr.find(item => item.value == value));
  let res = arr.find(item => item.value == value)
  return res ? res : {};
}
