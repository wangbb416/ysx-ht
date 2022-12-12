import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/receiveManage'
    },
    {
      path: '/login',
      name: 'login',
      aliasName: '登录',
      component: () => import('../views/login/Login.vue'),
      breadcrumb: [],
      hidden: true
    },
    {
      path: '/otherSystemLogin',
      name: 'otherSystemLogin',
      aliasName: '其他系统登录',
      component: () => import('../views/login/OtherSystemLogin.vue'),
      breadcrumb: [],
      hidden: true
    },
    {
      path: '/home',
      name: 'home',
      aliasName: '蓝色循环',
      hidden: true,
      component: Home,
      breadcrumb: []
    },
    {
      path: '/receiveManage',
      name: 'receiveManageParent',
      aliasName: '小蓝之家',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/receiveManage',
          breadcrumb: [
            {
              path: '/receiveManage',
              name: '小蓝之家',
              link: false
            },
            {
              path: '/receiveManage',
              name: '接收管理',
              link: false
            }
          ],
          component: () =>
            import('../views/declarePlace/receiveManage/ReceiveManage.vue'),
          name: 'receiveManage'
        },
        {
          path: '/declarePlace',
          breadcrumb: [
            {
              path: '/receiveManage',
              name: '小蓝之家',
              link: false
            },
            {
              path: '/declarePlace',
              name: '清运需求管理',
              link: false
            }
          ],
          component: () =>
            import('../views/declarePlace/junk/DeclarePlace.vue'),
          name: 'declarePlace'
        },
        {
          path: '/applySummary',
          breadcrumb: [
            {
              path: '/receiveManage',
              name: '小蓝之家',
              link: false
            },
            {
              path: '/applySummary',
              name: '清运统计',
              link: false
            }
          ],
          component: () =>
            import('../views/declarePlace/applySummary/ApplySummary.vue'),
          name: 'applySummary'
        }
      ]
    },
    {
      path: '/memberManage',
      name: 'memberManageParent',
      aliasName: '成员管理',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/memberManage',
          breadcrumb: [
            {
              path: '/videoManage',
              name: '收集管理',
              link: false
            },
            {
              path: '/memberManage',
              name: '成员管理',
              link: false
            }
          ],
          component: () =>
            import('../views/collectManage/memberManage/MemberManage.vue'),
          name: 'memberManage'
        }
      ]
    },
    {
      path: '/blueHouse',
      name: 'blueHouseParent',
      aliasName: '收集管理',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/blueHouse',
          breadcrumb: [
            {
              path: '/blueHouse',
              name: '收集管理',
              link: false
            },
            {
              path: '/blueHouse',
              name: '小蓝之家管理',
              link: false
            }
          ],
          component: () =>
            import('../views/collectManage/blueHouse/BlueHouse.vue'),
          name: 'blueHouse'
        },
        {
          path: '/electricFence',
          breadcrumb: [
            {
              path: '/blueHouse',
              name: '收集管理',
              link: false
            },
            {
              path: '/electricFence',
              name: '电子围栏',
              link: false
            }
          ],
          component: () =>
            import('../views/collectManage/electricFence/ElectricFence.vue'),
          name: 'electricFence'
        },
        {
          path: '/informationReview',
          breadcrumb: [
            {
              path: '/blueHouse',
              name: '收集管理',
              link: false
            },
            {
              path: '/informationReview',
              name: '清运需求审核',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/collectManage/informationReview/InformationReview.vue'
            ),
          name: 'informationReview'
        },
        {
          path: '/transportationDemand',
          breadcrumb: [
            {
              path: '/blueHouse',
              name: '收集管理',
              link: false
            },
            {
              path: '/transportationDemand',
              name: '待清运需求汇总',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/collectManage/transportationDemand/TransportationDemand.vue'
            ),
          name: 'transportationDemand'
        }
      ]
    },
    {
      path: '/enterpriseManage',
      name: 'enterpriseManageParent',
      aliasName: '运输管理',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/enterpriseManage',
          breadcrumb: [
            {
              path: '/enterpriseManage',
              name: '运输管理',
              link: false
            },
            {
              path: '/enterpriseManage',
              name: '运输公司管理',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/transportManage/enterpriseManage/EnterpriseManage.vue'
            ),
          name: 'enterpriseManage'
        },
        {
          path: '/dispatchSheet',
          breadcrumb: [
            {
              path: '/enterpriseManage',
              name: '运输管理',
              link: false
            },
            {
              path: '/dispatchSheet',
              name: '清运调度单管理',
              link: false
            }
          ],
          component: () =>
            import('../views/transportManage/dispatchSheet/DispatchSheet.vue'),
          name: 'dispatchSheet'
        },
        {
          path: '/driverManege',
          breadcrumb: [
            {
              path: '/enterpriseManage',
              name: '运输管理',
              link: false
            },
            {
              path: '/driverManege',
              name: '司机管理',
              link: true
            }
          ],
          component: () =>
            import('../views/transportManage/driverManege/DriverManege.vue'),
          name: 'driverManege'
        },
        {
          path: '/vehicleManege',
          breadcrumb: [
            {
              path: '/enterpriseManage',
              name: '运输管理',
              link: false
            },
            {
              path: '/vehicleManege',
              name: '车辆管理',
              link: true
            }
          ],
          component: () =>
            import('../views/transportManage/vehicleManege/VehicleManege.vue'),
          name: 'vehicleManege'
        }
      ]
    },
    {
      path: '/wareHousing',
      name: 'wareHousingParent',
      aliasName: '中转仓',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/wareHousing',
          breadcrumb: [
            {
              path: '/wareHousing',
              name: '中转仓',
              link: false
            }
            //     {
            //     path: '/wareHousing',
            //     name: '入仓管理',
            //     link: false
            // }
          ],
          component: () =>
            import('../views/transferWarehouse/wareHousing/WareHousing.vue'),
          name: 'wareHousing'
        },
        {
          path: '/transferManage',
          breadcrumb: [
            {
              path: '/wareHousing',
              name: '中转仓',
              link: false
            },
            {
              path: '/transferManage',
              name: '中转仓管理',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/transferWarehouse/transferManage/TransferManage.vue'
            ),
          name: 'transferManage'
        },
        {
          path: '/stockManage',
          breadcrumb: [
            {
              path: '/wareHousing',
              name: '中转仓',
              link: false
            },
            {
              path: '/stockManage',
              name: '入库管理',
              link: false
            }
          ],
          component: () =>
            import('../views/transferWarehouse/stockManage/StockManage.vue'),
          name: 'stockManage'
        },
        {
          path: '/transferDispatching',
          breadcrumb: [
            {
              path: '/wareHousing',
              name: '中转仓',
              link: false
            },
            {
              path: '/transferDispatching',
              name: '中转仓调度单管理',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/transferWarehouse/transferDispatching/TransferDispatching.vue'
            ),
          name: 'transferDispatching'
        }
      ]
    },
    {
      path: '/unitManage',
      name: 'unitManageParent',
      aliasName: '监管单位',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/unitManage',
          breadcrumb: [
            {
              path: '/unitManage',
              name: '监管单位',
              link: false
            },
            {
              path: '/unitManage',
              name: '单位管理',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/regulators/unitManage/UnitManage.vue'
            ),
          name: 'unitManage'
        }
      ]
    },
    {
      path: '/pelletizingManage',
      name: 'pelletizingManageParent',
      aliasName: '造粒厂',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/pelletizingManage',
          breadcrumb: [
            {
              path: '/pelletizingManage',
              name: '造粒厂',
              link: false
            },
            {
              path: '/pelletizingManage',
              name: '造粒厂管理',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/pelletizingPlant/pelletizingManage/PelletizingManage.vue'
            ),
          name: 'pelletizingManage'
        }
      ]
    },
    {
      path: '/traceSource',
      name: 'traceSourceParent',
      aliasName: '溯源',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/traceSource',
          breadcrumb: [
            {
              path: '/traceSource',
              name: '溯源',
              link: false
            },
            {
              path: '/traceSource',
              name: '产品溯源',
              link: false
            }
          ],
          component: () =>
            import('../views/billManage/traceSource/TraceSource.vue'),
          name: 'traceSource'
        },
        {
          path: '/billManage',
          breadcrumb: [
            {
              path: '/traceSource',
              name: '溯源',
              link: false
            },
            {
              path: '/billManage',
              name: '联单管理',
              link: false
            }
          ],
          component: () => import('../views/billManage/bill/BillManage.vue'),
          name: 'billManage'
        }
      ]
    },
    {
      path: '/statisticalAnalysis',
      name: 'statisticalAnalysisParent',
      aliasName: '统计分析',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/statisticalAnalysis',
          breadcrumb: [
            {
              path: '/statisticalAnalysis',
              name: '统计分析',
              link: false
            },
            {
              path: '/statisticalAnalysis',
              name: '统计分析',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/reportForm/statisticalAnalysis/statisticalAnalysis.vue'
            ),
          name: 'statisticalAnalysis'
        }
      ]
    },
    {
      path: '/statisticalCheck',
      name: 'statisticalCheckParent',
      aliasName: '统计',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/materialSheet',
          breadcrumb: [
            {
              path: '/materialSheet',
              name: '统计',
              link: false
            },
            {
              path: '/materialSheet',
              name: '物料平衡表',
              link: false
            }
          ],
          component: () =>
            import('../views/statisticalCheck/materialSheet/MaterialSheet.vue'),
          name: 'materialSheet'
        }
      ]
    },
    {
      path: '/deviceManager',
      name: 'deviceManagerParent',
      aliasName: '设备管理',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/braceletManage',
          breadcrumb: [
            {
              path: '/deviceManager',
              name: '设备管理',
              link: false
            },
            {
              path: '/braceletManage',
              name: '手环吊坠管理',
              link: false
            }
          ],
          component: () =>
            import('../views/deviceManager/braceletManage/BraceletManage.vue'),
          name: 'braceletManage'
        },
        {
          path: '/gpsManage',
          breadcrumb: [
            {
              path: '/deviceManager',
              name: '设备管理',
              link: false
            },
            {
              path: '/gpsManage',
              name: 'GPS设备管理',
              link: false
            }
          ],
          component: () =>
            import('../views/deviceManager/gpsManage/GpsManage.vue'),
          name: 'gpsManage'
        },
        {
          path: '/cameraManage',
          breadcrumb: [
            {
              path: '/deviceManager',
              name: '设备管理',
              link: false
            },
            {
              path: '/cameraManage',
              name: '摄像头管理',
              link: false
            }
          ],
          component: () =>
            import('../views/deviceManager/cameraManage/CameraManage.vue'),
          name: 'cameraManage'
        },
        {
          path: '/cloudWareManage',
          breadcrumb: [
            {
              path: '/deviceManager',
              name: '设备管理',
              link: false
            },
            {
              path: '/cloudWareManage',
              name: '云仓管理',
              link: false
            }
          ],
          component: () =>
            import(
              '../views/deviceManager/cloudWareManage/CloudWareManage.vue'
            ),
          name: 'cloudWareManage'
        }
      ]
    },
    {
      path: '/videoManage',
      name: 'videoManageParent',
      aliasName: '视频管理',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/videoRate',
          breadcrumb: [
            {
              path: '/videoManage',
              name: '视频管理',
              link: false
            },
            {
              path: '/videoRate',
              name: '视频评级',
              link: false
            }
          ],
          component: () =>
            import('../views/videoManage/videoRate/VideoRate.vue'),
          name: 'videoRate'
        }
      ]
    },
    {
      path: '/videoRateDetail',
      name: 'videoRateDetailParent',
      aliasName: '视频评级详情',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/videoRateDetail',
          breadcrumb: [
            {
              path: '/videoManage',
              name: '视频管理',
              link: false
            },
            {
              path: '/videoRateDetail',
              name: '视频评级',
              link: false
            }
          ],
          component: () =>
            import('../views/videoManage/videoRate/VideoRateDetail.vue'),
          name: 'videoRateDetail'
        }
      ]
    },
    {
      path: '/accountManage',
      name: 'accountManageParent',
      aliasName: '账号管理',
      component: Home,
      hidden: true,
      breadcrumb: [],
      childShow: true,
      children: [
        {
          path: '/userList',
          breadcrumb: [
            {
              path: '/accountManage',
              name: '账号管理',
              link: false
            },
            {
              path: '/userList',
              name: '用户管理',
              link: false
            },
          ],
          component: () =>
            import('../views/accountManage/userList/UserList.vue'),
          name: 'userList'
        },
        {
          path: '/roleManage',
          breadcrumb: [
            {
              path: '/accountManage',
              name: '账号管理',
              link: false
            },
            {
              path: '/roleManage',
              name: '角色管理',
              link: false
            },
          ],
          component: () =>
            import('../views/accountManage/roleManage/RoleManage.vue'),
          name: 'roleManage'
        }
      ]
    },
    // 404：
    {
      path: '/:pathMatch(.*)',
      name: 'noFound',
      component: () => import('../views/noFound/noFound.vue')
    }
  ]
})
