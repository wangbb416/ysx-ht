<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="ScoreConfig">
      <template #data_Operate="{data}">
        <el-button size="mini" @click="openDetail(data)">详情</el-button>
      </template>
    </MyTable>
    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getScorelList"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import { ScoreConfig } from "./config.js";
import { creditScore } from "@/api";
import { dateGrain } from "@/utils/methods.js"

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
        { name: "信用评分", path: "" }
      ],
      // 表格
      tableData: [],
      ScoreConfig,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getScorelList();
  },
  methods: {
    getScorelList() {
      let params = { page: this.pageNum, size: this.pageSize };
      creditScore(params)
        .then(res => {
          if (res != -1) {
            let temp = res.content || [];
            temp.map(item => {
              let {dateYear, dateMonth, dateDay} = dateGrain(item.createTime)
              item.createTimeFormat = `${dateYear}-${dateMonth}-${dateDay}`
            })
            this.tableData = temp;
            this.total = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    openDetail(data) {
      this.$router.push({
        path: "/ysx/credit-score-detail",
        query: { companyName: data.companyName }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
