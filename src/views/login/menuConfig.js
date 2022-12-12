export const lastMenu = [
        {
            menuNo: 1,
            name: "小蓝之家",
            status:"0",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/receiveManage",//页面路径
            icon: 'icon-shangjia',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 2,
                    name: "接收管理",
                    status:"0",
                    menuParentNo:1,
                    routPath:"/receiveManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                        {btnId:3,name:"导出",checked:true},
                    ],
                },
                {
                    menuNo: 3,
                    name: "清运需求管理",
                    status:"0",
                    menuParentNo:1,
                    routPath:"/declarePlace",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 4,
                    name: "清运统计",
                    status:"0",
                    menuParentNo:1,
                    routPath:"/applySummary",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
            ],
        },
        {
            menuNo: 5,
            name: "收集管理",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/blueHouse",//页面路径
            icon: 'icon-shouji',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 6,
                    name: "小蓝之家管理",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/blueHouse",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                    children:[
                        {
                            menuNo:7,
                            name: "成员管理",
                            status:"1",
                            menuParentNo:6,
                            routPath:"/memberManage",
                            icon: '',
                            btnList:[
                                {btnId:1,name:"增删改",checked:true},
                                {btnId:2,name:"启用禁用",checked:true},
                            ],
                        }
                    ]
                },
                {
                    menuNo: 8,
                    name: "电子围栏",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/electricFence",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 10,
                    name: "清运需求审核",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/informationReview",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 11,
                    name: "待清运需求汇总",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/transportationDemand",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
            ],
        },
        {
            menuNo: 12,
            name: "运输管理",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/enterpriseManage",//页面路径
            icon: 'icon-yunshu',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 13,
                    name: "公司管理",
                    status:"1",
                    menuParentNo:12,
                    routPath:"/enterpriseManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 14,
                    name: "司机管理",
                    status:"1",
                    menuParentNo:12,
                    routPath:"/driverManege",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 15,
                    name: "车辆管理",
                    status:"1",
                    menuParentNo:12,
                    routPath:"/vehicleManege",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 16,
                    name: "调度管理",
                    status:"1",
                    menuParentNo:12,
                    routPath:"/dispatchSheet",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
            ],
        },
        {
            menuNo: 17,
            name: "中转管理",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/transferManage",//页面路径
            icon: 'icon-zhongzhuang',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 18,
                    name: "中转仓管理",
                    status:"1",
                    menuParentNo:17,
                    routPath:"/transferManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 19,
                    name: "入库管理",
                    status:"1",
                    menuParentNo:17,
                    routPath:"/stockManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 20,
                    name: "调度管理",
                    status:"1",
                    menuParentNo:17,
                    routPath:"/transferDispatching",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
            ],
        },
        {
            menuNo: 21,
            name: "监管单位",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/unitManage",//页面路径
            icon: 'icon-danwei',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 22,
                    name: "单位管理",
                    status:"1",
                    menuParentNo:21,
                    routPath:"/unitManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },

            ],
        },
        {
            menuNo: 23,
            name: "再生造粒",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/pelletizingManage",//页面路径
            icon: 'icon-zaoli',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 24,
                    name: "造粒厂管理",
                    status:"1",
                    menuParentNo:23,
                    routPath:"/pelletizingManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },

            ],
        },
        {
            menuNo: 6,
            name: "联单溯源",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/traceSource",//页面路径
            icon: 'icon-liandan',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 6,
                    name: "产品溯源",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/traceSource",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },

            ],
        },
        {
            menuNo: 6,
            name: "统计分析",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/statisticalAnalysis",//页面路径
            icon: 'icon-tongjifenxi1',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 6,
                    name: "统计分析",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/statisticalAnalysis",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },

            ],
        },
        {
            menuNo: 6,
            name: "统计查询",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/materialSheet",//页面路径
            icon: 'icon-fuwutongji',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 6,
                    name: "物料平衡表",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/materialSheet",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },

            ],
        },
        {
            menuNo: 6,
            name: "装备管理",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/deviceManager",//页面路径
            icon: 'icon-shebei',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 6,
                    name: "手环吊坠管理",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/braceletManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 7,
                    name: "GPS设备管理",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/gpsManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 8,
                    name: "摄像头管理",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/cameraManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 8,
                    name: "云仓管理",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/cloudWareManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
            ],
        },
        {
            menuNo: 6,
            name: "视频管理",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/videoManage",//页面路径
            icon: 'icon-shipin',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 6,
                    name: "视频评级",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/videoRate",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },

            ],
        },
        {
            menuNo: 6,
            name: "账号管理",
            status:"1",//0-启用 1-未启用
            menuParentNo:0,//父级id
            routPath:"/accountManage",//页面路径
            icon: 'icon-zhanghaoguanli',//图标
            btnList:[],//没有按钮级 为空
            children: [
                {
                    menuNo: 6,
                    name: "用户管理",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/userList",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },
                {
                    menuNo: 6,
                    name: "角色管理",
                    status:"1",
                    menuParentNo:5,
                    routPath:"/roleManage",
                    icon: '',
                    btnList:[
                        {btnId:1,name:"增删改",checked:true},
                        {btnId:2,name:"启用禁用",checked:true},
                    ],
                },

            ],
        },
]

