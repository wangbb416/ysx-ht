<template>
  <div class="login_page">
    <div class="login_title">登录页面</div>
    <div class="spot-box"></div>
    <div class="login_content">
      <div class="mange_title">蓝色循环海洋治理后台管理系统</div>
      <div
          class="welcome_title"
          :class="[loginType == 'changePassword' ? 'welcome_title_change' : '']"
      >
        {{ welcomeTitle }}
      </div>
      <!-- <div @click="handleChangeType('changePassword')" v-if="loginType=='login'" class="set_pass" v-fastClick>修改密码</div> -->
      <!-- <div @click="handleChangeType('login')" v-else-if="loginType=='changePassword'" class="back_login" v-fastClick>返回登录</div> -->
      <div
          @click="handleChangeType('login')"
          v-if="loginType == 'changePassword'"
          class="back_login"
          v-fastClick
      >
        返回登录
      </div>
      <el-form
          :model="loginData"
          :rules="rules"
          label-position="top"
          ref="loginData"
          class="login_form"
          v-show="loginType == 'login'"
      >
        <!-- 隐藏输入框回显账号密码用，无其他作用开始 -->
        <!-- <div style="width: 0px;height: 0px;overflow: hidden;">
          <el-input v-model.trim="hideUsername"></el-input>
          <el-input type="password" v-model.trim="hidePassWord" clearable></el-input>
        </div> -->
        <!-- 隐藏输入框回显账号密码用，无其他作用结束 -->

        <el-form-item prop="username" label="账号">
          <el-input
              @keyup.enter.native="handleLogin"
              style="width: 400px"
              maxlength="30"
              v-model.trim="loginData.username"
              placeholder="请输入您的账号"
              clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord" label="密码">
          <el-input
              @keyup.enter.native="handleLogin"
              style="width: 400px"
              type="password"
              maxlength="30"
              v-model.trim="loginData.passWord"
              placeholder="请输入您的密码"
              clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div
              @click="handleLogin"
              v-fastClick="1000"
              class="login_btn"
              :class="[status ? 'login_btn_active' : '']"
          >
            登录
          </div>
        </el-form-item>
      </el-form>

      <!--修改密码-->
      <el-form
          :model="resetData"
          :rules="passWordRules"
          label-position="top"
          ref="verifyPassword"
          class="login_form"
          v-show="loginType === 'changePassword'"
      >
        <el-form-item prop="oldPassword" label="原密码">
          <el-input
              @keyup.enter.native="handleVerify"
              style="width: 400px"
              maxlength="30"
              type="password"
              v-model.trim="resetData.oldPassword"
              placeholder="请输入您的原密码"
              clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <template slot="label">
            <div>新密码<span class="lable_tips"></span></div>
          </template>
          <el-input
              @keyup.enter.native="handleVerify"
              style="width: 400px"
              type="password"
              maxlength="30"
              v-model.trim="resetData.newPassword"
              placeholder="请输入您的新密码"
              clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain" label="确认新密码">
          <el-input
              @keyup.enter.native="handleVerify"
              style="width: 400px"
              type="password"
              maxlength="30"
              v-model.trim="resetData.newPasswordAgain"
              placeholder="请再次输入您的新密码"
              clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div
              @click="handleVerify"
              v-fastClick="1000"
              class="login_btn"
              :class="[status ? 'login_btn_active' : '']"
          >
            提交
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'login',
  components: {},
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!this.loginData.username) {
        callback(new Error('请输入登录账号'))
      } else {
        callback()
      }
    }
    var validatePassWord = (rule, value, callback) => {
      if (!this.loginData.passWord) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateOldPassword = (rule, value, callback) => {
      if (!this.resetData.oldPassword) {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    var validateNewPassword = (rule, value, callback) => {
      if (!this.resetData.newPassword && this.resetData.newPassword !== '0') {
        callback(new Error('请输入新密码'))
      } else {
        if (
            this.resetData.newPasswordAgain ||
            this.resetData.newPasswordAgain === '0'
        ) {
          if (this.resetData.newPasswordAgain !== this.resetData.newPassword) {
            callback(new Error('两次密码输入不一致'))
          } else {
            if (this.resetData.newPassword.length < 6) {
              callback(new Error('新密码最少6位'))
            } else {
              if (this.resetData.newPassword === this.resetData.oldPassword) {
                callback(new Error('新密码不能与原密码重复'))
              } else {
                callback()
              }
            }
          }
        } else {
          callback()
        }
      }
    }
    var validateNewPasswordAgain = (rule, value, callback) => {
      if (
          !this.resetData.newPasswordAgain &&
          this.resetData.newPasswordAgain !== '0'
      ) {
        callback(new Error('请再次输入新密码'))
      } else {
        if (this.resetData.newPassword || this.resetData.newPassword === '0') {
          if (this.resetData.newPasswordAgain !== this.resetData.newPassword) {
            callback(new Error('两次密码输入不一致'))
          } else {
            if (this.resetData.newPasswordAgain.length < 6) {
              callback(new Error('新密码最少6位'))
            } else {
              if (
                  this.resetData.newPasswordAgain === this.resetData.oldPassword
              ) {
                callback(new Error('新密码不能与原密码重复'))
              } else {
                callback()
              }
            }
          }
        } else {
          callback()
        }
      }
    }
    return {
      hideUsername: '****', //隐藏输入框回显账号密码用，无其他作用
      hidePassWord: '****', //隐藏输入框回显账号密码用，无其他作用
      activeName: 'first',
      status: false,
      handlerIcon: 'el-icon-d-arrow-right',
      successIcon: 'el-icon-success',
      background: '#e8f0fe',
      progressBarBg: '#22B573', //拖动过程中的背景色
      completedBg: '#22B573', //完成的背景色
      handlerBg: '#fff',
      text: '请按住滑块，拖动到最右边',
      successText: '验证成功',
      width: 350,
      height: 40,
      iconWidth: 54,
      textSize: '14px',
      isCircle: true,
      verify: false, //是否验证过
      loginState: false,

      loginType: 'login',
      loginData: {
        username: '',
        passWord: ''
      },
      rules: {
        username: [{validator: validateUsername, trigger: 'blur'}],
        passWord: [{validator: validatePassWord, trigger: 'blur'}]
      },
      passWordRules: {
        oldPassword: [{validator: validateOldPassword, trigger: 'blur'}],
        newPassword: [{validator: validateNewPassword, trigger: 'blur'}],
        passwordAgain: [
          {validator: validateNewPasswordAgain, trigger: 'blur'}
        ]
      },
      resetData: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      },

      adminPower: [],//菜单权限
      adminRouteList: ['/login', '/videoRateDetail', "/memberManage"],//所有路由
    }
  },
  computed: {
    welcomeTitle() {
      return this.loginType == 'login' ? '欢迎登录' : '修改密码'
    }
  },
  created() {
    this.loginType = this.$route.query.loginType || 'login'
    if (this.$route.query.loginType !== 'changePassword') {
      this.$store.commit('setTokenValue', '')
      this.$store.commit('setUsername', '')
      this.$store.commit('setCompanyId', '')
      this.$store.commit('setUserInfo', {})
      this.$store.commit('setMenuList', [])
      this.$store.commit('setRouterList', ['/login', '/videoRateDetail', "/memberManage"])
      sessionStorage.clear()
      localStorage.clear()
      this.loginState = false
    }
  },
  watch: {
    'loginData.username': {
      handler(newVal, oldVal) {
        if (this.loginData.username) {
          this.loginData.username = newVal.replace(/\s+/g, '')
        }
        if (this.loginData.username && this.loginData.passWord) {
          this.status = true
        } else {
          this.status = false
        }
      },
      deep: true
    },
    'loginData.passWord': {
      handler(newVal, oldVal) {
        if (this.loginData.passWord) {
          this.loginData.passWord = newVal.replace(/\s+/g, '')
        }
        if (this.loginData.username && this.loginData.passWord) {
          this.status = true
        } else {
          this.status = false
        }
      },
      deep: true
    }
  },
  mounted() {
    this.verify = false
    setTimeout(() => {
      if (this.loginData.username && this.loginData.passWord) {
        this.status = true
      }
    }, 500)
  },
  methods: {
    handleChangeType(type) {
      this.loginType = type
      this.loginState = false
      this.$nextTick(() => {
        if (this.$refs['loginData']) {
          this.$refs['loginData'].clearValidate()
        }
        if (this.$refs['verifyPassword']) {
          this.$refs['verifyPassword'].clearValidate()
        }
      })
    },
    handleVerify() {
      this.$refs['verifyPassword'].validate(valid => {
        if (valid) {
          this.modifyPassword()
        } else {
          return false
        }
      })
    },
    modifyPassword() {
      if (!this.loginState) {
        this.loginState = true
        this.$http(this.GLOBALApi.updatePassword(), {
          // oldPassword: this.resetData.oldPassword,
          // newPassword: this.resetData.newPassword,
          confirmPassword:md5(this.resetData.newPassword),
          oldPassword: md5(this.resetData.oldPassword),
          newPassword: md5(this.resetData.newPassword)
        })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '修改成功，请重新登录！',
                  type: 'success',
                  duration: 1500
                })
                this.loginType = 'login'
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning',
                  duration: 1500
                })
              }
              this.loginState = false
            })
            .catch(error => {
              this.$message({
                message: error.msg,
                type: 'error',
                duration: 1500
              })
              this.loginState = false
            })
      }
    },
    handleLogin() {
      this.$refs['loginData'].validate(valid => {
        if (valid) {
          this.toLogin()
        } else {
          return false
        }
      })
    },
    toLogin() {
      // this.$store.commit('setTokenName', 'mc-token')//token的key
      // this.$store.commit('setMcTokenPrefix', 'BC')
      // this.$store.commit('setTokenValue', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTMsInNlcmlhbE51bWJlciI6IlUyMDIyMTAxNzEwMjczOTAwMDAwMSIsInVzZXJOYW1lIjoi546L5paMIiwibGlua05hbWUiOiLnjovmlowiLCJwaG9uZSI6IjE4MjM4NTg0MTQ3Iiwicm9sZUlkcyI6WzIsMyw1LDcsOF0sInBsYXRmb3JtIjoid2ViIn0.q5e0phjew2dRyabyqy8nGaAcyDBxjw4e_7jSiIAtUt0')

      // this.setTreeData(lastMenu)
      // return
      if (!this.loginState) {
        this.loginState = true
        this.$http(this.GLOBALApi.login(), {
          username: this.loginData.username,
          password: md5(this.loginData.passWord) //md5
          // password: this.loginData.passWord
        })
            .then(res => {
              if (res.code == 200 && res.data) {
                this.$store.commit('setTokenName', res.data.tokenName)//token的key
                this.$store.commit('setTokenPrefix', res.data.tokenPrefix)
                this.$store.commit('setTokenValue', res.data.tokenValue)
      
                // 获取用户信息
                this.getUserInfo()

              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning',
                  duration: 1500
                })
                this.loginState = false
              }
            })
            .catch(error => {
              this.$message({
                message: error.msg,
                type: 'error',
                duration: 1500
              })
              this.loginState = false
            })
      }
    },
    // 获取用户信息
    getUserInfo() {
      this.$http(this.GLOBALApi.getUserInfoByToken())
          .then(res => {
            if (res.code == 200) {
              this.$store.commit('setUserInfo', {...res.data})
              if (res.data.loginNumber <= 1) {
                this.$message({
                  message: '首次登录请修改密码！',
                  type: 'success',
                  duration: 3000
                })
                this.handleChangeType('changePassword')
                return
              }else{
                // 获取菜单路由
                this.$nextTick(() => {
                  this.getResourceTreeList()
                })
              }
            } else {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1500
              })
              this.loginState = false
            }
          })
          .catch(error => {
            this.$message({
              message: error.msg,
              type: 'error',
              duration: 1500
            })
            this.loginState = false
          })
    },
    // 获取菜单路由列表
    getResourceTreeList() {
      this.$http(this.GLOBALApi.getResourceTreeList())
          .then(res => {
            if (res.code == 200) {
              if (res.data && res.data.length > 0) {
                this.setTreeData(res.data)
              } else {
                this.$message({
                  message: '该账号暂无任何权限，请联系管理员!',
                  type: 'warning',
                  duration: 1500
                })
                this.loginState = false
                this.$store.commit('setTokenValue', '')
              }

            } else {
              this.$message.error(res.msg);
              this.loginState = false
              this.$store.commit('setTokenValue', '')
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
            this.loginState = false
            this.$store.commit('setTokenValue', '')
          });
    },
    // 处理路由数据
    setTreeData(data) {
      let cloneData = JSON.parse(JSON.stringify(data))
      this.adminPower = cloneData.filter(item=>{
        return item.name != "顶部菜单栏"
      })
      let that = this
      let validBtn = []
      this.adminRouteList = ['/login', '/videoRateDetail', "/memberManage"]
      dealEvery(cloneData)

      // 扁平化所有按钮
      function dealEvery(cloneData) {
        cloneData.map(item => {
          that.adminRouteList.push(item.routPath)
          if (item.level==2 && item.buttonList && item.buttonList.length > 0) {
            validBtn.push({
              path: item.routPath,//其父亲的路由
              btnList: item.buttonList
            })
          }

          // 驾驶舱按钮
          if(item.name =="顶部菜单栏" && item.buttonList.length>0 && item.buttonList[0].name == '驾驶舱'){
            that.$store.commit('setIsJscBtn',true)
          }

          if (item.children && item.children.length > 0) {
            dealEvery(item.children)
          }
        })
      }

      // console.log("adminRouteList",this.adminRouteList);
      this.$store.commit("setValidBtn", validBtn)
      this.$store.commit('setMenuList', this.adminPower)
      this.$store.commit('setRouterList', this.adminRouteList)
      // console.log("routerList-------------------", this.$store.state.routerList);
      // console.log("menuList------------------", this.$store.state.menuList);
      // console.log("登录路由",this.$store.state.menuList[0].children[0].routPath);
      this.$router.replace(this.$store.state.menuList[0].children[0].routPath)
      // this.loginState = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item {
  margin-bottom: 12px;
}

/deep/ .el-form--label-top .el-form-item__label {
  color: #333333;
  font-size: 16px;
  text-align: left;
  padding: 0;
  padding-left: 5px;
  font-weight: 500;
}

/deep/ .el-input__inner {
  height: 52px;
  line-height: 52px;
}

/deep/ .el-form-item__error {
  left: 16px;
}

.login_page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(~@/assets/img/login/mantle.png) center center no-repeat;
  background-size: 100% 100%;
}

