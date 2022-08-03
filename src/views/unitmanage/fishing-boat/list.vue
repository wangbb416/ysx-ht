<!--单位管理-渔船列表-->

<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getFishingBoatListReset"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div class="common-button" @click="openDialog('add')" title="新增">
            <i class="el-icon-plus"></i>
          </div>
          <div class="common-button" title="导出" @click="exportTableAction">
            <i class="el-icon-download"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable
      :isIndexBoo="true"
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="fishingBoatTable"
    >
      <template #data_Operate="{ data }">
        <div class="inline-button">
          <div class="detail my-button" title="详情" @click="openDialog('detail', data.id)">
            <i class="el-icon-document"></i>
          </div>
          <div class="delete my-button" title="删除" @click="openDialog('del', data.id)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </template>
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getFishingBoatList"
      :hidePagination="true"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";

import {fishingBoatTable} from "./config";
import {fishingBoatType, boatHealthCodeType} from "@/utils/enum";
import {
  fishingBoatList,
  fishingBoatDelete,
  exportExcel
} from "@/api/unitManagement";
import {exportXlsx, dateGrain} from "@/utils/methods";

export default {
  name: "fishing-boat-list",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch
  },
  data() {
    return {
      titleList: [
        {name: "单位管理", path: ""},
        {name: "渔船列表", path: ""}
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
          type: "select",
          field: "companyStatus",
          placeholder: "渔船状态",
          option: Object.keys(fishingBoatType).map(item => {
            return {
              value: item,
              label: fishingBoatType[item]
            };
          })
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
          field: "healthCode",
          placeholder: "渔船健康码",
          option: Object.keys(boatHealthCodeType).map(item => {
            return {
              value: item,
              label: boatHealthCodeType[item]
            };
          })
        }
      ],
      // 搜索数据字段
      form: {
        companyStr: "companyName",
        searchTxt: "",
        regionCode: [],
        companyStatus: "",
        healthCode: ""
      },
      // 表格数据
      tableData: [],
      fishingBoatTable,
      // 分页
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getFishingBoatList();
  },
  methods: {
    // 导出
    exportTableAction() {
      let t = dateGrain();
      let str = `渔船信息${t.dateYear}-${t.dateMonth}-${t.dateDay}`;
      let params = {
        companyType: 1,
        page: this.pageNum,
        size: this.pageSize
      };
      if (this.form.searchTxt) {
        params[this.form.companyStr] = this.form.searchTxt;
      }
      if (this.form.companyStatus) {
        params.companyStatus = this.form.companyStatus;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        params.regionCode = parseInt(
          this.form.regionCode[this.form.regionCode.length - 1]
        );
      }
      if (this.form.healthCode) {
        params.healthCode = this.form.healthCode;
      }
      exportXlsx(str, params, exportExcel);
    },
    getFishingBoatListReset() {
      this.pageNum = 1;
      this.getFishingBoatList();
    },
    getFishingBoatList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {page: this.pageNum, size: this.pageSize};
      if (this.form.searchTxt) {
        params[this.form.companyStr] = this.form.searchTxt;
      }
      if (this.form.companyStatus) {
        params.companyStatus = this.form.companyStatus;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        params.regionCode = parseInt(
          this.form.regionCode[this.form.regionCode.length - 1]
        );
      }
      if (this.form.healthCode) {
        params.healthCode = this.form.healthCode;
      }
      fishingBoatList(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData = res.content.map(item => {
                return {
                  ...item,
                  addressStr: `${item.province || ""}${item.city ||
                  ""}${item.area || ""}${item.street || ""}${item.address ||
                  ""}`,
                  parentNameStr: item.parentName || "-",
                  companyStatusStr: fishingBoatType[item.companyStatus]
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
        case "add":
          this.$router.push({
            path: "/ysx/fishing-boat-list-add"
          });
          break;
        case "del":
          this.$confirm("本渔船相关的一切内容将被删除，是否继续？", "提示")
            .then(_ => {
              fishingBoatDelete(itemId)
                .then(res => {
                  if (res != -1) {
                    this.$message.success("删除成功");
                    if (this.tableData.length == 1 && this.pageNum > 1) {
                      this.pageNum--;
                    }
                    this.getFishingBoatList();
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                });
            })
            .catch(_ => {
            });
          break;
        case "detail":
          this.$router.push({
            path: "/ysx/fishing-boat-list-detail",
            query: {itemId: itemId, pageStatus: "success"}
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
