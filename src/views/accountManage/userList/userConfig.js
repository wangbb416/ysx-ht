export const organizationData = [
    {id:1, name:"组织1"},
    {id:2, name:"小蓝之家"},
    {id:3, name:"运营平台"},
    {id:4, name:"中转仓库"},
    {id:7, name:"运输公司"},
   
]


// 如果是小蓝之家 或 运输公司,需要同时把关联组织返给前端
export const xlData = [
    {
        roleId:2,
        roleName:"管理员",
        companyList:[
            {id:1,name:"张三",organization:"小蓝之家A"},
            {id:2,name:"李四",organization:"小蓝之家B"},
            {id:3,name:"王五",organization:"小蓝之家C"},
        ]
    },
    {
        roleId:3,
        roleName:"小蚂蚁",
        companyList:[
            {id:1,name:"蚂蚁1",organization:"小蓝之家A"},
            {id:2,name:"蚂蚁2",organization:"小蓝之家B"},
            {id:3,name:"蚂蚁3",organization:"小蓝之家C"},
        ]
    },
]
export const zzcData = [
    {
        roleId:4,
        roleName:"仓管员",
        companyList:[
            {id:1,name:"中转仓A",organization:""},
            {id:2,name:"中转仓B",organization:""},
            {id:3,name:"中转仓C",organization:""},
        ]
    },
]
export const ywData = [
    {
        roleId:5,
        roleName:"运维",
        companyList:[]
    },
]