// export const menu = [
//     {
//         menuPid:0,
//         menuId:1,
//         name: '小蓝之家',
//         childShow: true,
//         webUrl: '/receiveManage',
//         icon: 'icon-shangjia',
//         level:1,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:1,//父级id
//         menuId:103,//菜单id
//         name: '清运统计',//菜单名称
//         childShow: true,
//         webUrl: '/applySummary',//页面路由地址
//         icon: '',//菜单图标
//         level:2,//菜单级别
//         sort:"3",//排序
//         isPermissions:true,//是否展示按钮级勾选
//         permissions:["1","2"],//1:增删改 2:启用编辑
//     },
//     {
//         menuPid:1,
//         menuId:101,
//         name: '接收管理',
//         childShow: true,
//         webUrl: '/receiveManage',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:1,
//         menuId:102,
//         name: '清运需求管理',
//         childShow: true,
//         webUrl: '/declarePlace',
//         icon: '',
//         level:2,
//         sort:"2",
//         isPermissions:true,
//         permissions:[],
//     },

//     {
//         menuPid:0,
//         menuId:2,
//         name: '收集管理',
//         childShow: true,
//         webUrl: '/blueHouse',
//         icon: 'icon-shouji',
//         level:1,
//         sort:"2",
//         isPermissions:true,
//         permissions:[],
//     },

//     {
//         menuPid:2,
//         menuId:204,
//         name: '待清运需求汇总',
//         childShow: true,
//         webUrl: '/transportationDemand',
//         icon: '',
//         level:2,
//         sort:"4",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:2,
//         menuId:202,
//         name: '电子围栏',
//         childShow: true,
//         webUrl: '/electricFence',
//         icon: '',
//         level:2,
//         sort:"2",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:2,
//         menuId:203,
//         name: '清运需求审核',
//         childShow: true,
//         webUrl: '/informationReview',
//         icon: '',
//         level:2,
//         sort:"3",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:2,
//         menuId:201,
//         name: '小蓝之家管理',
//         childShow: true,
//         webUrl: '/blueHouse',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:201,
//         menuId:200001,
//         name: '成员管理',
//         childShow: true,
//         webUrl: '/memberManage',
//         icon: '',
//         level:3,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:3,
//         name: '运输管理',
//         childShow: true,
//         webUrl: '/applySummary',
//         icon: 'icon-yunshu',
//         level:1,
//         sort:"3",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:3,
//         menuId:301,
//         name: '公司管理',
//         childShow: true,
//         webUrl: '/enterpriseManage',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:3,
//         menuId:302,
//         name: '司机管理',
//         childShow: true,
//         webUrl: '/driverManege',
//         icon: '',
//         level:2,
//         sort:"2",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:3,
//         menuId:303,
//         name: '车辆管理',
//         childShow: true,
//         webUrl: '/vehicleManege',
//         icon: '',
//         level:2,
//         sort:"3",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:3,
//         menuId:304,
//         name: '调度管理',
//         childShow: true,
//         webUrl: '/dispatchSheet',
//         icon: '',
//         level:2,
//         sort:"4",
//         isPermissions:true,
//         permissions:[],
//     },

