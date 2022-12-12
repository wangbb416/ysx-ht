<template>
  <div class="bread">
    <div class="bread-name-list" v-if="breadData[0].name && breadData[0].name.length>0">
      <div v-for="(item, index) in breadData" :key="index" :class="[index<breadData.length-1 ? 'noneLastOne' : 'lastone']" style="display: flex;align-items: center;">
        <div :style="{'cursor':item.path && item.path.length>0?'pointer':''}" @click="goTo(item.path)">{{item.name}}</div> 
        <a v-if="index<breadData.length-1" class="split-line">/</a>
      </div>
    </div>

    <div class="menuName">{{menuName}}</div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    breadData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      menuName: "",
    };
  },
  created() {
    if (this.breadData.length >= 1) {
      this.menuName = this.breadData[this.breadData.length - 1].name || "";
    }
    else{
      this.$message.error("菜单名称缺失")
    }
  },
  methods: {
    goTo(path){
      if (path && path.length>0) {
        this.$router.push(path)
      } else {
        return
      }
    }
  },
};
</script>

<style lang="less" scoped>
.bread{
  padding: 20px 0px 22px 16px;
  background-color: #fff;
}
.bread-name-list{
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
  margin-bottom: 12px;
}
.split-line{
  margin: 0px 5px;
}
.lastone{
  color: #303133;
}
.menuName{
  color: #303133;
  font-size: 20px;
}
</style>
