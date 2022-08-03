<template>
  <div class="home">
    <div class="home-header">
      <div class="title">渔业管服一体化平台</div>
      <div class="logout">
        <el-dropdown @command="handleLogout">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="home-bottom">
      <div class="left">
        <el-menu
          class="el-menu-vertical-demo"
          unique-opened
          :default-active="activePath"
          @select="handleSelect"
        >
          <el-submenu
            v-for="(item, index) in routerList"
            :key="index"
            :index="String(index)"
          >
            <template slot="title">
              <span>{{ item.name }}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item
                v-for="(child, index2) in item.children"
                :key="index2"
                :index="child.path"
              >{{ child.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right" style="">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import {logout, getUserMenus} from "@/api";

export default {
  name: "",
  data() {
    return {
      username: localStorage.getItem("username"),
      routerList: [
        {
          path: "",
          name: "生态环保",
          children: [
            // // 原模块
            // { path: "/ysx/visit-check", name: "参观核查记录" },
            // { path: "/ysx/credit-score", name: "信用评分" },
            // { path: "/ysx/safe-check", name: "安全核查记录" },
            // { path: "/ysx/port-record", name: "出入港记录" },
            // { path: "/ysx/port-clean", name: "港口清洁" },
            // { path: "/ysx/proposal", name: "建议汇总" },
            // {
            //   path:
            //     "http://www.delanshi.cn/center/manage;JSESSIONID=29a06441-9a7d-482b-abe5-8c6444b52582",
            //   name: "生活垃圾管理",
            //   outNet: true
            // },

            {path: "/ysx/environmental-credit-points", name: "环保信用分"},
            {path: "/ysx/environmental-three-color", name: "环保三色码"},
            {path: "/ysx/fishing-vessel-pollution", name: "渔船纳污记录"},
            {path: "/ysx/environmental-training", name: "环保培训"},
            {path: "/ysx/training-record", name: "培训记录"},
            {path: "/ysx/policy-related", name: "政策相关"}
          ]
        },

        {
          path: "",
          name: "安全自治",
          children: [
            {path: "/ysx/safe-credit-score", name: "安全信用分"},
            {path: "/ysx/early-warning-manage", name: "预警信息管理"},
            {path: "/ysx/safe-learning", name: "安全学习"},
            {path: "/ysx/learning-record", name: "学习记录"},
            {path: "/ysx/safe-policy-related", name: "政策相关"}
          ]
        },

        {
          path: "",
          name: "公益活动",
          children: [
            {path: "/ysx/pioneer-station", name: "先锋驿站"},
            {path: "/ysx/visit-application-record", name: "参观申请记录"},
            {path: "/ysx/publicity-education", name: "宣传教育"},
            {path: "/ysx/publicity-record", name: "宣教记录"},
            {path: "/ysx/offline-train", name: "线下培训"}
          ]
        },

        {
          path: "",
          name: "供应链服务",
          children: [
            {path: "/ysx/fishing-house-manage", name: "渔家乐管理"},
            {path: "/ysx/order-manage", name: "订单管理"},
            {path: "/ysx/commodity-manage", name: "商品管理"},
            {path: "/ysx/classification-manage", name: "分类管理"},
            {path: "/ysx/merchant-manage", name: "商家管理"},
            {path: "/ysx/financial-manage", name: "财务管理"},
            {path: "/ysx/aftersales-manage", name: "售后管理"},
          ]
        },

        {
          path: "",
          name: "金融服务",
          children: [
            {path: "/ysx/loan-record", name: "贷款记录"},
            {path: "/ysx/bank-manage", name: "银行管理"}
          ]
        },

        {
          path: "",
          name: "政策直通",
          children: [
            {path: "/ysx/favorable-fishing-policy", name: "惠渔政策"},
            {path: "/ysx/policy-subsidy", name: "政策补贴"},
            {path: "/ysx/proposal", name: "建议汇总"},
            {path: "/ysx/applicationEvaluation", name: "应用评价汇总"},
            {path: "/ysx/serviceEvaluation", name: "服务评价汇总"},
          ]
        },

        {
          path: "",
          name: "单位管理",
          children: [
            {path: "/ysx/fishing-ports-list", name: "渔港列表"},
            {path: "/ysx/fishing-boat-list", name: "渔船列表"},
            {path: "/ysx/fishing-vessel-warning", name: "渔船预警列表"},
            {path: "/ysx/collection-business", name: "收集企业列表"},
            {path: "/ysx/transportation-company", name: "运输企业列表"},
            {path: "/ysx/disposal-business", name: "处置企业列表"},
            {path: "/ysx/operating-business", name: "运营企业列表"},
            {path: "/ysx/regulate-business", name: "监管企业列表"}
          ]
        },

        {
          path: "",
          name: "运营管理",
          children: [
            {path: "/ysx/user-list", name: "用户列表"},
            {path: "/ysx/role-list", name: "角色列表"}
            // {path: "/ysx/video-surveillance-manage", name: "视频监控管理"},
          ]
        }
      ],
      allMenuRoute: [],
      activePath: ""
    };
  },
  created() {
    this.setMenuRoutes();
    this.setActivePath(this.$route.path);
  },
  methods: {
    setMenuRoutes() {
      let allMenuRoute = [];
      this.routerList.forEach(item => {
        if (item.children && item.children.length > 0) {
          allMenuRoute = allMenuRoute.concat(
            item.children.map(route => {
              return route.path;
            })
          );
        }
      });
      this.allMenuRoute = JSON.parse(JSON.stringify(allMenuRoute));
    },
    setActivePath(toPath) {
      for (let path of this.allMenuRoute) {
        if (toPath == path || toPath.startsWith(`${path}-`)) {
          this.activePath = path;
          break;
        }
      }
    },
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("mobile");
      localStorage.removeItem("companyType");
      this.$router.push("/login");
      // logout()
      // .then(res => {
      // if (res != -1) {
      // }
      // })
      // .catch(error => {
      //   this.$message.error(error.message);
      // });
    },
    handleOpen(index) {
      // console.log("handleOpen", index);
    },
    handleClose(index) {
      // console.log("handleClose", index);
    },
    handleSelect(index, indexPath) {
      if (index.startsWith("http")) {
        window.open(index);
      } else {
        this.$router.push(index);
      }
    }
  },
  watch: {
    $route(to, from) {

      for (let path of this.allMenuRoute) {
        if (to.path == path || to.path.startsWith(`${path}-`)) {
          this.activePath = path;
          break;
        }
      }

    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-image: url(~@/assets/imgs/home/header_bg.png);
  background-repeat: no-repeat;
  background-size: 102% 117%;
  background-position: center center;
}

.title {
  color: #fff;
  font-size: 24px;
}

.home-bottom {
  position: absolute;
  z-index: 2;
  top: 61px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}

.left {
  width: 220px;
  flex-shrink: 0;
}

.right {
  flex-grow: 1;
  box-sizing: border-box;
  padding: 30px 40px 30px 30px;
  overflow-y: auto;
}

.right::-webkit-scrollbar {
  width: 0;
}

/deep/ .el-submenu__title {
  font-size: 20px;
}

/deep/ li.el-menu-item {
  font-size: 18px;
}

.logout {
  cursor: pointer;
}
</style>
