
/* ----------------- 运营管理 --------------- */

// 用户列表
import axios from "./axios";

export function usersSearch(data) {
  return axios({
    method: "get",
    url: "/users/search",
    params: data
  })
}

// 新增
export function addUser(data) {
  return axios({
    method: "post",
    url: "/users",
    data: data
  })
}

// 修改
export function updateUser(id, data) {
  return axios({
    method: "put",
    url: `/users/${id}`,
    data: data
  })
}

// 删除
export function deleteUser(id) {
  return axios({
    method: "DELETE",
    url: `/users/${id}`,
  })
}

// 获取角色信息
export function getRoles(data) {
  return axios({
    method: "get",
    url: "/roles",
    params: data
  })
}

// 获取监管单位
export function getCompanies(data) {
  return axios({
    method: "get",
    url: "/companies/search/simple",
    params: data
  })
}


// 角色列表-删除
export function deleteRoles(id) {
  return axios({
    method: "delete",
    url: `/roles/${id}`
  })
}


// 角色列表-添加
export function addRoles(data) {
  return axios({
    method: "post",
    url: '/fish-easy/user/rbacRole/add',
    data: data
  })
}

// 获取角色 - new
export function getRolesNew(data) {
  return axios({
    method: "get",
    url: "/fish-easy/user/rbacRole/page",
    params: data
  })
}
