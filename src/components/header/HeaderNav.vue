<template>
  <div class="header_nav_page">
    <div
        @click="handleSwitch"
        class="nav_header_img"
        :class="[isCollapse ? 'nav_header_switch' : '']"
    >
      <img
          v-if="isCollapse"
          style="
          display: inline-block;
          margin-top: 31px;
          width: 40px;
          height: 18px;
        "
          src="@/assets/img/home/logo.png"
          draggable="false"
      />
      <span v-else style="display: inline-block">
        <img
            style="width: 86px; height: 39px; vertical-align: middle"
            src="@/assets/img/home/logo.png"
            draggable="false"
        />
        <img
            style="
            width: 75px;
            height: 42px;
            vertical-align: middle;
            margin-left: 4px;
          "
            src="@/assets/img/home/logo-title.png"
            draggable="false"
        />
      </span>
    </div>
    <div
        style="
        float: right;
        display: flex;
        font-size: 16px;
        color: #fff;
        margin-right: 35px;
      "
    >
      <div class="goToJsc" v-if="showJsc"  @click="goToJscBtn">驾驶舱</div>
      <div class="time" style="padding-right: 24px;">{{ dayNow }} 星期{{ weekNow }}</div>


      <el-popover placement="bottom" trigger="hover" class="popperCont">
        <div @click.stop="handleChangePassword" class="update_passwd">修改密码</div>
        <div @click="handleLoginOut" class="loginOut" v-fastClick>退出登录</div>
        <!--<div  class="login_out" v-fastClick></div>-->
        <div slot="reference" class="user_name">
          <img class="user_img" src="@/assets/img/home/user.svg" draggable="false"/>
          <span>{{ username }}</span>
        </div>
      </el-popover>

      <div class="goBack" @click="goBackBtn" v-if="backUrl">返回</div>

    </div>
  </div>
</template>

<script>
export default {
  name: "headerNav",
  data() {
    return {
      isCollapse: false,
      dayNow: "",
      weekNow: "",
      weekName: {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        0: "日"
      }
    };
  },
  components: {},
  computed: {
    username() {
      return this.$store.state.userInfo.nickName
    },
    backUrl(){
      if (this.$store.state.backUrl) {
        return true
      } else {
        return false
      }
    },
    showJsc(){
      if (this.$store.state.isJscBtn) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    let now = new Date()
    let year = now.getFullYear()
    let month = (now.getMonth() + 1 < 10) ? `0${now.getMonth() + 1}` : now.getMonth() + 1
    let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
    this.dayNow = `${year}年${month}月${day}日`

    let weekDay = now.getDay()
    this.weekNow = this.weekName[weekDay]

  },
  mounted() {
  },
  activated() {
  },
  methods: {
    // 去驾驶舱
    goToJscBtn(){
      window.location.replace("http://lsxhsyjsc.tian-wang.com?token="+this.$store.state.tokenValue)
    },
    goBackBtn(){
      console.log(this.$store.state.backUrl,"返回");
      // this.$router.push(this.$store.state.backUrl)
      // let url = this.$store.state.backUrl+'#/otherSystemLogin'
      // console.log(url,"--------------");
      if (this.$store.state.backUrl.indexOf('#/otherSystemLogin')!=-1) {
        window.location.replace(this.$store.state.backUrl)
      } else {
        window.location.replace(this.$store.state.backUrl+'#/otherSystemLogin')
      }
      
    },
    handleLoginOut() {
      this.$http(this.GLOBALApi.userLogout())
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('退出成功');
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
      if (this.$route.path !== "/login") {
        this.$router.push({path: '/login'})
      }
    },
    handleSwitch() {
      this.isCollapse = !this.isCollapse;
      this.$root.eventHub.$emit("_changeCollapse", this.isCollapse)
    },

    // 修改密码
    handleChangePassword() {
      if (this.$route.path !== "/login") {
        this.$router.push({
          path: '/login',
          query: {
            loginType: 'changePassword',
          }
        })
      }
    },

  },
};
</script>

<style lang="less" scoped>
.header_nav_page {
  position: relative;
  width: 100%;
  height: 100%;

}
.nav_header_img {
  display: inline-block;
  width: 220px;
  height: 72px;
  background-color: #fff;
  text-align: center;
  line-height: 72px;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  cursor: pointer;
}

.nav_header_switch {
  width: 64px;
  transition: width 0.6s;
  -moz-transition: width 0.6s;
  /* Firefox 4 */
  -webkit-transition: width 0.6s;
  /* Safari and Chrome */
  -o-transition: width 0.6s;
  /* Opera */
}

.user_name {
  display: table-cell;
  position: relative;
  cursor: pointer;

  .user_img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin-right: 8px;
  }

  span {
    vertical-align: middle;
    color: #202020;
  }
}

.login_out {
  width: 16px;
  height: 16px;
  display: table-cell;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: #000;
  background: url(~@/assets/img/home/login_out.png) center center no-repeat;
  background-size: 16px 16px;
}

.time {
  display: table-cell;
  color: #202020;
  vertical-align: middle;
}

.popperCont {
  margin: 0 20px;
}

.update_passwd, .loginOut {
  cursor: pointer;
  text-align: center;
  font-size: 15px;
  line-height: 40px;
}
.update_passwd{
  border-bottom: 1px solid rgb(226, 226, 226);
}
.goBack,.goToJsc{
  border: solid 1px #fff;
  color: #fff;
  cursor: pointer;
  text-align: center;
  height: 22px!important;
  line-height:normal;
  padding: 5px 15px;
  border-radius: 5px;
  margin-top: 19px;
  margin-left: 20px;
}
.goToJsc{
  margin-right: 20px;
}
</style>
