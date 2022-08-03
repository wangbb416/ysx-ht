<!--政策直通-建议汇总-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="proposalListConfig">
      <template #data_Operate="{data}">
        <el-button size="small" @click="openDialog(data)">急速处理</el-button>
      </template>
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getProposalList"
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

import { proposalListConfig } from "./config";
import { getsuggest, dealsuggest } from "@/api";

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
        { name: "建议汇总", path: "" }
      ],
      // 表格
      tableData: [],
      proposalListConfig,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      title: "急速处理",
      dialogVisible: false,
      // 表单
      id: "",
      formList: [
        {
          type: "select",
          label: "处理意见",
          valueLabel: "deal",
          option: [
            { label: "拒绝", value: 0 },
            { label: "延后处理", value: 1 },
            { label: "采纳", value: 2 }
          ],
          disabled: false
        },
        {
          type: "textarea",
          label: "备注",
          valueLabel: "remark"
        }
      ],
      formValue: {
        deal: "",
        remark: ""
      },
      rules: {
        deal: { required: true, message: "请选择", trigger: "blur" }
      }
    };
  },
  created() {
    this.getProposalList();
  },
  methods: {
    getProposalList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = { page: this.pageNum, size: this.pageSize };
      getsuggest(params)
        .then(res => {
          let tableData = [];
          if (res != -1 && res.content && res.content.length > 0) {
            tableData = res.content.map(item => {
              return {
                ...item,
                isUrgencyStr: item.isUrgency ? "否" : "是"
              };
            });
          }
          this.tableData = tableData;
          this.total = res.totalElements || 0;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    openDialog(data) {
      for (let key of Object.keys(this.formValue)) {
        this.formValue[key] = "";
      }
      this.dialogVisible = true;
      this.id = data.id;
    },
    submit() {
      let params = JSON.parse(JSON.stringify(this.formValue));
      params.id = this.id;
      dealsuggest(params)
        .then(res => {
          if (res != -1) {
            this.dialogVisible = false;
            this.$message.success("提交成功");
            this.getProposalList();
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
