/* ----------------- 运营管理 --------------- */

// 用户列表
export const userListConfig = [
  {
    label: "用户名",
    field: "username"
  },
  {
    label: "姓名",
    field: "nickname"
  },
  {
    label: "手机号",
    field: "mobile"
  },
  {
    label: "角色",
    field: "roleName"
  },
  {
    label: "单位名称",
    field: "companyName"
  },
  {
    label: "单位类型",
    field: "companyType",
    slotName: "slotCompanyType"
  },
  {
    label: "创建时间",
    field: "createTime",
    sortable: true,
    slotName: "slotCreateTime"
  },
  {
    label: "最后登录IP",
    field: "lastLoginIp"
  },
  {
    label: "最后登录时间",
    field: "lastLoginTime",
    sortable: true,
    slotName: "slotLastLoginTime"
  },
  {
    label: "操作",
    field: "lastLoginTime",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]

// 角色列表
export const rolelistTabel = [
  {
    label: "角色名称",
    field: "roleName"
  },
  {
    label: "操作",
    field: "lastLoginTime",
    slotName: "data_Operate",
    otherConfig: {width: "120"}
  },
]


