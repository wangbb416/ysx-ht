/* ----------------- 金融服务 --------------- */

// 贷款记录
export const loanRecordTable = [
  {
    label: "申请人",
    field: "username"
  },
  {
    label: "电话",
    field: "mobile"
  },
  {
    label: "贷款类型",
    field: "loanTypeStr"
  },
  {
    label: "贷款金额 (元)",
    field: "loanAmountStr"
  },
  {
    label: "银行类型",
    field: "bankTypeStr"
  },
  {
    label: "信用分",
    field: "score"
  },
  {
    label: "创建时间",
    sortable: true,
    field: "createTime"
  }
];
