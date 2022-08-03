<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="ScoreDeatilConfig">
      <template #data_Operate="{data}">
        <el-button size="mini" @click="openDetail(data)">详情</el-button>
      </template>
    </MyTable>
    <MyPagination
      :value="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getScoreDetailList"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import { ScoreDeatilConfig } from "./config.js";
import { creditScoreDetail} from "@/api";

export default {
  name: "",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MyDialog,
    MyForm
  },
  data() {
    return {
      titleList: [
        { name: "渔省心", path: "" },
        { name: "信用评分", path: "/ysx/credit-score" },
        { name: "详情", path: "" },
      ],
      companyName: "",
      // 表格
      tableData: [],
      ScoreDeatilConfig,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.companyName = this.$route.query.companyName
    this.getScoreDetailList();
  },
  methods: {
    getScoreDetailList() {
      let params = { page: this.pageNum, size: this.pageSize, companyName: this.companyName};
      creditScoreDetail(params)
        .then(res => {
          if (res != -1) {
            this.tableData = res.content || [];
            this.total = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
  }
};
</script>

<style lang="less" scoped>
</style>
