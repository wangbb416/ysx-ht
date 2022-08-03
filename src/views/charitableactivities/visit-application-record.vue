<!--公益活动-参观申请记录-->
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
             :tableConfig="visitapplicationrecordTabel">


      <template #data_Operate="{ data }">
        <div class="inline-button">

          <div class="marginAuto" v-if="data.approvalStatus>0">{{ data.approvalStatus == 1 ? '已通过' : '已拒绝' }}</div>
          <div class="marginAuto" v-if="data.approvalStatus == 0">
            <el-button size="mini" @click="operationManage('1',data)">通过</el-button>
            <el-button size="mini" @click="operationManage('2',data)">拒绝</el-button>
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

    <!--    <MyDialog-->
    <!--      :dialogVisible="dialogVisible"-->
    <!--      :title="title"-->
    <!--      @cancel="dialogVisible = false;apiNumber = 0"-->
    <!--    >-->
    <!--      <template v-slot:content>-->
    <!--        <MyForm-->
    <!--          ref="myForm"-->
    <!--          :formList="formList"-->
    <!--          :formValue="formValue"-->
    <!--          :labelWidth="'120px'"-->
    <!--          :rules="rules"-->
    <!--          :buttonShow="true"-->
    <!--          @confirm="submit"-->
    <!--          @cancel="dialogVisible = false"-->
    <!--        ></MyForm>-->
    <!--      </template>-->
    <!--    </MyDialog>-->


  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {visitapplicationrecordTabel} from "./config";
import {
  visitapplicationrecordList,
  operaVisitapplicationrecord,
  downloadVisitapplicationrecord
} from "@/api/charitableactivities";
import {exportXlsx} from "@/utils/methods";

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
        {name: "公益活动", path: ""},
        {name: "参观申请记录", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "companyName", label: "", value: "", placeholder: "请输入申请单位"},
      ],
      form: {
        username: "",
        nickname: "",
      },
      // 表格
      tableData: [],
      visitapplicationrecordTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
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
        page: this.pageNum,
        size: this.pageSize,
        companyName: this.form.companyName,
      };
      visitapplicationrecordList(params)
        .then(res => {
          if (res != -1) {
            this.tableData = res.content || [];
            this.total = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    downLoad() {
      let params = {
        page: this.pageNum,
        size: this.pageSize,
        companyName: this.form.companyName,
      };
      // 导出
      exportXlsx('参观申请记录', params, downloadVisitapplicationrecord);

    },

    // 操作管理
    operationManage(type, data) {

      if (type == '1') {
        this.$confirm("是否同意该申请？")
          .then(_ => {
            this.submit(type, data);
          })
          .catch(_ => {
          });
      } else {
        this.submit(type, data);
      }

    },

    submit(type, data) {
      let params = {
        approvalStatus: type,
        id: data.id,
      };
      operaVisitapplicationrecord(params)
        .then(res => {
          if (res != -1) {
            this.dialogVisible = false;
            this.$message.success("提交成功");
            this.getListData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

  }
};
</script>

<style lang="less" scoped>
</style>