//     {
//         menuPid:0,
//         menuId:4,
//         name: '中转管理',
//         childShow: true,
//         webUrl: '/wareHousing',
//         icon: 'icon-zhongzhuang',
//         level:1,
//         sort:"4",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:4,
//         menuId:401,
//         name: '中转仓管理',
//         childShow: true,
//         webUrl: '/transferManage',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:4,
//         menuId:402,
//         name: '入库管理',
//         childShow: true,
//         webUrl: '/stockManage',
//         icon: '',
//         level:2,
//         sort:"2",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:4,
//         menuId:403,
//         name: '调度管理',
//         childShow: true,
//         webUrl: '/transferDispatching',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:5,
//         name: '监管单位',
//         childShow: true,
//         webUrl: '/unitManage',
//         icon: 'icon-danwei',
//         level:1,
//         sort:"5",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:5,
//         menuId:501,
//         name: '单位管理',
//         childShow: true,
//         webUrl: '/unitManage',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:6,
//         name: '再生造粒',
//         childShow: true,
//         webUrl: '/pelletizingManage',
//         icon: 'icon-zaoli',
//         level:1,
//         sort:"6",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:6,
//         menuId:601,
//         name: '造粒厂管理',
//         childShow: true,
//         webUrl: '/pelletizingManage',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:7,
//         name: '联单溯源',
//         childShow: true,
//         webUrl: '/traceSource',
//         icon: 'icon-liandan',
//         level:1,
//         sort:"7",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:7,
//         menuId:701,
//         name: '产品溯源',
//         childShow: true,
//         webUrl: '/traceSource',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:8,
//         name: '统计分析',
//         childShow: true,
//         webUrl: '/statisticalAnalysis',
//         icon: 'icon-tongjifenxi1',
//         level:1,
//         sort:"8",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:8,
//         menuId:801,
//         name: '统计分析',
//         childShow: true,
//         webUrl: '/statisticalAnalysis',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:9,
//         name: '统计查询',
//         childShow: true,
//         webUrl: '/materialSheet',
//         icon: 'icon-fuwutongji',
//         level:1,
//         sort:"9",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:9,
//         menuId:901,
//         name: '物料平衡表',
//         childShow: true,
//         webUrl: '/materialSheet',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:10,
//         name: '装备管理',
//         childShow: true,
//         webUrl: '/deviceManager',
//         icon: 'icon-shebei',
//         level:1,
//         sort:"10",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:10,
//         menuId:1001,
//         name: '手环吊坠管理',
//         childShow: true,
//         webUrl: '/braceletManage',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:10,
//         menuId:1002,
//         name: 'GPS设备管理',
//         childShow: true,
//         webUrl: '/gpsManage',
//         icon: '',
//         level:2,
//         sort:"2",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:10,
//         menuId:1003,
//         name: '摄像头管理',
//         childShow: true,
//         webUrl: '/cameraManage',
//         icon: '',
//         level:2,
//         sort:"3",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:10,
//         menuId:1004,
//         name: '云仓管理',
//         childShow: true,
//         webUrl: '/cloudWareManage',
//         icon: '',
//         level:2,
//         sort:"4",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:11,
//         name: '视频管理',
//         childShow: true,
//         webUrl: '/videoManage',
//         icon: 'icon-shipin',
//         level:1,
//         sort:"11",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:11,
//         menuId:1101,
//         name: '视频评级',
//         childShow: true,
//         webUrl: '/videoRate',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:1101,
//         menuId:110001,
//         name: '视频评级详情',
//         childShow: true,
//         webUrl: '/videoRateDetail',
//         icon: '',
//         level:3,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:0,
//         menuId:12,
//         name: '账号管理',
//         childShow: true,
//         webUrl: '/accountManage',
//         icon: 'icon-zhanghaoguanli',
//         level:1,
//         sort:"12",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:12,
//         menuId:1201,
//         name: '用户管理',
//         childShow: true,
//         webUrl: '/userList',
//         icon: '',
//         level:2,
//         sort:"1",
//         isPermissions:true,
//         permissions:[],
//     },
//     {
//         menuPid:12,
//         menuId:1202,
//         name: '角色管理',
//         childShow: true,
//         webUrl: '/roleManage',
//         icon: '',
//         level:2,
//         sort:"2",
//         isPermissions:true,
//         permissions:[],
//     },

