<!--登录-->
<template>
  <div class="login">
    <div class="left">
      <div class="title">四海民安 民富国强</div>
      <div class="sub_title">渔业管理协同一体化平台</div>
      <div class="english_title">
        The "ocean cloud Warehouse" complex is a new Marine ecological
      </div>

      <div class="system">
        <img src="@/assets/imgs/login/system.svg" alt="system"/>
        <span>Rubik's cube system</span>
      </div>
    </div>

    <div class="right">
      <div class="top">
        <img src="@/assets/imgs/login/login_logo.svg" alt="login"/>
      </div>
      <div class="bottom">
        <el-form
          ref="formRef"
          label-position="top"
          label-width="80px"
          :model="loginForm"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="kaptcha" class="yzm">
            <el-input
              v-model="loginForm.kaptcha"
              placeholder="请输入验证码"
              @keyup.enter.native="submit"
            >
            </el-input>
            <img
              :src="imgUrl"
              alt="codeImg"
              ref="imgRef"
              @click="axiosGetKaptchaKey()"
            />
          </el-form-item>
        </el-form>

        <div class="submit_btn" @click="submit">登录</div>
      </div>
      <div class="version">VERSION 2.0</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {login, getUserRegion} from "@/api";

const api = process.env.api;
const isDev = process.env.NODE_ENV === "development";
let timeId = null;

export default {
  data() {
    return {
      loginForm: {
        username: isDev ? "chgk" : "",
        password: isDev ? "Chgk@520" : "",
        kaptcha: isDev ? "12345" : ""
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
        kaptcha: [{required: true, message: "请输入验证码", trigger: "blur"}]
      },
      kaptchaKey: "",
      imgUrl: ""
    };
  },
  created() {
    this.clearLocal();
    this.axiosGetKaptchaKey();
  },
  methods: {
    clearLocal() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("mobile");
      localStorage.removeItem("companyType");
    },
    submit() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          this.loginForm["kaptchaKey"] = this.kaptchaKey;
          login(this.loginForm)
            .then(res => {
              if (res != -1) {
                console.log(res);
                if (res.ysxFlag === 0) {
                  localStorage.setItem("token", res.token);
                  localStorage.setItem("username", res.username);
                  localStorage.setItem("mobile", res.mobile);
                  localStorage.setItem("companyType", res.companyType);
                  this.$router.push("/ysx/user-list");
                  this.getUserRegion();
                } else {
                  this.$message.error("账号或密码错误！");
                }
              }
            })
            .catch(error => {
              this.$message.error(error.message);
              this.loginForm.kaptcha = "";
              this.axiosGetKaptchaKey();
            });
        } else {
          return false;
        }
      });
    },

    // 获取账号位置
    getUserRegion() {
      getUserRegion()
        .then(res => {
          if (res != -1) {
            localStorage.setItem("regionCode", res.regionCode);
            localStorage.setItem("regionType", res.regionType);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    axiosGetKaptchaKey() {
      let uuid = uuidv4();
      this.imgUrl = api + `/login/kaptcha?uuid=${uuid}`;
      let url = api + "/login/getkaptchakey";
      timeId && clearTimeout(timeId);
      timeId = setTimeout(() => {
        axios
          .get(url, {
            params: {uuid: uuid}
          })
          .then(res => {
            if (res.data.code == 200) {
              this.kaptchaKey = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          });
      }, 500);
    }
  },
  beforeDestroy() {
    document.body.style.backgroundImage = "";
  }
};
</script>

<style lang="less" scoped>
// @import "~@/assets/styles/common";
.login {
  width: 100%;
  height: 100vh;
  background-image: url("~@/assets/imgs/login/login_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed;
  display: flex;

  .left {
    width: 813px;
    height: 100%;
    background: url("~@/assets/imgs/login/left_bg.svg") no-repeat 100% 100%;
    position: relative;

    .title {
      width: 648px;
      height: 115px;
      box-sizing: border-box;
      background: url("~@/assets/imgs/login/title_bg.svg") no-repeat 100% 100%;
      margin-top: 86px;
      margin-left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 68px;
      font-weight: 600;
      color: #e73828;
    }

    .sub_title {
      font-size: 40px;
      font-weight: 600;
      color: #ffffff;
      line-height: 56px;
      padding-left: 98px;
    }

    .english_title {
      font-size: 24px;
      color: #ffffff;
      line-height: 33px;
      padding-left: 98px;
    }

    .system {
      position: absolute;
      left: 77px;
      bottom: 40px;
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
        width: 40px;
        height: 45px;
      }

      span {
        font-size: 18px;
        color: #ffffff;
      }
    }
  }

  .right {
    position: absolute;
    width: 548px;
    height: 548px;
    top: 270px;
    right: 211px;
    background: url("~@/assets/imgs/login/form_bg.svg") no-repeat 100% 100%;
    box-sizing: border-box;
    padding-top: 48px;
    padding-left: 35px;

    .top {
      width: 178px;
      height: 55px;
      margin-bottom: 47px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    /deep/ .bottom {
      margin-top: 50px;

      .el-form-item__label {
        font-size: 14px;
        color: #eeeeef;
        font-weight: 500;
        line-height: 22px;

        &::before {
          content: "";
        }
      }

      .el-input__inner {
        color: #fff;
        width: 294px;
        height: 40px;
        font-size: 18px;
        font-weight: 600;
        background: #595757;

        &::-webkit-input-placeholder {
          font-size: 14px;
          color: #797979;
        }

        &::-moz-input-placeholder {
          font-size: 14px;
          color: #797979;
        }

        &::-ms-input-placeholder {
          font-size: 14px;
          color: #797979;
        }
      }

      .yzm {
        .el-form-item__content {
          display: flex;

          .el-input {
            width: 135px;
          }

          .el-input__inner {
            width: 100%;
          }

          img {
            margin-left: 37px;
            width: 120px;
            height: 40px;
          }
        }
      }

      .submit_btn {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 378px;
        height: 81px;
        font-weight: 600;
        color: #eeeeef;
        font-size: 30px;
        text-align: center;
        line-height: 81px;
        cursor: pointer;

        &:hover {
          background: url("~@/assets/imgs/login/btn_active_bg.png") no-repeat 100% 100%;
          color: #fff;
        }
      }
    }

    .version {
      position: absolute;
      right: 50px;
      bottom: 27px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
    }
  }
}
</style>
