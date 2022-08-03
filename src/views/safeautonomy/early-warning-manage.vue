<!--安全自治-\预警信息管理-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">

        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getSearchData"
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


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="earlywarningmanageTabel">
      <template #slotUpdateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getListData"
    ></MyPagination>


  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {earlywarningmanageTabel} from "./config";
import {earlywarningmanageList, downloadearlywarningmanage} from "@/api/safeautonomy";
import {exportXlsx, getFormatTime} from "@/utils/methods";
import {AlertType} from "@/utils/enum";

export default {
  name: "fishing-vessel-pollution",
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
        {name: "安全自治", path: ""},
        {name: "预警信息管理", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "companyName", label: "", value: "", placeholder: "请输入渔船名称"},
        {
          type: "dynamic-select", field: "regionCode", label: "", value: "", placeholder: "请选择船籍港",
          props: {
            checkStrictly: true,
          }
        },
        {type: "select", field: "alarmType", label: "", value: '', placeholder: "请选择预警类型", option: AlertType,},
      ],
      form: {
        companyName: '',
        regionCode: [],
        alarmType: '',
      },
      // 表格
      tableData: [],
      earlywarningmanageTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      regionCode: localStorage.getItem('regionCode'),
      regionType: localStorage.getItem('regionType'),
      getFormatTime,
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    getSearchData(data) {
      this.pageNum = 1;
      if (data) {
        this.regionCode = data.regionCode ? data.regionCode : localStorage.getItem('regionCode');
        this.regionType = data.regionType ? data.regionType : localStorage.getItem('regionType');
      }
      this.getListData();
    },

    getListData(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyName: this.form.companyName,
        alarmType: this.form.alarmType,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };
      earlywarningmanageList(params)
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

    downLoad() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyName: this.form.companyName,
        alarmType: this.form.alarmType,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };

      // 导出
      exportXlsx('预警信息管理', params, downloadearlywarningmanage);

    },

  }
};
</script>

<style lang="less" scoped>
</style>