// ]
export const menu2 = [
    {
        menuPid:0,
        menuId:1,
        name: '小蓝之家',
        childShow: true,
        webUrl: '/receiveManage',
        icon: 'icon-shangjia',
        level:1,
        sort:"1",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:1,//父级id
                menuId:103,//菜单id
                name: '清运统计',//菜单名称
                childShow: true,
                webUrl: '/applySummary',//页面路由地址
                icon: '',//菜单图标
                level:2,//菜单级别
                sort:"3",//排序
                isPermissions:true,//是否展示按钮级勾选
                // permissions:["1","2"],//1:增删改 2:启用编辑
                permissions:[
                    {},
                    {},
                    {},
                ]
            },
            {
                menuPid:1,
                menuId:101,
                name: '接收管理',
                childShow: true,
                webUrl: '/receiveManage',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:["2"],
            },
            {
                menuPid:1,
                menuId:102,
                name: '清运需求管理',
                childShow: true,
                webUrl: '/declarePlace',
                icon: '',
                level:2,
                sort:"2",
                isPermissions:true,
                permissions:[],
            },
        ]
    },
    {
        menuPid:0,
        menuId:2,
        name: '收集管理',
        childShow: true,
        webUrl: '/blueHouse',
        icon: 'icon-shouji',
        level:1,
        sort:"2",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:2,
                menuId:204,
                name: '待清运需求汇总',
                childShow: true,
                webUrl: '/transportationDemand',
                icon: '',
                level:2,
                sort:"4",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:2,
                menuId:202,
                name: '电子围栏',
                childShow: true,
                webUrl: '/electricFence',
                icon: '',
                level:2,
                sort:"2",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:2,
                menuId:203,
                name: '清运需求审核',
                childShow: true,
                webUrl: '/informationReview',
                icon: '',
                level:2,
                sort:"3",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:2,
                menuId:201,
                name: '小蓝之家管理',
                childShow: true,
                webUrl: '/blueHouse',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
                children:[
                    {
                        menuPid:201,
                        menuId:200001,
                        name: '成员管理',
                        childShow: true,
                        webUrl: '/memberManage',
                        icon: '',
                        level:3,
                        sort:"1",
                        isPermissions:true,
                        permissions:[],
                    },
                ]
            },
        ]
    },

    {
        menuPid:0,
        menuId:3,
        name: '运输管理',
        childShow: true,
        webUrl: '/applySummary',
        icon: 'icon-yunshu',
        level:1,
        sort:"3",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:3,
                menuId:301,
                name: '公司管理',
                childShow: true,
                webUrl: '/enterpriseManage',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:3,
                menuId:302,
                name: '司机管理',
                childShow: true,
                webUrl: '/driverManege',
                icon: '',
                level:2,
                sort:"2",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:3,
                menuId:303,
                name: '车辆管理',
                childShow: true,
                webUrl: '/vehicleManege',
                icon: '',
                level:2,
                sort:"3",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:3,
                menuId:304,
                name: '调度管理',
                childShow: true,
                webUrl: '/dispatchSheet',
                icon: '',
                level:2,
                sort:"4",
                isPermissions:true,
                permissions:[],
            },
        ]
    },


    {
        menuPid:0,
        menuId:4,
        name: '中转管理',
        childShow: true,
        webUrl: '/wareHousing',
        icon: 'icon-zhongzhuang',
        level:1,
        sort:"4",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:4,
                menuId:401,
                name: '中转仓管理',
                childShow: true,
                webUrl: '/transferManage',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:4,
                menuId:402,
                name: '入库管理',
                childShow: true,
                webUrl: '/stockManage',
                icon: '',
                level:2,
                sort:"2",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:4,
                menuId:403,
                name: '调度管理',
                childShow: true,
                webUrl: '/transferDispatching',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
        ]
    },

    {
        menuPid:0,
        menuId:5,
        name: '监管单位',
        childShow: true,
        webUrl: '/unitManage',
        icon: 'icon-danwei',
        level:1,
        sort:"5",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:5,
                menuId:501,
                name: '单位管理',
                childShow: true,
                webUrl: '/unitManage',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
        ]
    },

    {
        menuPid:0,
        menuId:6,
        name: '再生造粒',
        childShow: true,
        webUrl: '/pelletizingManage',
        icon: 'icon-zaoli',
        level:1,
        sort:"6",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:6,
                menuId:601,
                name: '造粒厂管理',
                childShow: true,
                webUrl: '/pelletizingManage',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
        ]
    },

    {
        menuPid:0,
        menuId:7,
        name: '联单溯源',
        childShow: true,
        webUrl: '/traceSource',
        icon: 'icon-liandan',
        level:1,
        sort:"7",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:7,
                menuId:701,
                name: '产品溯源',
                childShow: true,
                webUrl: '/traceSource',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
        ]
    },

    {
        menuPid:0,
        menuId:8,
        name: '统计分析',
        childShow: true,
        webUrl: '/statisticalAnalysis',
        icon: 'icon-tongjifenxi1',
        level:1,
        sort:"8",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:8,
                menuId:801,
                name: '统计分析',
                childShow: true,
                webUrl: '/statisticalAnalysis',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
        ]
    },

    {
        menuPid:0,
        menuId:9,
        name: '统计查询',
        childShow: true,
        webUrl: '/materialSheet',
        icon: 'icon-fuwutongji',
        level:1,
        sort:"9",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:9,
                menuId:901,
                name: '物料平衡表',
                childShow: true,
                webUrl: '/materialSheet',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
        ]
    },

    {
        menuPid:0,
        menuId:10,
        name: '装备管理',
        childShow: true,
        webUrl: '/deviceManager',
        icon: 'icon-shebei',
        level:1,
        sort:"10",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:10,
                menuId:1001,
                name: '手环吊坠管理',
                childShow: true,
                webUrl: '/braceletManage',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:10,
                menuId:1002,
                name: 'GPS设备管理',
                childShow: true,
                webUrl: '/gpsManage',
                icon: '',
                level:2,
                sort:"2",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:10,
                menuId:1003,
                name: '摄像头管理',
                childShow: true,
                webUrl: '/cameraManage',
                icon: '',
                level:2,
                sort:"3",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:10,
                menuId:1004,
                name: '云仓管理',
                childShow: true,
                webUrl: '/cloudWareManage',
                icon: '',
                level:2,
                sort:"4",
                isPermissions:true,
                permissions:[],
            },
        ]
    },

    {
        menuPid:0,
        menuId:11,
        name: '视频管理',
        childShow: true,
        webUrl: '/videoManage',
        icon: 'icon-shipin',
        level:1,
        sort:"11",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:11,
                menuId:1101,
                name: '视频评级',
                childShow: true,
                webUrl: '/videoRate',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
                children:[
                    {
                        menuPid:1101,
                        menuId:110001,
                        name: '视频评级详情',
                        childShow: true,
                        webUrl: '/videoRateDetail',
                        icon: '',
                        level:3,
                        sort:"1",
                        isPermissions:true,
                        permissions:[],
                    },
                ]
            },
        ]
    },


    {
        menuPid:0,
        menuId:12,
        name: '账号管理',
        childShow: true,
        webUrl: '/accountManage',
        icon: 'icon-zhanghaoguanli',
        level:1,
        sort:"12",
        isPermissions:true,
        permissions:[],
        children:[
            {
                menuPid:12,
                menuId:1201,
                name: '用户管理',
                childShow: true,
                webUrl: '/userList',
                icon: '',
                level:2,
                sort:"1",
                isPermissions:true,
                permissions:[],
            },
            {
                menuPid:12,
                menuId:1202,
                name: '角色管理',
                childShow: true,
                webUrl: '/roleManage',
                icon: '',
                level:2,
                sort:"2",
                isPermissions:true,
                permissions:[],
            },
        ]
    },


]

