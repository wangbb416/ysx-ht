<!--单位管理-渔港列表-->

<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getFishingPortListReset"
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
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="fishingPortListTable"
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
      @pageChange="getFishingPortList"
      :hidePagination="true"
    ></MyPagination>
  </div>
</template>
<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import {fishingPortStatusType, fishingPortLevelType} from "@/utils/enum";
import {fishingPortListTable} from "./config";

import {
  fishingPortList,
  fishingPortDelete,
  downloadFishingBoatList,
  exportExcel,
  importExcel,
  importExcelError
} from "@/api/unitManagement";
import {exportXlsx, dateGrain} from "@/utils/methods";

export default {
  name: "fishing-ports-list",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch
  },
  data() {
    return {
      // 面包屑
      titleList: [
        {name: "单位管理", path: ""},
        {name: "渔港列表", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "select",
          field: "companyStr",
          placeholder: "请选择",
          option: [
            {label: "渔港名称", value: "companyName"},
            {label: "渔港编号", value: "companyId"}
          ]
        },
        {
          type: "input",
          field: "searchTxt",
          placeholder: "输入关键字"
        },
        {
          type: "select",
          field: "subType",
          placeholder: "渔港级别",
          option: Object.keys(fishingPortLevelType).map(item => {
            return {
              value: item,
              label: fishingPortLevelType[item]
            };
          })
        },
        {
          type: "addressSelect",
          field: "regionCode",
          placeholder: "单位地址",
          options: {
            leave: 3
          }
        },
        {
          type: "select",
          field: "companyStatus",
          placeholder: "渔港状态",
          option: Object.keys(fishingPortStatusType).map(item => {
            return {
              value: item,
              label: fishingPortStatusType[item]
            };
          })
        }
      ],
      // 搜索数据字段
      form: {
        companyStr: "companyName",
        searchTxt: "",
        subType: "",
        regionCode: [],
        companyStatus: ""
      },
      // 表格数据
      tableData: [],
      fishingPortListTable,
      // 分页
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getFishingPortList();
  },
  methods: {
    // 导入
    importTableAction() {
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      let that = this;
      input.onchange = function () {
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
        form.append("companyType", 2);
        importExcel(form)
          .then(res => {
            if (res != -1) {
              if (res.count > 0) {
                let t = dateGrain();
                let str = `错误导入信息列表${t.dateYear}-${t.dateMonth}-${t.dateDay}`;
                exportXlsx(str, {key: res.key}, importExcelError);
              } else {
                that.$message.success("已导入");
              }
              that.getFishingPortListReset();
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
      let str = `渔港信息${t.dateYear}-${t.dateMonth}-${t.dateDay}`;
      let params = {
        companyType: 2,
        page: this.pageNum,
        size: this.pageSize
      };
      if (this.form.searchTxt) {
        params[this.form.companyStr] = this.form.searchTxt;
      }
      if (this.form.subType) {
        params.subType = this.form.subType;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        params.regionCode = parseInt(
          this.form.regionCode[this.form.regionCode.length - 1]
        );
      }
      if (this.form.companyStatus) {
        params.companyStatus = this.form.companyStatus;
      }
      exportXlsx(str, params, exportExcel);
    },
    // 下载
    downLoadModule() {
      let params = {
        companyType: 2
      };
      exportXlsx("渔港信息导入模板", params, downloadFishingBoatList);
    },
    getFishingPortListReset() {
      this.pageNum = 1;
      this.getFishingPortList();
    },
    // 获取列表数据
    getFishingPortList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {page: this.pageNum, size: this.pageSize};
      if (this.form.searchTxt) {
        params[this.form.companyStr] = this.form.searchTxt;
      }
      if (this.form.subType) {
        params.subType = this.form.subType;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        params.regionCode = parseInt(
          this.form.regionCode[this.form.regionCode.length - 1]
        );
      }
      if (this.form.companyStatus) {
        params.companyStatus = this.form.companyStatus;
      }
      fishingPortList(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData = res.content.map(item => {
                return {
                  ...item,
                  addressStr: `${item.province || ""}${item.city ||
                  ""}${item.area || ""}${item.street || ""}${item.address ||
                  ""}`,
                  subTypeStr: fishingPortLevelType[item.subType],
                  companyStatusStr: fishingPortStatusType[item.companyStatus]
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
            path: "/ysx/fishing-ports-list-add"
          });
          break;
        case "del":
          this.$confirm("本渔港相关的一切内容将被删除，是否继续？", "提示")
            .then(_ => {
              fishingPortDelete(itemId)
                .then(res => {
                  if (res != -1) {
                    this.$message.success("删除成功");
                    if (this.tableData.length == 1 && this.pageNum > 1) {
                      this.pageNum--;
                    }
                    this.getFishingPortList();
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
            path: "/ysx/fishing-ports-list-detail",
            query: {itemId: itemId}
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
