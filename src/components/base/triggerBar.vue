<template>
  <div class="trigger_bar">
    <div class="title">{{ title }}</div>
    <template v-if="type == 'text'"></template>
    <template v-if="type == 'btn'">
      <el-button
        plain
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="handIconTrigger"
      ></el-button>
    </template>
    <template v-if="type == 'checkBtn'">
      <el-button
        v-if="iconStatus"
        plain
        :icon="saveIcon"
        size="small"
        type="primary"
        @click="handIconTrigger"
      ></el-button>
      <el-button
        v-else
        plain
        :icon="editIcon"
        size="small"
        type="primary"
        @click="handIconTrigger"
      ></el-button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "0"
    },
    type: {
      type: String,
      default: "btn"
    },
    iconStatus: {
      type: Boolean,
      default: false
    },
    saveIcon: {
      type: String,
      default: "0"
    },
    editIcon: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {};
  },
  methods: {
    handIconTrigger() {
      this.$emit("handIconClick");
    }
  }
};
</script>

<style scoped lang="less">
.trigger_bar {
  display: flex;
  justify-content: space-between;

  .title {
    font-size: 20px;
    color: rgb(221, 221, 221);
  }

  /deep/ .el-button {
    color: #fff;
    width: 44px;
    height: 32px;
    padding: 0;
    font-size: 16px;
  }
}
</style>
