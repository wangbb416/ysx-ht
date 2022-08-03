<template>
  <div class="my_table">
    <el-table :show-summary="isShowSummary" :span-method="spanMethod" :data="data" border>
      <el-table-column
        type="selection"
        v-if="isSelectionBoo"
        width="60px"
        align="center"
      ></el-table-column>
      <el-table-column
        type="index"
        :index="getIndex"
        v-if="isIndexBoo"
        label="序号"
        align="center"
        width="60px"
      ></el-table-column>
      <el-table-column
        v-for="item in tableConfig"
        :key="item.label"
        :prop="item.field"
        :label="item.label"
        v-bind="item.otherConfig"
        :sortable="item.sortable"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <slot
            :name="item.slotName || 'default'"
            :data="
              !item.field || (item.slotName || '').startsWith('data_')
                ? scope.row
                : scope.row[item.field]
            "
          >
            {{ scope.row[item.field] != null ? scope.row[item.field] : "" }}
          </slot>
        </template>
      </el-table-column>
      <template v-if="isExpand">
        <slot :name="isExpand"></slot>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableConfig: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: "80px"
    },
    isSelectionBoo: {
      type: Boolean,
      required: false
    },
    isIndexBoo: {
      type: Boolean,
      required: false
    },
    isExpand: {
      type: String,
      required: false
    },
    isShowSummary: {
      type: Boolean,
      required: false
    },
    pageNum: {
      type: Number,
      required: false
    },
    pageSize: {
      type: Number,
      required: false
    },
    spanMethod: {
      type: Function,
      required: false
    },
    // loading: {
    //   type: Boolean,
    //   default: true
    // }
  },

  data() {
    return {};
  },
  methods: {

    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1
      } else {
        return index + 1
      }
    },

  }
};
</script>

<style lang="less" scoped></style>
