<!--生态环保-环保三色码-->
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

          <div class="common-button configure" title="配置" @click="openDialog('jump')">
            <i class="el-icon-setting"></i>
          </div>

          <div class="common-button" title="下载" @click="downLoad">
            <i class="el-icon-download"></i>
          </div>

        </div>
      </div>

    </div>


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true"
             :tableConfig="environmentalthreeTabel">

      <template #homePort="{ data }">
        <div>
          {{ data.province ? data.province : '' }}
          {{ data.city ? data.city : '' }}
          {{ data.area ? data.area : '' }}
        </div>
      </template>

      <template #healthCodeStateType="{ data }">
        <div>{{ data.healthCodeState == 2 ? '红码' : (data.healthCodeState == 1 ? '黄码' : '绿码') }}</div>
      </template>

      <template #data_Operate="{ data }">
        <div class="inline-button">

          <div class="detail my-button" title="详情" @click="openDialog('detail', data)">
            <i class="el-icon-document"></i>
          </div>

          <div class="update my-button" title="修改" @click="openDialog('edit', data)">
            <i class="el-icon-edit"></i>
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

    <MyDialog :dialogVisible="showForm" :title="title" @cancel="showForm = false;apiNumber = 0">
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'120px'"
          :rules="rules"
          :buttonShow="true"
          :buttonTitle="'确认'"
          @changeDate="changeDate"
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

import {environmentalthreeTabel} from "./config";
import {threecolorList, downloadthreecolor, threecolorUpdate} from "@/api/ecofriendly";
import {exportXlsx} from "@/utils/methods";
import {HomePort, HealthCode, AutoState} from "@/utils/enum";


export default {
  name: "environmental-three-color",
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
      HomePort,
      HealthCode,
      AutoState,
      titleList: [
        {name: "生态环保", path: ""},
        {name: "环保三色码", path: ""}
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
        {type: "select", field: "healthCodeState", label: "", value: "", placeholder: "请选择环保三色码", option: HealthCode,},
      ],
      form: {
        companyName: '',
        regionCode: '',
        healthCodeState: '',
      },
      // 表格
      tableData: [],
      environmentalthreeTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      showForm: false,
      // 表单
      apiNumber: 0,
      formList: [
        {
          type: "select",
          label: "改为",
          valueLabel: "healthCodeState",
          valueType: "String",
          option: HealthCode,
          placeholder: '请选择要改成的三色码',
        },
        {
          type: "select",
          label: "是否刷新",
          valueLabel: "auto",
          valueType: "String",
          option: AutoState,
          placeholder: '请选择是否按规则自动刷新',
        },
        {
          type: "dateTime",
          label: "刷新开始时间",
          valueLabel: "afterHandler",
          valueType: "String",
          placeholder: '请选择时间',
        },
      ],
      formValue: {
        healthCodeState: '',
        auto: '',
        afterHandler: '',
      },
      rules: {
        healthCodeState: [{required: true, message: "请选择", trigger: "blur"}],
        auto: [{required: true, message: "请选择", trigger: "blur"}],
        afterHandler: [{required: true, message: "请选择", trigger: "blur"}],
      },
      title: "三色码修改",
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
        companyName: this.form.companyName,
        healthCodeState: this.form.healthCodeState,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };
      threecolorList(params)
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
        case 'edit':
          this.dialogVisible = true;
          this.showForm = true;
          console.log(data);
          this.id = data.id;
          this.formValue.healthCodeState = JSON.stringify(data.healthCodeState);
          this.formValue.auto = JSON.stringify(data.auto);
          this.$nextTick(() => {
            this.formValue.afterHandler = data.afterHandler;
          });
          this.changeDate();
          break;
        case 'jump':
          this.$router.push({
            path: "/ysx/environmental-three-color-configure",
          });
          break;
        case'detail':
          this.$router.push({
            path: "/ysx/environmental-three-color-detail",
            query: data
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
        companyName: this.form.companyName,
        healthCodeState: this.form.healthCodeState,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };

      // 导出
      exportXlsx('环保三色码', params, downloadthreecolor);
    },

    updateRecord() {
      let params = JSON.parse(JSON.stringify(this.formValue));
      params.id = this.id;
      threecolorUpdate(params)
        .then(res => {
          if (res != -1) {
            this.showForm = false;
            this.$message.success("修改成功");
            this.getListData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    submit() {
      console.log(this.id, this.formValue);
      this.updateRecord();
    },

    // 监听表单触发事件
    changeDate() {
      console.log(this.formValue);

      // 判断是否自动刷新隐藏时间选项
      if (this.formValue.auto == 1) {
        this.formList = [
          {
            type: "select",
            label: "改为",
            valueLabel: "healthCodeState",
            valueType: "String",
            option: HealthCode,
            placeholder: '请选择要改成的三色码',
          },
          {
            type: "select",
            label: "是否刷新",
            valueLabel: "auto",
            valueType: "String",
            option: AutoState,
            placeholder: '请选择是否按规则自动刷新',
          }
        ]
      } else {
        this.formList = [
          {
            type: "select",
            label: "改为",
            valueLabel: "healthCodeState",
            valueType: "String",
            option: HealthCode,
            placeholder: '请选择要改成的三色码',
          },
          {
            type: "select",
            label: "是否刷新",
            valueLabel: "auto",
            valueType: "String",
            option: AutoState,
            placeholder: '请选择是否按规则自动刷新',
          },
          {
            type: "dateTime",
            label: "刷新开始时间",
            valueLabel: "afterHandler",
            valueType: "String",
            placeholder: '请选择时间',
          },
        ]
        this.formValue.afterHandler = '';
      }

    }

  }
};
</script>

<style lang="less" scoped>
</style>