.login_title {
  position: absolute;
  color: #2c50ee;
  top: 37px;
  left: 78px;
  z-index: 9;
  font-size: 30px;
}

.login_title::before {
  top: 20px;
  left: -77px;
  position: absolute;
  content: '';
  width: 56px;
  height: 6px;
  background: #2c50ee;
}

.spot-box {
  position: absolute;
  width: 416px;
  height: 237px;
  background: url(~@/assets/img/login/spot.png) center center no-repeat;
  background-size: 100% 100%;
  top: -6px;
  left: -58px;
}

.login_content {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  width: 627px;
  height: 586px;
  background-color: #ffffff;
  box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03),
  0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 6px 16px -8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-sizing: border-box;
  user-select: none;
  padding: 0px 108px 0px 101px;
  text-align: left;
  background: url(~@/assets/img/login/login-right_bg.png) center center no-repeat;
  background-size: 100% 100%;

  .login_form {
    width: 400px;
    margin-top: 20px;

    .change_Password {
      text-align: right;

      .txt_Password {
        cursor: pointer;
      }
    }
  }
}

.login_content::before {
  width: 510px;
  height: 556px;
  position: absolute;
  content: '';
  background: url(~@/assets/img/login/login_left_bg.png) center center no-repeat;
  background-size: 510px 556px;
  left: -509px;
  top: 15px;
}

