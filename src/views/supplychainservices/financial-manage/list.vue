<!--供应链服务-财务管理-->

<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getSearchData"
        ></MySearch>
      </div>

    </div>


    <MyTable
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="financiallistTabel"
    >

      <template #slotWithdrawTo="{ data }">
        <div>支付宝</div>
      </template>

      <template #slotWithdrawStatus="{ data }">
        <div>{{ datafiltering(data, WithdrawStatus).label }}</div>
      </template>

      <template #slotCreateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <template #data_Operate="{data}">
        <div class="inline-button">
          <div class="detail my-button" title="详情" @click="openDialog('detail', data)">
            <i class="el-icon-document"></i>
          </div>

          <div v-if="data.withdrawStatus == 1" class="update my-button" title="提现处理"
               @click="openDialog('dealwith', data)">
            <i class="el-icon-coordinate"></i>
          </div>

        </div>
      </template>


    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getListData"
    ></MyPagination>

    <MyDialog
      :dialogVisible="dialogVisible"
      :title="title"
      @cancel="dialogVisible = false;"
    >
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'100px'"
          :buttonShow="true"
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
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {financiallistTabel} from "./config";
import {financialManageList, financialWithdrawalAudit} from "@/api/supplychainservice";
import {getFormatTime} from "@/utils/methods";
import {WithdrawStatus, datafiltering} from "@/utils/enum";

export default {
  name: "aftersales-manage",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch,
    MyDialog,
    MyForm
  },
  data() {
    return {
      titleList: [
        {name: "供应链服务", path: ""},
        {name: "财务管理", path: ""},
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "merchantName",
          label: "",
          placeholder: "请输入商家名称"
        },
        {
          type: "input",
          field: "withdrawNo",
          label: "",
          placeholder: "请输入提现单号"
        },
      ],
      form: {
        merchantName: "",
        withdrawNo: ""
      },
      // 表格
      tableData: [],
      financiallistTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      getFormatTime,
      datafiltering,
      WithdrawStatus,
      // 弹框
      dialogVisible: false,
      confirmButton: true,
      formList: [
        {
          type: "text",
          label: "处理方式:",
          valueLabel: "",
          name: '提现',
        },
        {
          type: "radio",
          label: "处理结果:",
          valueLabel: "withdrawStatus",
          option: [
            {
              label: '3',
              name: '同意提现',
            },
            {
              label: '2',
              name: '拒绝提现',
            },
          ],
        },
      ],
      title: "提现处理",
      formValue: {
        withdrawStatus: '3',
      },
      id: '',
    };
  },
  created() {
    this.getListData();
  },
  methods: {

    getSearchData() {
      this.pageNum = 1;
      this.getListData();
    },

    getListData(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        merchantName: this.form.merchantName,
        withdrawNo: this.form.withdrawNo,
      };
      financialManageList(params)
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

    openDialog(type, data = null) {
      console.log(data);
      switch (type) {
        case'detail':
          this.$router.push({
            path: "/ysx/financial-manage-detail",
            query: {data: data,}
          });
          break;
        case'dealwith':
          this.dialogVisible = true;
          this.id = data.id;
          break;
        default:
          break;
      }
      this.$nextTick(() => {

      });
    },

    submit() {
      console.log(this.formValue);
      let params = {
        id: this.id,
        withdrawStatus: this.formValue.withdrawStatus,
      };
      financialWithdrawalAudit(params)
        .then(res => {
          if (res != -1) {
            this.dialogVisible = false;
            this.$message.success("提交成功");
            this.getListData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

  }
};
</script>

<style lang="less" scoped></style>