export const xcx = [
    {
        menuPid:0,
        menuId:1,
        name:"电子围栏",
        isPermissions:true,
        permissions:[],
    },
    {
        menuPid:0,
        menuId:2,
        name:"清运调度单列表,详情",
        isPermissions:true,
        permissions:[],
    },
    {
        menuPid:0,
        menuId:3,
        name:"入库",
        isPermissions:true,
        permissions:[],
    },
    {
        menuPid:0,
        menuId:4,
        name:"出库",
        isPermissions:true,
        permissions:[],
    },
    {
        menuPid:0,
        menuId:5,
        name:"盘库",
        isPermissions:true,
        permissions:[],
    },
    {
        menuPid:0,
        menuId:6,
        name:"接收",
        isPermissions:true,
        permissions:[],
    },
    {
        menuPid:0,
        menuId:7,
        name:"预处理、造粒",
        isPermissions:true,
        permissions:[],
    },
]

// 提交时的菜单数据
export const PcCheckedMenu = [2,3]
export const SmallProgramCheckedMenu = [3]
export const JscCheckedMenu = [4]





// 处理的按钮数据
export const PcCheckedBtn = [
    {
        pid:1,
        value:[
            {btnId:1,checked:true,name:"增删改"},
            {btnId:2,checked:true,name:"启用禁用"},
        ]
    },
    {
        pid:2,
        value:["1"]
    },

]
