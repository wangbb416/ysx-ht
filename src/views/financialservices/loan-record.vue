<!--金融服务-贷款记录-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="formValue"
          @search="getLoanRecordReset"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div class="common-button" title="下载" @click="downLoad">
            <i class="el-icon-download"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable
      :isIndexBoo="true"
      :data="tableData"
      :pageNum="pageNum" :pageSize="pageSize"
      :tableConfig="loanRecordTable"
    >
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getLoanRecord"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";

import { loanRecordTable } from "./config";
import { loanRecord,downLoanRecord } from "@/api/financialservices";
import { bankType, loanType } from "@/utils/enum";
import {exportXlsx} from "@/utils/methods";
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
        { name: "金融服务", path: "" },
        { name: "贷款记录", path: "" }
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "shipName",
          placeholder: "请输入申请人姓名"
        },
        {
          type: "select",
          field: "bankType",
          placeholder: "请选择银行类型",
          require:true,
          option: Object.keys(bankType).map(item => {
            return {
              value: item,
              label: bankType[item]
            };
          })
        },
        {
          type: "select",
          field: "loanType",
          placeholder: "请选择贷款类型",
          option: Object.keys(loanType).map(item => {
            return {
              value: item,
              label: loanType[item]
            };
          })
        }
      ],
      // 表格
      tableData: [],
      loanRecordTable,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formValue: {
        shipName: "",
        bankType: "1",
        loanType: ""
      }
    };
  },
  created() {
    this.getLoanRecord();
  },
  methods: {
    getLoanRecordReset() {
      this.pageNum = 1;
      this.getLoanRecord();
    },
    // 获取列表数据
    getLoanRecord(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if(this.formValue.shipName){
        params.shipName = this.formValue.shipName
      }
      if(this.formValue.bankType){
        params.bankType = this.formValue.bankType
      }
      if(this.formValue.loanType){
        params.loanType = this.formValue.loanType
      }
      loanRecord(params)
        .then(res => {
          if (res != -1) {
            if (res.records && res.records.length > 0) {
              this.tableData = res.records.map(item => {
                return {
                  ...item,
                  loanTypeStr: loanType[item.loanType],
                  bankTypeStr: bankType[item.bankType],
                  loanAmountStr: item.loanAmount + "元"
                };
              });
            } else {
              this.tableData = [];
            }
            this.total = res.total || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    // 下载
    downLoad() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if(this.formValue.shipName){
        params.shipName = this.formValue.shipName
      }
      if(this.formValue.bankType){
        params.bankType = this.formValue.bankType
      }
      if(this.formValue.loanType){
        params.loanType = this.formValue.loanType
      }
      // 导出
      exportXlsx('贷款记录', params, downLoanRecord);
    }
  }
};
</script>

<style lang="less" scoped></style>
