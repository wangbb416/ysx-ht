<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="checkRecordsConfig">
      <template #data_Operate="{data}">
        <div v-if="data.approvalStatus == 1">已通过</div>
        <div v-else-if="data.approvalStatus == 2">已拒绝</div>
        <div v-else>
          <el-button size="small" @click="openDialog(data, 1)">同意</el-button>
          <el-button size="small" @click="openDialog(data, 2)">拒绝</el-button>
        </div>
      </template>
    </MyTable>
    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getCheckRecordlList"
    ></MyPagination>

    <MyDialog
      :dialogVisible="dialogVisible"
      :title="title"
      @cancel="dialogVisible = false"
    >
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'120px'"
          :rules="rules"
          :buttonShow="true"
          :buttonTitle="'确定'"
          @confirm="submit"
          @cancel="dialogVisible = false"
        ></MyForm>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import { checkRecordsConfig } from "./config.js";
import { checkRecord, checkRecordOpration } from "@/api";

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
        { name: "参观核查记录", path: "" }
      ],
      status: 1, //1:同意  2:拒绝
      // 表格
      tableData: [],
      checkRecordsConfig,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      title: "拒绝原因",
      dialogVisible: false,
      // 表单
      id: "",
      formList: [
        {
          type: "textarea",
          label: "原因",
          valueLabel: "refuseReason"
        }
      ],
      formValue: {
        refuseReason: ""
      },
      rules: {
        refuseReason: { required: true, message: "请选择", trigger: "blur" }
      }
    };
  },
  created() {
    this.getCheckRecordlList();
  },
  methods: {
    getCheckRecordlList() {
      let params = { page: this.pageNum, size: this.pageSize };
      checkRecord(params)
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
    openDialog(data, status) {
      for (let key of Object.keys(this.formValue)) {
        this.formValue[key] = "";
      }
      this.id = data.id;
      this.status = status;
      if (status == 1) {
        this.agree();
      } else if (status == 2){
        this.dialogVisible = true;
      }
    },
    agree() {
      this.$confirm("是否同意该申请？")
        .then(_ => {
          this.submit();
        })
        .catch(_ => {});
    },
    submit() {
      let params = { id: this.id, approvalStatus: this.status };
      if (this.approvalStatus == 2) {
        params["refuseReason"] = this.formValue.refuseReason;
      }
      checkRecordOpration(params)
        .then(res => {
          if (res != -1) {
            this.dialogVisible = false;
            this.$message.success("提交成功");
            this.getCheckRecordlList();
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
</style>
