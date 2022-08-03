<!--生态环保-环保信用分-->
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


      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">


          <div class="common-button" title="下载" @click="downLoad">
            <i class="el-icon-download"></i>
          </div>
        </div>
      </div>

    </div>


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true"
             :tableConfig="creditpointsTabel">

      <template #slotCreateTime="{ data }">
        <div>{{ getFormatTime(data.createTime) }}</div>
      </template>

      <template #data_Operate="{data}">
        <div class="inline-button">

          <div class="detail my-button" title="详情" @click="openDialog('detail', data)">
            <i class="el-icon-document"></i>
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
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {creditpointsTabel} from "./config";
import {creditpointsList, downloadcreditpoints} from "@/api/ecofriendly";
import {exportXlsx, getFormatTime} from "@/utils/methods";

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
        {name: "生态环保", path: ""},
        {name: "环保信用分", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "shipName", label: "", value: "", placeholder: "请输入渔船名称"},
        {
          type: "dynamic-select", field: "regionCode", label: "", value: "", placeholder: "请选择船籍港",
          props: {
            checkStrictly: true,
          }
        },
      ],
      form: {
        shipName: "",
        regionCode: [],
      },
      // 表格
      tableData: [],
      creditpointsTabel,
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
        shipName: this.form.shipName,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };
      creditpointsList(params)
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

    // 增删改查
    openDialog(type, data) {
      console.log(data);
      switch (type) {
        case'detail':
          this.$router.push({
            path: "/ysx/environmental-credit-points-detail",
            query: {shipName: data.shipName}
          });
          break;
        default:
          break;
      }
      this.$nextTick(() => {
      });
    },

    downLoad() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        shipName: this.form.shipName,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };

      // 导出
      exportXlsx('环保信用分', params, downloadcreditpoints);

    }

  }
};
</script>

<style lang="less" scoped>
</style>
