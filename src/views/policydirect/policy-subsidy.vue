<!--政策直通-政策补贴-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="searchPolicySubsidies"
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
      :tableConfig="policySubsidiesTable"
    >
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getPolicySubsidies"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";

import { policySubsidiesTable } from "./config";
import { policySubsidies,downPolicySubsidies } from "@/api/policydirect";
import { policySubsidyType } from "@/utils/enum";
import {exportXlsx} from "@/utils/methods";

export default {
  name: "fishing-vessel-pollution",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch
  },
  data() {
    return {
      titleList: [
        { name: "政策直通", path: "" },
        { name: "政策补贴", path: "" }
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "shipName",
          placeholder: "请输入船舶名称"
        },
        {
          type: "select",
          field: "subsidyType",
          placeholder: "请选择补贴类型",
          option: Object.keys(policySubsidyType).map(item => {
            return {
              value: item,
              label: policySubsidyType[item]
            };
          })
        }
      ],
      form: {
        shipName: "",
        subsidyType: ""
      },
      // 表格
      tableData: [],
      policySubsidiesTable,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getPolicySubsidies();
  },
  methods: {
    // 搜索
    searchPolicySubsidies(){
      this.pageNum = 1
      this.getPolicySubsidies()
    },
    // 获取列表数据
    getPolicySubsidies(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        shipName: this.form.shipName,
        subsidyType: this.form.subsidyType
      };

      policySubsidies(params)
        .then(res => {
          if (res != -1) {
            if (res.records && res.records.length > 0) {
              this.tableData = res.records.map(item => {
                return {
                  ...item,
                  subsidyMoneyStr: item.subsidyMoney + "元",
                  subsidyTypeStr: policySubsidyType[item.subsidyType]
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
        pageNum: this.page,
        pageSize: this.size,
      };
      if(this.form.shipName){
        params.shipName = this.form.shipName
      }
      if(this.form.subsidyType){
        params.subsidyType = this.form.subsidyType
      }
      // console.log(params,"params");
      // 导出
      exportXlsx('政策补贴', params, downPolicySubsidies);
    }
  }
};
</script>

<style lang="less" scoped></style>