.welcome_title {
  font-size: 26px;
  color: #333333;
  text-align: left;
  padding-top: 80px;
}

.welcome_title_change {
  padding-top: 50px;
}

.set_pass {
  position: absolute;
  right: 127px;
  bottom: 219px;
  font-size: 14px;
  color: #2c50ee;
  z-index: 9;
  cursor: pointer;
}

.back_login {
  position: absolute;
  right: 127px;
  bottom: 145px;
  font-size: 14px;
  color: #2c50ee;
  z-index: 9;
  cursor: pointer;
}

.mange_title {
  position: absolute;
  left: -475px;
  top: 161px;
  font-size: 32px;
  font-family: PingFang SC-Medium, PingFang SC;
  color: #ffffff;
  line-height: 38px;
  width: 280px;
  word-break: break-all;
}

@media screen and (max-width: 1450px) {
  .login_content {
    right: 100px;
    transform: translate(0, -50%);
  }
}

.login_btn {
  display: inline-block;
  width: 400px;
  height: 56px;
  line-height: 56px;
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 50px;
}

.login_btn_active {
  background: #2c50ee;
  color: #fff;
}

.login_btn:hover {
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.1);
}

.lable_tips {
  color: rgb(87, 82, 82);
  font-size: 12px;
  margin-left: 5px;
}
</style>
