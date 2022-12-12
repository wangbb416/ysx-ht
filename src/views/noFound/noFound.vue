<template>
  <div class="no_found">
    <div class="tip">
      <div class="text">请输入正确的地址信息！</div>
      <div class="count">系统将在{{ count }}秒后自动跳转到首页...</div>
      <el-link type="primary" @click="jumpNow">没反应？点击立即跳转...</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "noFound",
  data() {
    return {
      count: 5,
      timeId: null,
    };
  },
  // 导航离开该组件的对应路由时调用
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timeId);
    next();
  },
  created() {
    this.timeId = setInterval(() => {
      this.count--;
      if (this.count === 0) {
        this.jumpNow();
      }
    }, 1000);
  },
  methods: {
    jumpNow() {
      clearInterval(this.timeId);
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.no_found {
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tip {
    margin-top: 10%;
    width: 350px;
    height: 140px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      text-align: center;
    }
    .text {
      font-size: 20px;
      line-height: 40px;
    }
    .count {
      font-size: 14px;
      color: #777;
    }
    .el-link {
      margin-top: 50px;
    }
  }
}
</style>
