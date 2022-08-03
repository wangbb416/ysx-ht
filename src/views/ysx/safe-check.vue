<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <MySearch
      :searchField="searchField"
      :form="form"
      @search="getSecurityCheckRecord(1)"
    ></MySearch>
    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="SecurityCheckRecordConfig">
      <template #slotCreateIdentity="{data}">
        <div>{{ acountConfig[data] }}</div>
      </template>
      <template #data_Operate="{data}">
        <el-button size="mini" @click="openDetail(data)">详情</el-button>
      </template>
    </MyTable>
    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getSecurityCheckRecord"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";

import { SecurityCheckRecordConfig } from "./config.js";
import { securityCheckRecord } from "@/api";

export default {
  name: "",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch
  },
  data() {
    return {
      titleList: [
        { name: "渔省心", path: "" },
        { name: "安全核查记录", path: "" }
      ],
      // 表格
      tableData: [],
      SecurityCheckRecordConfig,
      acountConfig: { 1: "渔民", 3: "收集企业", 7: "监管单位" },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 搜索条件
      searchField: [
        { type: "input", field: "companyName", label: "渔船名称" },
        {
          type: "daterange",
          field: "timeRange",
          label: "时间",
          valueFormat: "yyyy-MM-dd"
        }
      ],
      form: {
        companyName: "",
        timeRange: ""
      }
    };
  },
  created() {
    this.getSecurityCheckRecord();
  },
  methods: {
    getSecurityCheckRecord(pageNum = 0) {
      if(pageNum) {this.pageNum = pageNum}
      let params = { page: this.pageNum, size: this.pageSize };
      if (this.form.companyName) {
        params.companyName = this.form.companyName;
      }
      if (
        Array.isArray(this.form.timeRange) &&
        this.form.timeRange.length == 2
      ) {
        params.startTime = this.form.timeRange[0];
        params.endTime = this.form.timeRange[1];
      }
      securityCheckRecord(params)
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
    openDetail(data) {
      this.$router.push({
        path: "/ysx/safe-check-detail",
        query: { id: data.id }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
