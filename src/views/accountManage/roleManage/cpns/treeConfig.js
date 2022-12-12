export const PcManage =  [
    {
        menuNo: 1,
        name: "小蓝之家",
        status:"0",//0-启用 1-未启用
        menuParentNo:0,//父级id
        path:"/receiveManage",//页面路径
        icon: 'icon-shangjia',//图标
        btnList:[],//没有按钮级 为空
        children: [
            {
                menuNo: 2,
                name: "接收管理",
                status:"0",
                menuParentNo:1,
                path:"/receiveManage",
                icon: '',
                btnList:[
                    {btnId:1,name:"增删改",checked:true},
                    {btnId:2,name:"启用禁用",checked:false},
                    // {btnId:3,name:"导出",checked:false},
                ],
            },
            {
                menuNo: 3,
                name: "清运需求管理",
                status:"0",
                menuParentNo:1,
                path:"/declarePlace",
                icon: '',
                btnList:[
                    {btnId:1,name:"增删改",checked:false},
                    {btnId:2,name:"启用禁用",checked:false},
                ],
            },
            {
                menuNo: 4,
                name: "清运统计",
                status:"0",
                menuParentNo:1,
                path:"/applySummary",
                icon: '',
                btnList:[
                    {btnId:1,name:"增删改",checked:false},
                    {btnId:2,name:"启用禁用",checked:false},
                ],
            },
        ],
    },
    {
        menuNo: 5,
        name: "收集管理",
        status:"1",//0-启用 1-未启用
        menuParentNo:0,//父级id
        path:"/receiveManage",//页面路径
        icon: 'icon-shangjia',//图标
        btnList:[],//没有按钮级 为空
        children: [
            {
                menuNo: 6,
                name: "小蓝之家管理",
                status:"1",
                menuParentNo:1,
                path:"/receiveManage",
                icon: '',
                btnList:[
                    {btnId:1,name:"增删改",checked:false},
                    {btnId:2,name:"启用禁用",checked:false},
                ],
                children:[
                    {
                        menuNo:10,
                        name: "成员管理",
                        status:"1",
                        menuParentNo:1,
                        path:"/receiveManage",
                        icon: '',
                        btnList:[
                            {btnId:1,name:"增删改",checked:false},
                            {btnId:2,name:"启用禁用",checked:false},
                        ],
                    }
                ]
            },
            {
                menuNo: 7,
                name: "电子围栏",
                status:"1",
                menuParentNo:1,
                path:"/receiveManage",
                icon: '',
                btnList:[
                    {btnId:1,name:"增删改",checked:false},
                    {btnId:2,name:"启用禁用",checked:false},
                ],
            },
            {
                menuNo: 8,
                name: "清运需求审核",
                status:"1",
                menuParentNo:1,
                path:"/receiveManage",
                icon: '',
                btnList:[
                    {btnId:1,name:"增删改",checked:false},
                    {btnId:2,name:"启用禁用",checked:false},
                ],
            },
            {
                menuNo: 9,
                name: "待清运需求汇总",
                status:"1",
                menuParentNo:1,
                path:"/receiveManage",
                icon: '',
                btnList:[
                    {btnId:1,name:"增删改",checked:false},
                    {btnId:2,name:"启用禁用",checked:false},
                ],
            },
        ],
    },
]

// 提交时的按钮数据
export const PcCheckedBtn = [
    {
        pid:1,
        value:[
            {buttonNo:1,status:1,name:"增删改"},
            {buttonNo:2,status:1,name:"启用禁用"},
        ]
    }
]


// 数据格式
[
    {
        "menuNo": "1598194989228212226",
        "name": "小蓝之家",
        "resourceType": 1,
        "level": 1,
        "status": 1,
        "buttonList": [],
        "children": [
            {
                "menuNo": "1598195573402488834",
                "name": "接收管理",
                "resourceType": 2,
                "level": 2,
                "status": 1,
                "buttonList": [
                    {
                        "buttonNo": "1598197900901363714",
                        "name": "新增",
                        "status": 1
                    },
                    {
                        "buttonNo": "1598197942311714817",
                        "name": "查看",
                        "status": 1
                    },
                    {
                        "buttonNo": "1598197986943418369",
                        "name": "修改",
                        "status": 1
                    },
                    {
                        "buttonNo": "1598198032803946497",
                        "name": "删除",
                        "status": 1
                    }
                ],
                "children": []
            },
            {
                "menuNo": "1598198400510083074",
                "name": "清运需求管理",
                "resourceType": 2,
                "level": 2,
                "status": 1,
                "buttonList": [
                    {
                        "buttonNo": "1598199857024086017",
                        "name": "新增",
                        "status": 1
                    },
                    {
                        "buttonNo": "1598199897763389441",
                        "name": "查看",
                        "status": 1
                    },
                    {
                        "buttonNo": "1598199947298111490",
                        "name": "修改",
                        "status": 1
                    },
                    {
                        "buttonNo": "1598199991870963714",
                        "name": "删除",
                        "status": 1
                    }
                ],
                "children": []
            },
            {
                "menuNo": "1598200101174538241",
                "name": "清运统计",
                "resourceType": 2,
                "level": 2,
                "status": 1,
                "buttonList": [
                    {
                        "buttonNo": "1598200766693126146",
                        "name": "导出",
                        "status": 1
                    }
                ],
                "children": []
            }
        ]
    }
]
