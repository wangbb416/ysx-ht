/* ----------------- 政策直通 --------------- */

// 惠渔政策
export const favorablefishingpolicyTabel = [
  {
    label: "链接标题",
    field: "content"
  },
  {
    label: "链接",
    slotName: "slotpath"
  },
  {
    label: "来源",
    slotName: "slotpolicyType"
  },
  {
    label: "更新时间",
    sortable: true,
    slotName: "slotupdateTime",
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
];

// 政策补贴
export const policySubsidiesTable = [
  {
    label: "船舶名称",
    field: "companyName"
  },
  {
    label: "姓名",
    field: "name"
  },
  {
    label: "身份证",
    field: "idNum"
  },
  {
    label: "补助类型",
    field: "subsidyTypeStr"
  },
  {
    label: "补助金额",
    field: "subsidyMoneyStr"
  },
  {
    label: "补助时间",
    sortable: true,
    field: "subsidyTime"
  }
];

// 建议汇总
export const proposalListConfig = [
  {
    label: "条目式名称",
    field: "name"
  },
  {
    label: "现状",
    field: "situation"
  },
  {
    label: "具体建议",
    field: "suggest"
  },
  {
    label: "是否紧急",
    field: "isUrgencyStr"
  },
  {
    label: "联系人",
    field: "linkman"
  },
  {
    label: "联系电话",
    field: "linkmanPhone"
  },
  {
    label: "提交时间",
    sortable: true,
    field: "createTime"
  },
  {
    label: "操作",
    slotName: "data_Operate",
    otherConfig: { width: "120" }
  }
];

// 应用评价汇总
export const applicationEvaluationConfig = [
  {
    label: "评价内容",
    field: "content"
  },
  {
    label: "评价等级",
    field: "grade",
    slotName: "slotgrade"
  },
  {
    label: "联系人",
    field: "linkman"
  },
  {
    label: "联系电话",
    field: "phone"
  },
];


// 服务评价汇总
export const serviceEvaluationConfig = [
  {
    label: "评价内容",
    field: "content"
  },
  {
    label: "评价等级",
    field: "grade",
    slotName: "slotgrade"
  },
  {
    label: "联系人",
    field: "linkman"
  },
  {
    label: "联系电话",
    field: "phone"
  },
];
