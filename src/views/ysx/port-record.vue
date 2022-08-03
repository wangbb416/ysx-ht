<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>
    <MySearch
      :searchField="searchField"
      :form="form"
      @search="getPortRecord(1)"
    ></MySearch>
    <div class="download-button common-button" title="下载" @click="downLoad">
      <i class="el-icon-download"></i>
    </div>

    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="PortRecordConfig">
      <template #slotActionState="{data}">
        <div>{{ statusConfig[data] }}</div>
      </template>
    </MyTable>
    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getPortRecord"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";

import { PortRecordConfig } from "./config.js";
import { portRecord, downloadPortRecord } from "@/api";

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
        { name: "出入港记录", path: "" }
      ],
      // 表格
      tableData: [],
      PortRecordConfig,
      statusConfig: { 0: "入港", 1: "出港" },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 搜索条件
      searchField: [
        {
          type: "select",
          field: "actionState",
          label: "状态",
          option: [
            { label: "入港", value: 0 },
            { label: "出港", value: 1 }
          ]
        },
        {
          type: "datetimerange",
          field: "timeRange",
          label: "时间",
          valueFormat: "yyyy-MM-dd hh:mm:SS"
        }
      ],
      form: {
        actionState: "",
        timeRange: ""
      }
    };
  },
  created() {
    this.getPortRecord();
  },
  methods: {
    getPortRecord(pageNum = 0) {
      if(pageNum) {this.pageNum = pageNum}
      let params = { pageNum: this.pageNum, pageSize: this.pageSize };
      if (this.form.actionState === 0 || this.form.actionState === 1) {
        params.actionState = this.form.actionState;
      }
      if (
        Array.isArray(this.form.timeRange) &&
        this.form.timeRange.length == 2
      ) {
        params.beginTime = this.form.timeRange[0];
        params.endTime = this.form.timeRange[1];
      }
      console.log("params", params);
      portRecord(params)
        .then(res => {
          if (res != -1) {
            this.tableData = res.records || [];
            this.total = res.total || 0;
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
    },
    downLoad() {
      let params = {};
      if (this.form.actionState === 0 || this.form.actionState === 1) {
        params.actionState = this.form.actionState;
      }
      if (
        Array.isArray(this.form.timeRange) &&
        this.form.timeRange.length == 2
      ) {
        params.beginTime = this.form.timeRange[0];
        params.endTime = this.form.timeRange[1];
      }
      downloadPortRecord(params)
        .then(res => {
          if (res != -1) {
            let blob = new Blob([res]);
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            let a = document.createElement("a");
            a.href = href;
            a.setAttribute("download", "出入港记录.xlsx");
            document.body.appendChild(a);
            a.click();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.port-record {
  position: relative;
}
.download-button {
  position: absolute;
  top: 50px;
  right: 10px;
  display: inline-block;
  padding: 8px 15px;
  border-radius: 5px;
}
</style>
