<template>
  <div class="my_pagination">
    <el-pagination
      background
      :page-size="size"
      :page-sizes="[10, 20, 50, 100]"
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="hidePagination"
      @size-change="handleSizeChange"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    hidePagination: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    },
    value: {
      type: Number,
      required: true
    },
    // sizes: {
    //   type: Array,
    //   default: [10, 20, 50, 100]
    // }
  },
  computed: {
    currentPage: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    pageChange(val) {
      this.currentPage = val;
      console.log(val, '99999');
      this.$emit("pageChange");
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit('pageChange', { ...this.value, pageSize: val })
    },

  }
};
</script>

<style scoped lang="less">
.my_pagination {
  margin-top: 30px;
  overflow: hidden;

  /deep/ .el-pagination {
    float: right;
    font-size: 14px;
  }
}
</style>
