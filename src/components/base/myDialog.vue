<template>
  <div class="my-dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="setWidth"
      :before-close="handleClose"
      append-to-body
    >
      <slot name="content"></slot>

      <span v-if="confirmButton" slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancel')" size="mini">取 消</el-button>
        <el-button type="primary" @click="$emit('confirm')" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    dialogVisible: Boolean,
    title: {
      type: String,
      default: "提示"
    },
    confirmButton: {
      type: Boolean,
      default: false
    },
    setWidth: {
      type: String,
      default: "40%;"
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .el-dialog__header {
  border-bottom: solid 1px #7d7d7d;
}

/deep/ .el-dialog__body {
  line-height: 20px;
}

/deep/ .el-dialog__body {
  position: relative;
  min-height: 240px;
}
</style>
