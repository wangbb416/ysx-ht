<!--公益活动-宣教记录-->
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

    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true" :tableConfig="publicityrecordTabel">

      <template #slotLastRole="{data}">
        <div>{{ datafiltering(data.role, StudentStatus).label }}</div>
      </template>

      <template #slotLastType="{data}">
        <div>{{ data.type == 1 ? '图文' : '视频' }}</div>
      </template>

      <template #slotEndTime="{ data }">
        <div>{{ getFormatTime(data ? data.endTime : '') }}</div>
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

import {publicityrecordTabel} from "./config";
import {publicityrecordList, downloadPublicityrecord} from "@/api/charitableactivities";
import {exportXlsx, getFormatTime} from "@/utils/methods";
import {StudentStatus, datafiltering} from "@/utils/enum";

export default {
  name: "publicity-record",
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
      getFormatTime,
      datafiltering,
      StudentStatus,
      titleList: [
        {name: "公益活动", path: ""},
        {name: "宣教记录", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "username", label: "", value: "", placeholder: "请输入学员姓名"},
        {type: "select", field: "role", label: "", value: "", placeholder: "请选择学员身份", option: StudentStatus},
      ],
      form: {
        username: "",
        role: "",
      },
      // 表格
      tableData: [],
      publicityrecordTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      studyType: 3,

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
        studyType: this.studyType,
        username: this.form.username,
        role: this.form.role,
      };
      publicityrecordList(params)
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

    openDialog(type, data) {
      switch (type) {
        case'detail':
          this.$router.push({
            path: "/ysx/publicity-record-detail",
            query: {id: data.id}
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
        studyType: this.studyType,
        username: this.form.username,
        role: this.form.role,
      };

      // 导出
      exportXlsx('宣教记录', params, downloadPublicityrecord);

    },


  }
};
</script>

<style lang="less" scoped>
</style>


