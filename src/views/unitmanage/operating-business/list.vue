<!--单位管理-运营企业列表-->

<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getOperatingBusinessListReset"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div class="common-button" @click="openDialog('add')" title="新增">
            <i class="el-icon-plus"></i>
          </div>
          <div class="common-button" title="导入" @click="importTableAction">
            <i class="el-icon-upload2"></i>
          </div>
          <div class="common-button" title="导出" @click="exportTableAction">
            <i class="el-icon-download"></i>
          </div>
          <div @click="downLoadModule" class="common-button" title="下载模板">
            <i class="el-icon-download"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable
      :isIndexBoo="true"
      :data="tableData"
      :pageNum="pageNum" :pageSize="pageSize"
      :tableConfig="operatingBusinessTable"
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
      @pageChange="getOperatingBusinessList"
      :hidePagination="true"
    ></MyPagination>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";

import { operatingBusinessTable } from "./config";
import {
  operatingBusinessList,
  operatingBusinessDelete,
  downloadFishingBoatList,
  exportExcel,
  importExcel,
  importExcelError
} from "@/api/unitManagement";
import { exportXlsx, dateGrain } from "@/utils/methods";
export default {
  name: "operating-business-list",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch
  },
  data() {
    return {
      titleList: [
        { name: "单位管理", path: "" },
        { name: "运营企业列表", path: "" }
      ],
      // 搜索条件
      searchField: [
        {
          type: "select",
          field: "companyStr",
          placeholder: "请选择",
          option: [
            { label: "企业名称", value: "companyName" },
            { label: "企业编号", value: "companyId" }
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
          placeholder: "单位地址",
          options: {
            leave: 3
          }
        }
      ],
      // 搜索数据字段
      form: {
        companyStr: "companyName",
        searchTxt: "",
        regionCode: []
      },
      // 表格
      tableData: [],
      operatingBusinessTable,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getOperatingBusinessList();
  },
  methods: {
    // 导入
    importTableAction() {
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      let that = this;
      input.onchange = function() {
        let regSuffix = {
          excel: /(.xls|.xlsx|.et)$/
        };
        let name = input.files[0].name;
        if (!regSuffix["excel"].test(name)) {
          that.$message({
            message: "请注意文件格式",
            type: "warning"
          });
          return;
        }
        var form = new FormData();
        form.append("file", input.files[0]);
        form.append("companyType", 6);
        importExcel(form)
          .then(res => {
            if (res != -1) {
              if (res.count > 0) {
                let t = dateGrain();
                let str = `错误导入信息列表${t.dateYear}-${t.dateMonth}-${t.dateDay}`;
                exportXlsx(str, { key: res.key }, importExcelError);
              }else{
                that.$message.success('已导入');
              }
              that.getOperatingBusinessListReset()
            }
          })
          .catch(error => {
            that.$message.error(error.msg);
          });
      };
    },
    // 导出
    exportTableAction() {
      let t = dateGrain();
      let str = `运营企业信息${t.dateYear}-${t.dateMonth}-${t.dateDay}`;
      let params = {
        companyType: 6,
        page: this.pageNum,
        size: this.pageSize,
        regionType: localStorage.getItem('regionType') || '',
        regionCode: localStorage.getItem('regionCode') || ''
      };
      if (this.form.searchTxt) {
        params[this.form.companyStr] = this.form.searchTxt;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        params.searchCode = parseInt(
          this.form.regionCode[this.form.regionCode.length - 1]
        );
        params.searchType =
          this.form.regionCode.findIndex(item => {
            return item == params.searchCode;
          }) + 1;
      }
      exportXlsx(str, params, exportExcel);
    },
    // 下载
    downLoadModule() {
      let params = {
        companyType: 6
      };
      exportXlsx("运营企业信息导入模板", params, downloadFishingBoatList);
    },
    getOperatingBusinessListReset() {
      this.pageNum = 1;
      this.getOperatingBusinessList();
    },
    getOperatingBusinessList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        page: this.pageNum,
        size: this.pageSize,
        regionType: localStorage.getItem('regionType') || '',
        regionCode: localStorage.getItem('regionCode') || ''
      };
      if (this.form.searchTxt) {
        params[this.form.companyStr] = this.form.searchTxt;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        params.searchCode = parseInt(
          this.form.regionCode[this.form.regionCode.length - 1]
        );
        params.searchType =
          this.form.regionCode.findIndex(item => {
            return item == params.searchCode;
          }) + 1;
      }
      operatingBusinessList(params)
        .then(res => {
          if (res != -1) {
            if (res.records && res.records.length > 0) {
              this.tableData = res.records.map(item => {
                return {
                  ...item,
                  address:
                    item.province +
                    item.city +
                    (item.area || "") +
                    (item.street || "") +
                    (item.address || "")
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
    // 增删改查
    openDialog(type, itemId = null) {
      switch (type) {
        case "add":
          this.$router.push({
            path: "/ysx/operating-business-add"
          });
          break;
        case "del":
          this.$confirm("本运营企业相关的一切内容将被删除，是否继续？", "提示")
            .then(_ => {
              operatingBusinessDelete(itemId)
                .then(res => {
                  if (res != -1) {
                    this.$message.success("删除成功");
                    if (this.tableData.length == 1 && this.pageNum > 1) {
                      this.pageNum--;
                    }
                    this.getOperatingBusinessList();
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                });
            })
            .catch(_ => {});
          break;
        case "detail":
          this.$router.push({
            path: "/ysx/operating-business-detail",
            query: { itemId: itemId }
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
