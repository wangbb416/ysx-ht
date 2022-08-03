<!--公益活动-先锋驿站-->
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

          <div class="common-button" title="下载" @click="downLoad">
            <i class="el-icon-download"></i>
          </div>

        </div>
      </div>

    </div>


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true"
             :tableConfig="pioneerstationTabel">


      <template #slotAddress="{ data }">
        <div class="cell el-tooltip">
          {{ data.province }}
          {{ data.city }}
          {{ data.area }}
          {{ data.street }}
          {{ data.address }}
        </div>
      </template>


      <template #data_Manage="{ data }">
        <el-button size="mini" title="详情" @click="openDialog('detail',data)">查看</el-button>
      </template>


      <template #data_Operate="{ data }">
        <div class="inline-button">

          <div class="update my-button" title="修改" @click="openDialog('edit', data)">
            <i class="el-icon-edit"></i>
          </div>

          <div class="delete my-button" title="删除" @click="openDialog('del',data)">
            <i class="el-icon-delete"></i>
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

    <MyDialog
      :dialogVisible="dialogVisible"
      :title="title"
      @cancel="dialogVisible = false;apiNumber = 0"
    >
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'120px'"
          :rules="rules"
          :buttonShow="true"
          @confirm="submit"
          @cancel="dialogVisible = false"
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

import {pioneerstationTabel} from "./config";
import {
  pioneerstationList,
  pioneerstationAdd,
  pioneerstationUpdate,
  downloadPioneerstation,
  pioneerstationDelete,
} from "@/api/charitableactivities";
import {fluoritteCloud} from "@/utils/fluoriteCloud";
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
        {name: "先锋驿站", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "stationName", label: "", value: "", placeholder: "请输入先锋驿站名称"},
        {
          type: "dynamic-select", field: "regionCode", label: "", value: "", placeholder: "请选择地址", showLevels: false,
          props: {
            checkStrictly: true,
          }
        },
      ],
      form: {
        stationName: "",
        regionCode: "",
      },
      // 表格
      tableData: [],
      pioneerstationTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      dialogVisible: false,
      confirmButton: true,
      formList: [
        {
          type: "input",
          label: "先锋驿站名称",
          valueLabel: "stationName",
          valueType: "String"
        },
        {
          type: "input",
          label: "联系人",
          valueLabel: "contact",
          valueType: "String"
        },
        {
          type: "input",
          label: "联系电话",
          maxlength: 15,
          valueLabel: "phone",
          valueType: "String"
        },
        {
          type: "dynamic-select", valueLabel: "regionCode", label: "地址", value: "", placeholder: "请选择地址",
          props: {
            checkStrictly: true,
          }
        },
        {
          type: "input",
          label: "",
          valueLabel: "address",
          valueType: "String"
        },
        {
          type: "input",
          label: "经纬度",
          valueLabel: "location",
          valueType: "String"
        },
      ],
      title: '',
      formValue: {
        stationName: "",
        contact: "",
        phone: "",
        regionCode: "",
        address: "",
        location: "",
      },
      rules: {
        stationName: [{required: true, message: "请输入", trigger: "blur"}],
        contact: [{required: true, message: "请输入", trigger: "blur"}],
        phone: [{required: true, message: "请输入", trigger: "blur"}],
        regionCode: [{required: true, message: "请选择", trigger: "blur"}],
        address: [{required: true, message: "请输入", trigger: "blur"}],
        location: [{required: true, message: "请输入", trigger: "blur"}],
      },
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
        stationName: this.form.stationName,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };
      pioneerstationList(params)
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

    openDialog(type, data = null) {

      switch (type) {
        case'add':
          this.title = '新增先锋驿站';
          this.dialogVisible = true;
          this.showForm = true;
          this.id = '';
          this.formValue.stationName = '';
          this.formValue.contact = '';
          this.formValue.phone = '';
          this.formValue.address = '';
          this.formValue.location = '';
          this.formValue.regionCode = '';
          this.formValue.regionName = '';
          this.formValue.regionType = '';
          this.formValue.regionALLCodeList = [];
          this.formValue.regionALLNameList = [];
          // 省-市-区-街道
          this.formValue.provinceCode = '';
          this.formValue.cityCode = '';
          this.formValue.areaCode = '';
          this.formValue.streetCode = '';
          this.formValue.province = '';
          this.formValue.city = '';
          this.formValue.area = '';
          this.formValue.street = '';
          break;
        case 'edit':
          this.title = '修改先锋驿站';
          this.dialogVisible = true;
          this.showForm = true;
          this.id = data.id;
          this.formValue.stationName = data.stationName;
          this.formValue.contact = data.contact;
          this.formValue.phone = data.phone;
          this.formValue.address = data.address;
          this.formValue.location = data.location;
          this.formValue.regionCode = data.streetCode || data.areaCode || data.cityCode || data.provinceCode || '';
          // 省-市-区-街道
          this.formValue.provinceCode = data.provinceCode;
          this.formValue.cityCode = data.cityCode;
          this.formValue.areaCode = data.areaCode;
          this.formValue.streetCode = data.streetCode;
          this.formValue.province = data.province;
          this.formValue.city = data.city;
          this.formValue.area = data.area;
          this.formValue.street = data.street;
          break;
        case'detail':
          // 萤石云视频加载
          fluoritteCloud();

          this.$router.push({
            path: "/ysx/pioneer-station-video-wall",
            query: {}
          });
          break;
        case'del':
          this.$confirm("确认删除？")
            .then(_ => {
              pioneerstationDelete({id: data.id})
                .then(res => {
                  this.$message.success("删除成功");
                  if (this.tableData.length == 1 && this.pageNum > 1) {
                    this.pageNum--;
                  }
                  this.getSearchData();
                })
                .catch(error => {
                  this.$message.error(error.message);
                });
            })
            .catch(_ => {
            });
          break;
        default:
          break;
      }
    },

    downLoad() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        stationName: this.form.stationName,
        regionCode: this.regionCode,
        regionType: this.regionType,
      };

      // 导出
      exportXlsx('先锋驿站', params, downloadPioneerstation);

    },

    submit(data) {
      console.log(data);
      console.log(this.form, '------------')
      console.log(this.formValue, '+++++++++++++')
      let params = this.formValue;
      params.provinceCode = this.formValue.regionALLCodeList ? this.formValue.regionALLCodeList[0] : this.formValue.provinceCode;
      params.cityCode = this.formValue.regionALLCodeList ? this.formValue.regionALLCodeList[1] : this.formValue.cityCode;
      params.areaCode = this.formValue.regionALLCodeList ? this.formValue.regionALLCodeList[2] : this.formValue.areaCode;
      params.streetCode = this.formValue.regionALLCodeList ? this.formValue.regionALLCodeList[3] : this.formValue.streetCode;
      params.province = this.formValue.regionALLNameList ? this.formValue.regionALLNameList[0] : this.formValue.province;
      params.city = this.formValue.regionALLNameList ? this.formValue.regionALLNameList[1] : this.formValue.city;
      params.area = this.formValue.regionALLNameList ? this.formValue.regionALLNameList[2] : this.formValue.area;
      params.street = this.formValue.regionALLNameList ? this.formValue.regionALLNameList[3] : this.formValue.street;
      params.regionCode = this.formValue.regionCode;
      if (this.id) {
        params.id = this.id;
        // 修改
        pioneerstationUpdate(params)
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
      } else {
        // 新增
        pioneerstationAdd(params)
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
      }

    },

  }
};
</script>

<style lang="less" scoped>
</style>


