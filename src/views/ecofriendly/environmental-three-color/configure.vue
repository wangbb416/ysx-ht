<!--生态环保-环保三色码-配置列表-->
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

          <div class="common-button" title="新增" @click="openDialog('add',)">
            <i class="el-icon-plus"></i>
          </div>

        </div>
      </div>

    </div>


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true"
             :tableConfig="environmentalconfigureTabel">


    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getListData"
    ></MyPagination>

    <MyDialog :dialogVisible="showForm" :title="title" @cancel="showForm = false">
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'150px'"
          :rules="rules"
          :buttonShow="true"
          :buttonTitle="'确认'"
          @confirm="submit"
          @cancel="showForm = false"
        ></MyForm>
      </template>
    </MyDialog>

  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {environmentalconfigureTabel} from "./config";
import {threecolorConfigureList, threecolorConfigureAdd} from "@/api/ecofriendly";
import {exportXlsx} from "@/utils/methods";

export default {
  name: "configure",
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
        {name: "环保三色码", path: "/ysx/environmental-three-color"},
        {name: "配置", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "paramKey", label: "", value: "", placeholder: "请输入配置名称"},
        // {
        //   type: "dynamic-select", field: "regionCode", label: "", value: "", placeholder: "请选择船籍港",
        //   props: {
        //     checkStrictly: true,
        //   }
        // },
      ],
      form: {
        paramKey: "",
        regionCode: "",
      },
      // 表格
      tableData: [],
      environmentalconfigureTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      showForm: false,
      status: 1, // 1:新增  2:编辑
      // 表单
      formList: [
        {
          type: "input",
          label: "配置名称",
          valueLabel: "paramKey",
          valueType: "String",
          maxlength: 10,
        },
        {
          type: "dynamic-select", valueLabel: "regionCode", label: "船籍港", value: "", placeholder: "请选择",
          showLevels: false,
          props: {
            checkStrictly: true,
          }
        },
        {
          type: "",
          label: "黄码规则:",
        },
        {
          type: "input",
          label: "入港次数达到",
          valueLabel: "inPortTimesToYellow",
          valueType: "String"
        },
        {
          type: "input",
          label: "黄码时未排污天数",
          valueLabel: "unThrowWasteTimeToYellow",
          valueType: "String"
        },
        {
          type: "",
          label: "红码规则:",
        },
        {
          type: "input",
          label: "入港多少次变红",
          valueLabel: "inPortTimesToRed",
          valueType: "String"
        },
        {
          type: "input",
          label: "红码时未排污天数",
          valueLabel: "unThrowWasteTimeToRed",
          valueType: "String"
        },
        {
          type: "dateTime",
          label: "周期开始时间",
          valueLabel: "runTime",
          valueType: "String"
        },
      ],
      formValue: {
        paramKey: '',
        paramValue: 'cycle',
        extraValue: {},
        paramDesc: '',
        extraDesc: {},
        regionType: '',
        regionCode: '',
        inPortTimesToYellow: '',
        unThrowWasteTimeToYellow: '',
        inPortTimesToRed: '',
        unThrowWasteTimeToRed: '',
        runTime: '',
      },
      rules: {
        paramKey: [{required: true, message: "请输入", trigger: "blur"}],
        regionCode: [{required: true, message: "请选择", trigger: "blur"}],
        inPortTimesToYellow: [{required: true, message: "请输入", trigger: "blur"}],
        unThrowWasteTimeToYellow: [{required: true, message: "请输入", trigger: "blur"}],
        inPortTimesToRed: [{required: true, message: "请输入", trigger: "blur"}],
        unThrowWasteTimeToRed: [{required: true, message: "请输入", trigger: "blur"}],
        runTime: [{required: true, message: "请输入", trigger: "blur"}],
      },
      title: "新增配置",
      regionCode: localStorage.getItem('regionCode'),
      regionType: localStorage.getItem('regionType'),
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
        paramKey: this.form.paramKey,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };
      threecolorConfigureList(params)
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
        case 'add':
          this.dialogVisible = true;
          this.showForm = true;
          this.formValue.paramKey = '';
          this.formValue.inPortTimesToYellow = '';
          this.formValue.unThrowWasteTimeToYellow = '';
          this.formValue.inPortTimesToRed = '';
          this.formValue.unThrowWasteTimeToRed = '';
          this.formValue.runTime = '';
          this.formValue.regionType = '';
          this.formValue.regionCode = '';
          this.formValue.paramDesc = '';
          break;
        default:
          break;
      }

    },

    submit() {
      let params = {};
      params.extraValue = JSON.stringify({
        inPortTimesToYellow: this.formValue.inPortTimesToYellow,
        unThrowWasteTimeToYellow: this.formValue.unThrowWasteTimeToYellow,
        inPortTimesToRed: this.formValue.inPortTimesToRed,
        unThrowWasteTimeToRed: this.formValue.unThrowWasteTimeToRed,
        runTime: this.formValue.runTime,
      })

      params.extraDesc = JSON.stringify({
        regionType: this.formValue.regionType,
        regionCode: this.formValue.regionCode,
      })
      params.paramKey = this.formValue.paramKey;
      params.paramValue = this.formValue.paramValue;
      params.paramDesc = this.formValue.regionName;
      threecolorConfigureAdd(params)
        .then(res => {
          if (res != -1) {
            this.showForm = false;
            this.$message.success("新增成功");
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
