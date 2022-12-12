<template>
  <div class="home_page">
    <!-- 顶部logo，用户部分 -->
    <HeaderNav class="nav_header"></HeaderNav>
    <div style="position: relative; height: calc(100% - 72px)" class="main_contain_box">
      <div class="nav_menu" :class="[isCollapse ? 'nav_menu_switch' : '']">
        <!-- 菜单栏部分 -->
        <MenuOption :isCollapse="isCollapse"></MenuOption>
      </div>
      <div class="content_main" :class="[isCollapse ? 'content_main_switch' : '']">
        <!-- 右边显示部分 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/header/HeaderNav.vue"
import MenuOption from "@/components/menu/MenuOption.vue"
export default {
  name: "home",
  data() {
    return {
      showRouter: false,
      isCollapse: false,
      isFullscreen: false,
    };
  },
  watch: {
    // $route(to, from) {
    //   //处理直接修改路径的时候当前选中菜单
    //   if (to.path === "/home") {
    //     this.showRouter = false;
    //   } else {
    //     this.showRouter = true;
    //   }
    // },
    isFullscreen(newVal, oldVal) {
      this.$store.commit("setIsFullscreen", this.isFullscreen);
    },
  },
  components: {
    HeaderNav,
    MenuOption
  },
  computed: {},
  created() {
    if (this.$route.path === "/home") {
      this.showRouter = false;
    } else {
      this.showRouter = true;
    }
  },
  mounted() {
    this.$root.eventHub.$on('_changeCollapse',(state) => {
      this.isCollapse = state;
    })
  },
  activated() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.home_page {
  position: relative;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  box-sizing: border-box;
  background: #F3F3F3;
  .nav_header {
    position: relative;
    width: 100%;
    text-align: left;
    line-height: 72px;
    box-sizing: border-box;
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
    height: 72px;
    background: #FFFFFF;
  }

  .nav_menu {
    width: 220px;
    height: 100%;
    position: absolute;
    text-align: left;
    left: 0;
    top: 0;
    bottom: 0;
    background: #ffffff;
    box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.05);
    z-index: 9;
  }

  .nav_menu_switch {
    width: 64px;
    transition: width 0.6s;
    -moz-transition: width 0.6s;
    /* Firefox 4 */
    -webkit-transition: width 0.6s;
    /* Safari and Chrome */
    -o-transition: width 0.6s;
    /* Opera */
  }

  .content_main {
    position: absolute;
    width: calc(100% - 274px);
    height: calc(100% - 48px);
    z-index: 0;
    top: 24px;
    right: 24px;
    overflow: hidden;
  }

  .content_main_switch {
    width: calc(100% - 112px);
    transition: width 0.6s;
    -moz-transition: width 0.6s;
    /*  Firefox 4 */
    -webkit-transition: width 0.6s;
    /* Safari and Chrome */
    -o-transition: width 0.6s;
    /* Opera **/
  }
}
</style>
