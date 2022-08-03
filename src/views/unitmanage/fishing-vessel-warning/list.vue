<!--单位管理-渔船预警列表-->

<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getFishingBoatWarningReset"
        ></MySearch>
      </div>

      <div class="select-list-r"></div>
    </div>

    <MyTable
      :isIndexBoo="true"
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="fishingBoatWarningTable"
    >
      <template #data_Operate="{ data }">
        <div
          class="btn_auto detail my-button"
          title="详情"
          @click="openDialog('detail', data.companyId)"
        >
          <i class="el-icon-document"></i>
        </div>
      </template>
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getFishingBoatWarning"
      :hidePagination="true"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";

import {fishingBoatWarningTable} from "./config";
import {fishingBoatWarningType} from "@/utils/enum";
import {fishingBoatWarningList} from "@/api/unitManagement";
import {dateGrain} from "@/utils/methods";

export default {
  name: "fishing-vessel-warning-list",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch
  },
  data() {
    return {
      // 搜索条件
      titleList: [
        {name: "单位管理", path: ""},
        {name: "渔船预警列表", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "select",
          field: "companyStr",
          placeholder: "请选择",
          option: [
            {label: "船名", value: "companyName"},
            {label: "渔船编号", value: "companyId"}
          ]
        },
        {
          type: "input",
          field: "searchTxt",
          placeholder: "输入关键字"
        },
        {
          type: "addressSelect",
          field: "regionCode",
          placeholder: "船籍港",
          options: {
            leave: 2
          }
        },
        {
          type: "select",
          field: "alarmType",
          placeholder: "预警类型",
          option: Object.keys(fishingBoatWarningType).map(item => {
            return {
              value: item,
              label: fishingBoatWarningType[item]
            };
          })
        }
      ],
      // 搜索数据字段
      form: {
        companyStr: "companyName",
        searchTxt: "",
        regionCode: [],
        alarmType: ""
      },
      // 表格
      tableData: [],
      fishingBoatWarningTable,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getFishingBoatWarning();
  },
  methods: {
    getFishingBoatWarningReset() {
      this.pageNum = 1;
      this.getFishingBoatWarning();
    },
    // 获取列表数据
    getFishingBoatWarning(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {page: this.pageNum, size: this.pageSize};
      if (this.form.searchTxt) {
        params[this.form.companyStr] = this.form.searchTxt;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        params.regionCode = parseInt(
          this.form.regionCode[this.form.regionCode.length - 1]
        );
      }
      if (this.form.alarmType) {
        params.alarmType = this.form.alarmType;
      }
      fishingBoatWarningList(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData = res.content.map(item => {
                let t = dateGrain(item.beginTime);
                return {
                  ...item,
                  beginTimeStr: `${t.dateYear}-${t.dateMonth}-${t.dateDay} ${t.dateHours}:${t.dateMinute}:${t.dateSecond}`,
                  addressStr: `${item.province || ""}${item.city ||
                  ""}${item.area || ""}${item.street || ""}${item.address ||
                  ""}`
                };
              });
            } else {
              this.tableData = [];
            }
            this.total = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    // 增删改查
    openDialog(type, itemId = null) {
      switch (type) {
        case "detail":
          this.$router.push({
            path: "/ysx/fishing-boat-list-detail",
            query: {itemId: itemId, pageStatus: "warning"}
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.btn_auto {
  margin: 0 auto;
}
</style>
