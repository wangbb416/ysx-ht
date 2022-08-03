import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/login/index";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    // 重复push同一个路由，捕捉错误，不处理
    // Avoided redundant navigation to current location: "/login"
    // console.log("err", err)
    return err;
  });
};

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/ysx",
      name: "YSX",
      component: () => import("@/views/home"),
      children: [
        // 原一期模块
        {
          path: "visit-check",
          name: "visit-check",
          component: () => import("@/views/ysx/visit-check")
        },
        {
          path: "credit-score",
          name: "credit-score",
          component: () => import("@/views/ysx/credit-score")
        },
        {
          path: "credit-score-detail",
          name: "credit-score-detail",
          component: () => import("@/views/ysx/credit-score-detail")
        },
        {
          path: "safe-check",
          name: "safe-check",
          component: () => import("@/views/ysx/safe-check")
        },
        {
          path: "safe-check-detail",
          name: "safe-check-detail",
          component: () => import("@/views/ysx/safe-check-detail")
        },
        {
          path: "port-record",
          name: "port-record",
          component: () => import("@/views/ysx/port-record")
        },
        {
          path: "port-clean",
          name: "port-clean",
          component: () => import("@/views/ysx/port-clean")
        },

        /* ----------------- 生态环保 --------------- */

        // 环保信用分
        {
          path: "environmental-credit-points",
          name: "environmental-credit-points",
          component: () =>
            import("@/views/ecofriendly/environmental-credit-points/list")
        },
        {
          path: "environmental-credit-points-detail",
          name: "environmental-credit-points-detail",
          component: () =>
            import("@/views/ecofriendly/environmental-credit-points/detail")
        },

        // 环保三色码
        {
          path: "environmental-three-color",
          name: "environmental-three-color",
          component: () =>
            import("@/views/ecofriendly/environmental-three-color/list")
        },
        {
          path: "environmental-three-color-detail",
          name: "environmental-three-color-detail",
          component: () =>
            import("@/views/ecofriendly/environmental-three-color/detail")
        },
        {
          path: "environmental-three-color-configure",
          name: "environmental-three-color-configure",
          component: () =>
            import("@/views/ecofriendly/environmental-three-color/configure")
        },

        // 渔船纳污记录
        {
          path: "fishing-vessel-pollution",
          name: "fishing-vessel-pollution",
          component: () =>
            import("@/views/ecofriendly/fishing-vessel-pollution")
        },

        // 环保培训
        {
          path: "environmental-training",
          name: "environmental-training",
          component: () => import("@/views/ecofriendly/environmental-training")
        },

        // 培训记录
        {
          path: "training-record",
          name: "training-record",
          component: () => import("@/views/ecofriendly/training-record/list")
        },
        {
          path: "training-record-detail",
          name: "training-record-detail",
          component: () => import("@/views/ecofriendly/training-record/detail")
        },

        // 政策相关
        {
          path: "policy-related",
          name: "policy-related",
          component: () => import("@/views/ecofriendly/policy-related")
        },

        /* ----------------- 生态环保 --------------- */

        // 安全信用分
        {
          path: "safe-credit-score",
          name: "safe-credit-score",
          component: () => import("@/views/safeautonomy/safe-credit-score/list")
        },
        {
          path: "safe-credit-score-detail",
          name: "safe-credit-score-detail",
          component: () =>
            import("@/views/safeautonomy/safe-credit-score/detail")
        },

        // 预警信息管理
        {
          path: "early-warning-manage",
          name: "early-warning-manage",
          component: () => import("@/views/safeautonomy/early-warning-manage")
        },

        /* ----------------- 安全自治 --------------- */

        // 安全学习
        {
          path: "safe-learning",
          name: "safe-learning",
          component: () => import("@/views/safeautonomy/safe-learning")
        },

        // 学习记录
        {
          path: "learning-record",
          name: "learning-record",
          component: () => import("@/views/safeautonomy/learning-record/list")
        },
        {
          path: "learning-record-detail",
          name: "learning-record-detail",
          component: () => import("@/views/safeautonomy/learning-record/detail")
        },

        // 政策相关
        {
          path: "safe-policy-related",
          name: "safe-policy-related",
          component: () => import("@/views/safeautonomy/safe-policy-related")
        },

        /* ----------------- 公益活动 --------------- */

        // 先锋驿站
        {
          path: "pioneer-station",
          name: "pioneer-station",
          component: () =>
            import("@/views/charitableactivities/pioneer-station/list")
        },
        {
          path: "pioneer-station-video-wall",
          name: "pioneer-station-video-wall",
          // meta: {
          //   show: true
          // },
          component: () =>
            import("@/views/charitableactivities/pioneer-station/video-wall")
        },

        // 参观申请记录
        {
          path: "visit-application-record",
          name: "visit-application-record",
          component: () =>
            import("@/views/charitableactivities/visit-application-record")
        },

        // 宣传教育
        {
          path: "publicity-education",
          name: "publicity-education",
          component: () =>
            import("@/views/charitableactivities/publicity-education")
        },

        // 宣教记录
        {
          path: "publicity-record",
          name: "publicity-record",
          component: () =>
            import("@/views/charitableactivities/publicity-record/list")
        },
        {
          path: "publicity-record-detail",
          name: "publicity-record-detail",
          component: () =>
            import("@/views/charitableactivities/publicity-record/detail")
        },

        // 线下培训
        {
          path: "offline-train",
          name: "offline-train",
          component: () =>
            import("@/views/charitableactivities/offline-train/list")
        },
        {
          path: "offline-train-detail",
          name: "offline-train-detail",
          component: () =>
            import("@/views/charitableactivities/offline-train/detail")
        },
        {
          path: "offline-train-upload",
          name: "offline-train-upload",
          component: () =>
            import("@/views/charitableactivities/offline-train/upload")
        },

        /* ----------------- 供应链服务 --------------- */

        // 渔家乐管理
        {
          path: "fishing-house-manage",
          name: "fishing-house-manage",
          component: () =>
            import("@/views/supplychainservices/fishing-house-manage/list")
        },

        // 订单管理
        {
          path: "order-manage",
          name: "order-manage",
          component: () =>
            import("@/views/supplychainservices/order-manage/list")
        },
        {
          path: "order-manage-detail",
          name: "order-manage-detail",
          component: () =>
            import("@/views/supplychainservices/order-manage/detail")
        },

        // 商品管理
        {
          path: "commodity-manage",
          name: "commodity-manage",
          component: () =>
            import("@/views/supplychainservices/commodity-manage/list")
        },
        {
          path: "commodity-manage-detail",
          name: "commodity-manage-detail",
          component: () =>
            import("@/views/supplychainservices/commodity-manage/detail")
        },

        // 分类管理
        {
          path: "classification-manage",
          name: "classification-manage",
          component: () =>
            import("@/views/supplychainservices/classification-manage/list")
        },
        {
          path: "classification-manage-add",
          name: "classification-manage-add",
          component: () =>
            import("@/views/supplychainservices/classification-manage/add")
        },

        // 商家管理
        {
          path: "merchant-manage",
          name: "merchant-manage",
          component: () =>
            import("@/views/supplychainservices/merchant-manage/list")
        },
        {
          path: "merchant-manage-add",
          name: "merchant-manage-add",
          component: () =>
            import("@/views/supplychainservices/merchant-manage/add")
        },

        // 财务管理
        {
          path: "financial-manage",
          name: "financial-manage",
          component: () =>
            import("@/views/supplychainservices/financial-manage/list")
        },
        {
          path: "financial-manage-detail",
          name: "financial-manage-detail",
          component: () =>
            import("@/views/supplychainservices/financial-manage/detail")
        },

        // 售后管理
        {
          path: "aftersales-manage",
          name: "aftersales-manage",
          component: () =>
            import("@/views/supplychainservices/aftersales-manage/list")
        },
        {
          path: "aftersales-manage-detail",
          name: "aftersales-manage-detail",
          component: () =>
            import("@/views/supplychainservices/aftersales-manage/detail")
        },


        /* ----------------- 金融服务 --------------- */

        // 贷款记录
        {
          path: "loan-record",
          name: "loan-record",
          component: () => import("@/views/financialservices/loan-record")
        },

        // 银行管理
        {
          path: "bank-manage",
          name: "bank-manage",
          component: () => import("@/views/financialservices/bank-manage/list")
        },
        {
          path: "bank-manage-detail",
          name: "bank-manage-detail",
          component: () =>
            import("@/views/financialservices/bank-manage/detail")
        },

        /* ----------------- 政策直通 --------------- */

        // 惠渔政策
        {
          path: "favorable-fishing-policy",
          name: "favorable-fishing-policy",
          component: () =>
            import("@/views/policydirect/favorable-fishing-policy")
        },

        // 政策补贴
        {
          path: "policy-subsidy",
          name: "policy-subsidy",
          component: () => import("@/views/policydirect/policy-subsidy")
        },

        // 建议汇总
        {
          path: "proposal",
          name: "proposal",
          component: () => import("@/views/policydirect/proposal")
        },

         // 应用评价汇总
         {
          path: "applicationEvaluation",
          name: "applicationEvaluation",
          component: () => import("@/views/policydirect/applicationEvaluation")
         },

         // 服务评价汇总
         {
          path: "serviceEvaluation",
          name: "serviceEvaluation",
          component: () => import("@/views/policydirect/serviceEvaluation")
         },

        /* ----------------- 单位管理 --------------- */

        // 渔港列表
        {
          path: "fishing-ports-list",
          name: "fishing-ports-list",
          component: () => import("@/views/unitmanage/fishing-ports/list")
        },
        {
          path: "fishing-ports-list-add",
          name: "fishing-ports-list-add",
          component: () => import("@/views/unitmanage/fishing-ports/add")
        },
        {
          path: "fishing-ports-list-detail",
          name: "fishing-ports-list-detail",
          component: () => import("@/views/unitmanage/fishing-ports/detail")
        },
        {
          path: "fishing-ports-list-equipmentDetail",
          name: "fishing-ports-list-equipmentDetail",
          component: () =>
            import("@/views/unitmanage/fishing-ports/equipmentDetail")
        },

        // 渔船列表
        {
          path: "fishing-boat-list",
          name: "fishing-boat-list",
          component: () => import("@/views/unitmanage/fishing-boat/list")
        },
        {
          path: "fishing-boat-list-add",
          name: "fishing-boat-list-add",
          component: () => import("@/views/unitmanage/fishing-boat/add")
        },
        {
          path: "fishing-boat-list-detail",
          name: "fishing-boat-list-detail",
          component: () => import("@/views/unitmanage/fishing-boat/detail")
        },
        {
          path: "fishing-boat-list-information-detailed",
          name: "fishing-boat-list-information-detailed",
          component: () =>
            import("@/views/unitmanage/fishing-boat/information-detailed")
        },

        // 渔船预警列表
        {
          path: "fishing-vessel-warning",
          name: "fishing-vessel-warning",
          component: () =>
            import("@/views/unitmanage/fishing-vessel-warning/list")
        },

        // 收集企业列表
        {
          path: "collection-business",
          name: "collection-business",
          component: () => import("@/views/unitmanage/collection-business/list")
        },
        {
          path: "collection-business-add",
          name: "collection-business-add",
          component: () => import("@/views/unitmanage/collection-business/add")
        },
        {
          path: "collection-business-detail",
          name: "collection-business-detail",
          component: () =>
            import("@/views/unitmanage/collection-business/detail")
        },

        // 运输企业列表
        {
          path: "transportation-company",
          name: "transportation-company",
          component: () =>
            import("@/views/unitmanage/transportation-company/list")
        },
        {
          path: "transportation-company-add",
          name: "transportation-company-add",
          component: () =>
            import("@/views/unitmanage/transportation-company/add")
        },
        {
          path: "transportation-company-detail",
          name: "transportation-company-detail",
          component: () =>
            import("@/views/unitmanage/transportation-company/detail")
        },

        // 处置企业列表
        {
          path: "disposal-business",
          name: "disposal-business",
          component: () => import("@/views/unitmanage/disposal-business/list")
        },
        {
          path: "disposal-business-add",
          name: "disposal-business-add",
          component: () => import("@/views/unitmanage/disposal-business/add")
        },
        {
          path: "disposal-business-detail",
          name: "disposal-business-detail",
          component: () => import("@/views/unitmanage/disposal-business/detail")
        },

        // 运营企业列表
        {
          path: "operating-business",
          name: "operating-business",
          component: () => import("@/views/unitmanage/operating-business/list")
        },
        {
          path: "operating-business-add",
          name: "operating-business-add",
          component: () => import("@/views/unitmanage/operating-business/add")
        },
        {
          path: "operating-business-detail",
          name: "operating-business-detail",
          component: () =>
            import("@/views/unitmanage/operating-business/detail")
        },

        // 监管企业列表
        {
          path: "regulate-business",
          name: "regulate-business",
          component: () => import("@/views/unitmanage/regulate-business/list")
        },
        {
          path: "regulate-business-add",
          name: "regulate-business-add",
          component: () => import("@/views/unitmanage/regulate-business/add")
        },
        {
          path: "regulate-business-detail",
          name: "regulate-business-detail",
          component: () => import("@/views/unitmanage/regulate-business/detail")
        },

        /* ----------------- 运营管理 --------------- */

        // 用户列表
        {
          path: "user-list",
          name: "user-list",
          component: () => import("@/views/operationmanage/user-list")
        },

        // 角色列表
        {
          path: "role-list",
          name: "role-list",
          component: () => import("@/views/operationmanage/role-list")
        }

        // // 视频监控管理
        // {
        //   path: "video-surveillance-manage",
        //   name: 'video-surveillance-manage',
        //   component: () => import("@/views/operationmanage/video-surveillance-manage")
        // },
      ]
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    Vue.nextTick(() => {
      if (to.path !== "/login") {
        next({path: "/login"});
      } else {
        next();
      }
    });
  }
});
