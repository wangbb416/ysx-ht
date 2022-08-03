<!--生态环保-渔船纳污记录-->
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


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true"
             :tableConfig="fishingvesselTabel">

      <template #slotWasteType="{ data }">
        <div>{{ datafiltering(data.wasteType, WasteType).label }}</div>
      </template>

      <template #slotupdateTime="{ data }">
        <div>{{ getFormatTime(data.updateTime) }}</div>
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

import {fishingvesselTabel} from "./config";
import {fishingVesselList, downloadfishingVessel} from "@/api/ecofriendly";
import {exportXlsx, getFormatTime} from "@/utils/methods";
import {WasteType, datafiltering} from "@/utils/enum";

export default {
  name: "fishing-vessel-pollution",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch,
    MyDialog,
    MyForm,
  },
  data() {
    return {
      WasteType,
      datafiltering,
      getFormatTime,
      titleList: [
        {name: "生态环保", path: ""},
        {name: "渔船纳污记录", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "shipName", label: "", value: "", placeholder: '请输入渔船名称'},
        {
          type: "dynamic-select", field: "regionCode", label: "", value: "", placeholder: "请选择船籍港",
          props: {
            checkStrictly: true,
          }
        },
      ],
      form: {
        shipName: "",
        regionCode: "",
      },
      // 表格
      tableData: [],
      fishingvesselTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchType: '',
      searchCode: '',
      regionType: localStorage.getItem('regionType'),
      regionCode: localStorage.getItem('regionCode'),
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    getSearchData(data) {
      this.pageNum = 1;
      if (data) {
        this.searchCode = data.regionCode
        this.searchType = data.regionType
      }
      this.getListData();
    },
    getListData(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        regionType: this.regionType,
        regionCode: this.regionCode,
      };
      if (this.form.shipName) {
        params.shipName = this.form.shipName
      }
      if (this.searchCode) {
        params.searchType = this.searchType
        params.searchCode = this.searchCode
      }
      fishingVesselList(params)
        .then(res => {
          this.tableData = res.records || [];
          this.total = res.total || 0;
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
        regionType: this.regionType,
        regionCode: this.regionCode,
      };
      if (this.form.shipName) {
        params.shipName = this.form.shipName
      }
      if (this.searchCode) {
        params.searchType = this.searchType
        params.searchCode = this.searchCode
      }
      // 导出
      exportXlsx('渔船纳污记录', params, downloadfishingVessel);

    },

  }
};
</script>

<style lang="less" scoped>
</style>
