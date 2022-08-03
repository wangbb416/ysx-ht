export const checkRecordsConfig = [
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
    field: "",
    slotName: "data_Operate",
  },
]

export const ScoreConfig = [
  {
    label: "序号",
    field: "id"
  },
  {
    label: "渔船名称",
    field: "companyName"
  },
  {
    label: "得分",
    field: "score"
  },
  {
    label: "创建时间",
    field: "createTimeFormat"
  },
  {
    label: "渔船建造时间",
    field: "boatAge"
  },
  {
    label: "操作",
    field: "",
    slotName: "data_Operate",
  },
]

export const ScoreDeatilConfig = [
  {
    label: "序号",
    field: "id"
  },
  {
    label: "渔船名称",
    field: "companyName"
  },
  {
    label: "行为",
    field: "behavior"
  },
  {
    label: "得分",
    field: "value"
  },
  {
    label: "创建时间",
    field: "createTime"
  }
]



export const SecurityCheckRecordConfig = [
  {
    label: "序号",
    field: "id"
  },
  {
    label: "渔船名称",
    field: "companyName"
  },
  {
    label: "渔船负责人姓名",
    field: "nickname"
  },
  {
    label: "渔船负责人手机号",
    field: "mobile"
  },
  {
    label: "录入人名称",
    field: "createUser"
  },
  {
    label: "录入人时间",
    field: "insertTime"
  },
  {
    label: "录入人身份",
    field: "createIdentity",
    slotName: "slotCreateIdentity",
  },
  {
    label: "操作",
    field: "",
    slotName: "data_Operate",
  },
]


export const picFile = [
  {
    name: 'wharf',
    label: '码头',
    picList: [],
    account: [1, 3, 7],
    notes: '渔民在码头图片(体现陆上参照物，表示位置）',
  },
  {
    name: 'fishingBoat',
    label: '渔船',
    picList: [],
    account: [1, 3, 7],
    notes: '渔民上渔船图片（体现渔船船名号）',
  },
  {
    name: 'lifeVest',
    label: '救生衣',
    picList: [],
    account: [1, 3, 7],
    notes: '检查救生衣（人员检查图片、总有效救生衣数量图片、证书核定人数特写图片）',
  },
  {
    name: 'extinguisher',
    label: '灭火器',
    picList: [],
    account: [1, 3, 7],
    notes: '检查灭火器（人员检查图片、灭火器有效期特写图片）',
  },
  {
    name: 'lifeRing',
    label: '救生圈',
    picList: [],
    account: [1, 3, 7],
    notes: '检查救生圈有效配置情况（现场检查图片）',
  },
  {
    name: 'lifeRaft',
    label: '救生筏',
    picList: [],
    account: [1, 3, 7],
    notes: '检查救生筏安装情况（现场检查图片）',
  },
  {
    name: 'boatWide',
    label: '船舶宽度',
    picList: [],
    account: [3, 7],
    notes: '检查船舶宽度（带上皮尺，量船宽图片）',
  },
  {
    name: 'netCondition',
    label: '网具情况',
    picList: [],
    account: [3, 7],
    notes: '检查网具情况（执法人员检查网具图片）',
  },
  {
    name: 'catchLog',
    label: '捕捞日志',
    picList: [],
    account: [3, 7],
    notes: '检查捕捞日志（航行日志）（现场检查图片）',
  },
  {
    name: 'coincident',
    label: '职务船员人证相符情况',
    picList: [],
    account: [1, 3, 7],
    notes: '检查职务船员人证相符情况（职务船员持职务证书图片）',
  },
  {
    name: 'valid',
    label: '船舶证书有效性情况',
    picList: [],
    account: [1, 3, 7],
    notes: '检查船舶证书有效性情况（现场检查图片）',
  },
  {
    name: 'onLine',
    label: '北斗、AIS在线情况',
    picList: [],
    account: [1, 3, 7],
    notes: '检查北斗、AIS在线情况（执法人员连同设备图片）',
  },
  {
    name: 'inwardOutwardPort',
    label: '进出港报告情况',
    picList: [],
    account: [3, 7],
    notes: '检查进出港报告情况（手机端现场打开核实图片）',
  },
  {
    name: 'electricAppliance',
    label: '船上电器安全使用情况',
    picList: [],
    account: [3, 7],
    notes: '检查船上电器安全使用情况（现场检查图片）',
  },
  {
    name: 'oilWaterSeparator',
    label: '油水分离器使用情况',
    picList: [],
    account: [3, 7],
    notes: '检查油水分离器使用情况（现场检查图片）',
  },
  {
    name: 'collectFacility',
    label: '生活污水收集设备',
    picList: [],
    account: [3, 7],
    notes: '检查生活污水收集设备（现场检查图片）',
  },
  {
    name: 'collectCondition',
    label: '含油污水收集情况',
    picList: [],
    account: [3, 7],
    notes: '检查含油污水收集情况（现场检查图片）',
  },
  {
    name: 'trashCan',
    label: '生活垃圾桶',
    picList: [],
    account: [3, 7],
    notes: '检查生活垃圾桶（现场检查图片）此外：到该船所在公司检查',
  },
  {
    name: 'damageInsurance',
    label: '船损保险情况',
    picList: [],
    account: [1, 3, 7],
    notes: '船损保船员意外险情况险情况（含船名号保单图片）',
  },
  {
    name: 'accidentInsurance',
    label: '船员意外险情况',
    picList: [],
    account: [3, 7],
    notes: '船员意外险情况（含人数保单图片）',
  },
  {
    name: 'sailorMessage',
    label: '所有船员信息',
    picList: [],
    account: [1, 3, 7],
    notes: '检查所有船员信息（登记表或身份证或船员拿工作证照片相关图片）',
  },
]

export const PortRecordConfig = [
  {
    label: "船名",
    field: "name"
  },
  {
    label: "港口名称",
    field: "portName"
  },
  {
    label: "状态",
    field: "actionState",
    slotName: "slotActionState",
  },
  {
    label: "(出港/入港) 时间",
    field: "actionTime"
  },
  {
    label: "联系人",
    field: "linkman"
  },
  {
    label: "电话",
    field: "phone"
  },
  {
    label: "记录创建时间",
    field: "createTime",
  }
]


export const PortCleanConfig = [
  {
    label: "姓名",
    field: "username"
  },
  {
    label: "电话",
    field: "mobile"
  },
  {
    label: "二维码",
    field: "",
    slotName: "data_code",
  },
  {
    label: "操作",
    field: "",
    slotName: "data_operate",
  }
]
