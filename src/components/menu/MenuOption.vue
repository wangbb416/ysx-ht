<template>
  <div class="menu_page">
    <el-menu
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
        @open="handleOpenSub"
        @close="handleCloseSub"
        :default-openeds="defaultOpeneds"
        :default-active="$route.routPath"
        :router="true"
        active-text-color="#0A67FF"
        :unique-opened="true"
        :collapse="isCollapse"
    >
      <template v-for="(item, index) in menuList">
        <el-submenu :index="item.routPath" v-if="true" :key="index">
          <template slot="title">
            <div class="primary_menu_icon iconfont" :class="item.icon"></div>
            <span class="primary_menu" style="margin-left: 4px" slot="title">{{
                item.name
              }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
                :index="val.routPath"
                v-for="(val, k) in item.children"
                :key="k"
            >
              <span class="child-title">{{ val.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.routPath" :key="item.routPath" v-else>
          <div class="primary_menu_icon iconfont" :class="item.icon"></div>
          <span style="margin-left: 4px" slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menuOption",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultOpeneds: [],
    };
  },
  components: {},
  computed: {
    menuList(){
      return this.$store.state.menuList || []
    }
  },
  created() {
  },
  mounted() {
  },
  activated() {
  },
  methods: {
    handleMenuSelect(index, indexPath) {
    },
    handleOpenSub(val) {
      if (this.$route.routPath !== val) {
        // this.$router.push({ path: val });
      }
      this.defaultOpeneds = [val];
    },
    handleCloseSub(val) {
      //console.log(this.$route)
      //this.$router.push({path:val})
    },
  },
};
</script>

<style lang="less" scoped>
.menu_page {
  position: relative;
  width: 100%;
}

/deep/ .el-menu-item-group__title {
  display: none;
}

/deep/ .el-submenu.is-active.is-opened .primary_menu_icon {
  color: #0a67ff;
}

.el-menu-item.is-active .primary_menu_icon {
  color: #0a67ff;
}

/deep/ .el-submenu.is-active .primary_menu_icon {
  color: #0a67ff;
}

/deep/ .el-submenu.is-active.is-opened .primary_menu {
  color: #0a67ff;
  font-weight: 600;
}

/deep/ .el-submenu.is-active .primary_menu {
  color: #0a67ff;
  font-weight: 600;
}

/deep/ .el-menu {
  border: none;
  background-color: #fff !important;
}

/deep/ .el-menu-item.is-active {
  background-color: rgba(10, 103, 255, 0.08) !important;
}

/deep/ .el-menu-item.is-active::after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: #0a67ff;
  border-radius: 0px 10px 10px 0px;
}

/deep/ .el-submenu__title {
  /*color: hsla(0, 0%, 100%, .65);*/
  color: #666666;
}

/deep/ .el-menu-item {
  /*color: hsla(0, 0%, 100%, .65);*/
  color: #666666;
}

/deep/ .el-submenu__title:hover {
  background-color: rgba(10, 103, 255, 0.08);
}

/deep/ .el-menu-item:hover {
  background-color: rgba(10, 103, 255, 0.08);
}

/deep/ .el-form-item__content {
  margin-left: 0 !important;
}

/deep/ .el-form-item__error {
  left: 140px;
  text-align: left;
}

.el-menu-item:focus {
  background-color: rgba(10, 103, 255, 0.08);
}

/*.el-menu-item:hover*/

a {
  color: #1890ff;
  cursor: pointer;
  text-decoration: none;
}

.primary_menu_icon {
  width: 20px;
  height: 20px;
  position: relative;
  display: inline-block;
  color: #000;
  line-height: 20px;
  text-align: center;
  font-size: 20px;
}

.child-title {
  font-size: 14px;
}
</style>
