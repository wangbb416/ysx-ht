<!--金融服务-银行管理-->
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


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true" :tableConfig="bankmanageTabel">


      <template #data_bankType="{ data }">
        <el-button size="mini" title="详情" @click="openDialog('detail',data)">
          查看({{
            JSON.parse(data.accessory).length || '0'
          }})
        </el-button>
      </template>

      <template #data_Manage="{ data }">
        <el-button size="mini" :type="data.deleteFlag == 0?'info':''" :plain="data.deleteFlag == 0?'plain':''"
                   :disabled="data.deleteFlag == 0" @click="chooseShelf('onshelf',data)">上架
        </el-button>
        <el-button size="mini" :type="data.deleteFlag == 1?'info':''" :plain="data.deleteFlag == 1?'plain':''"
                   :disabled="data.deleteFlag == 1" @click="chooseShelf('offshelf',data)">下架
        </el-button>
      </template>

      <template #data_Operate="{ data }">
        <div class="inline-button">

          <div class="update my-button" title="修改" @click="openDialog('update', data)">
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

    <!--修改-->
    <MyDialog
      :dialogVisible="dialogVisible"
      :title="title"
      @cancel="dialogVisible = false;"
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

import {bankmanageTabel} from "./config";
import {bankmanageList, bankmanageUpdate, downloadBankmanage} from "@/api/financialservices";
import {exportXlsx} from "@/utils/methods";
import {BankType, datafiltering} from "@/utils/enum";


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
      datafiltering,
      BankType,
      titleList: [
        {name: "金融服务", path: ""},
        {name: "银行管理", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "name", label: "", value: "", placeholder: "请输入银行名称"},
        {type: "select", field: "type", label: "", value: "", placeholder: "请选择银行类型", option: BankType},
      ],
      form: {
        name: "",
        type: "",
      },
      // 表格
      tableData: [],
      bankmanageTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      dialogVisible: false,
      confirmButton: true,
      formList: [
        {
          type: "input",
          label: "银行名称",
          valueLabel: "bankName",
          valueType: "String"
        },
        {
          type: "select",
          label: "银行类型",
          valueLabel: "bankType",
          option: BankType,
        },
        {
          type: "input",
          label: "咨询热线",
          valueLabel: "mobile",
          valueType: "String"
        },
      ],
      title: '资料上传',
      formValue: {
        bankName: "",
        bankType: "",
        mobile: ""
      },
      rules: {
        bankName: [{required: true, message: "请输入", trigger: "blur"}],
        bankType: [{required: true, message: "请选择", trigger: "blur"}],
        mobile: [{required: true, message: "请输入", trigger: "blur"}]
      },

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
        name: this.form.name,
        type: this.form.type,
      };
      bankmanageList(params)
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
        case 'update':
          this.dialogVisible = true;
          this.showForm = true;
          this.id = data.id;
          this.formValue.bankName = data.bankName;
          this.formValue.bankType = data.bankType;
          this.formValue.mobile = data.mobile;
          break;
        case'detail':
          this.$router.push({
            path: "/ysx/bank-manage-detail",
            query: {itemId: data.id,dataArr:data.accessory}
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
        name: this.form.name,
        type: this.form.type,
      };

      // 导出
      exportXlsx('银行管理', params, downloadBankmanage);

    },

    submit() {
      let params = {
        id: this.id,
        bankName: this.formValue.bankName,
        bankType: this.formValue.bankType,
        mobile: this.formValue.mobile,
      };

      bankmanageUpdate(params)
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

    // 上、下架
    chooseShelf(type, data) {
      let params = {id: data.id};
      switch (type) {
        case 'onshelf'://上
          params.deleteFlag = '0';
          break;
        case 'offshelf'://下
          params.deleteFlag = '1';
          break;
        default:
          break;
      }
      bankmanageUpdate(params)
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



