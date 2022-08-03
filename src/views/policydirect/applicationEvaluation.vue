<!--政策直通-建议汇总-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <MyTable
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="applicationEvaluationConfig"
      :isIndexBoo="true"
    >
      <template #slotgrade="{data}">
        <div>{{ datafiltering(data, EvaluationGrad).label || "" }}</div>
      </template>
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getData"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import { applicationEvaluationConfig } from "./config";
import { zlbEvaluateRecord } from "@/api/policydirect.js";
import { EvaluationGrad, datafiltering } from "@/utils/enum";

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
        { name: "政策直通", path: "" },
        { name: "应用汇总评价", path: "" }
      ],
      // 表格
      tableData: [],
      applicationEvaluationConfig,
      pageNum: 1,
      pageSize: 10,
      total: 0,

      EvaluationGrad,
      datafiltering
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let params = { pageNum: this.pageNum, pageSize: this.pageSize, type: 1 };
      zlbEvaluateRecord(params)
        .then(res => {
          if (res != -1 && res.records) {
            this.tableData = res.records;
            this.total = res.total || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
