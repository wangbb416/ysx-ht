<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <div class="add" @click="openDialog(1)">
      <i class="el-icon-plus"></i>
    </div>
    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="PortCleanConfig">
      <template #data_code="{data}">
        <img
          src="@/assets/imgs/ysx/code.png"
          alt=""
          style="width: 30px; height: 30px"
          @click="produceCode(data)"
        />
      </template>
      <template #data_operate="{data}">
        <el-button size="small" @click="openDialog(2, data)">编辑</el-button>
        <el-button size="small" @click="deleteConfirm(data)">删除</el-button>
      </template>
    </MyTable>
    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getPortRecord"
    ></MyPagination>

    <MyDialog
      :title="'二维码'"
      :dialogVisible="showCode"
      @cancel="closeCode"
    >
      <template v-slot:content>
        <div id="qrcode" ref="qrCodeDiv"></div>
      </template>
    </MyDialog>

    <MyDialog :dialogVisible="showForm" :title="title" @cancel="showForm = false">
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'120px'"
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
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import QRCode from "qrcodejs2";
import {PortCleanConfig} from "./config.js";
import {
  cleanerPortRecord,
  cleanerPortDelete,
  cleanerPortAdd,
  cleanerPortUpdate
} from "@/api";

export default {
  name: "",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MyDialog,
    MyForm
  },
  data() {
    return {
      titleList: [
        {name: "渔省心", path: ""},
        {name: "港口清洁", path: ""}
      ],
      // 表格
      PortCleanConfig,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 二维码弹框
      showCode: false,
      // 新增、编辑
      title: "新增",
      showForm: false,
      status: 1, // 1:新增  2:编辑
      id: "",
      // 表单
      formList: [
        {
          type: "input",
          label: "姓名",
          valueLabel: "username",
          valueType: "String"
        },
        {
          type: "input",
          label: "电话",
          valueLabel: "mobile",
          valueType: "String"
        }
      ],
      formValue: {
        mobile: "",
        username: ""
      },
      rules: {
        username: [{required: true, message: "请输入", trigger: "blur"}],
        mobile: [{required: true, message: "请输入", trigger: "blur"}]
      }
    };
  },
  created() {
    this.getPortRecord();
  },
  methods: {
    getPortRecord() {
      let params = {pageNum: this.pageNum, pageSize: this.pageSize};
      cleanerPortRecord(params)
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
    produceCode(data) {
      let mobile = data.mobile;
      this.showCode = true;
      setTimeout(() => {
        new QRCode(this.$refs.qrCodeDiv, {
          text: mobile,
          width: 200,
          height: 200,
          colorDark: "#333333", //二维码颜色
          colorLight: "#FFF", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
        });
      }, 100);
    },
    deleteConfirm(data) {
      this.$confirm("确认删除？")
        .then(_ => {
          this.deleteRecord(data.id);
        })
        .catch(_ => {
        });
    },
    openDialog(status, data = null) {
      this.showForm = true;
      this.status = status;
      if (this.status == 1) {
        this.formValue.mobile = "";
        this.formValue.username = "";
      } else if (this.status == 2) {
        this.id = data.id;
        this.formValue.mobile = data.mobile;
        this.formValue.username = data.username;
      }
    },
    submit() {
      console.log(this.status, this.id, this.formValue);
      if (this.status == 1) {
        this.addRecord();
      } else if (this.status == 2) {
        this.updateRecord();
      }
    },
    deleteRecord(id) {
      cleanerPortDelete({id: id})
        .then(res => {
          if (res != -1) {
            this.$message.success("删除成功");
            this.getPortRecord();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    addRecord() {
      cleanerPortAdd(this.formValue)
        .then(res => {
          if (res != -1) {
            this.showForm = false;
            this.$message.success("新增成功");
            this.getPortRecord();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    updateRecord() {
      let params = JSON.parse(JSON.stringify(this.formValue));
      params.id = this.id;
      cleanerPortUpdate(params)
        .then(res => {
          if (res != -1) {
            this.showForm = false;
            this.$message.success("修改成功");
            this.getPortRecord();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    closeCode() {
      this.showCode = false;
      const item = document.getElementById("qrcode");
      console.log("item: ", item)
      while (item.firstChild) {
        item.removeChild(item.firstChild);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#qrcode {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
