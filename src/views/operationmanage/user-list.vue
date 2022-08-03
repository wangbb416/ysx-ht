<!--运营管理-用户列表-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getSearchData()"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!-- 操作按钮-->
        <div class="operate-button-style">
          <div class="add common-button" title="新增" @click="openDialog(false)">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :tableConfig="userListConfig">
      <template #slotCompanyType="{ data }">
        <div>{{ CompanyType[data] }}</div>
      </template>
      <template #slotCreateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>
      <template #slotLastLoginTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>
      <template #data_Operate="{ data }">
        <div class="inline-button">
          <div class="update my-button" title="修改" @click="openDialog(true, data)">
            <i class="el-icon-edit"></i>
          </div>
          <div class="delete my-button" title="删除" @click="deleteOpration(data.id)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </template>
    </MyTable>
    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      @pageChange="getUserList"
      :total="total"
    ></MyPagination>

    <MyDialog
      :dialogVisible="dialogVisible"
      :title="title"
      @cancel="dialogVisible = false"
    >
      <template v-slot:content>
        <MyForm
          ref="myForm"
          v-if="dialogVisible"
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
import {Loading} from "element-ui";
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {
  usersSearch,
  getCompanies,
  getRolesNew,
  addUser,
  updateUser,
  deleteUser
} from "@/api/operationmanage";
import {userListConfig} from "./config";
import {getFormatTime} from "@/utils/methods";

import {CompanyType, CompanyTypeOption} from "@/utils/enum";

export default {
  name: "",
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
        {name: "运营管理", path: ""},
        {name: "用户列表", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "username", label: "用户名", value: ""},
        {type: "input", field: "nickname", label: "姓名", value: ""},
        {type: "input", field: "companyName", label: "单位名", value: ""},
        {
          type: "select",
          field: "companyType",
          label: "单位类型",
          value: "",
          option: CompanyTypeOption
        },
        {type: "input", field: "mobile", label: "手机号", value: ""}
      ],
      form: {
        username: "",
        nickname: "",
        companyName: "",
        companyType: "",
        mobile: ""
      },

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      userListConfig,

      // 共用变量及方法
      CompanyType,
      getFormatTime,
      CompanyTypeOption,

      // 弹框
      dialogVisible: false,
      confirmButton: true,

      // 表单
      // apiNumber: 1,
      // apiSuccess: 0,
      // loadingService: "",

      isAdd: false,   //新增或修改
      detail: 1,      //是否是回显
      id: "",
      formValue: {
        username: "",
        roleId: "",
        companyType: "",
        companyId: "",
        nickname: "",
        mobile: "",
        password: ""
      },

      // 角色列表
      roleList: [],

      // 单位列表
      companyList: []
    };
  },
  created() {
    this.getUserList();
    this.getRoleList();
  },
  computed: {
    rules() {
      let temp = {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        roleId: [{required: true, message: "请选择角色", trigger: "change"}],
        companyType: [
          {required: true, message: "请选择单位类型", trigger: "change"}
        ],
        companyId: [
          {required: true, message: "请选择所属单位", trigger: "change"}
        ],
        nickname: [{required: true, message: "请输入姓名", trigger: "blur"}],
        mobile: [
          {
            required: true,
            pattern: /1\d{10}/,
            message: "请输入正确的手机号",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            pattern: /^(?=.{8,}$)(?=.*([a-z]).*$)(?=.*([A-Z]).*$)(?=.*([~!@#$%^&*]).*$).+$/,
            message:
              "新密码至少要8位，必须同时包含：大写字母、小写字母、数字、符号(~!@#$%^&*)",
            trigger: "change"
          }
        ]
      };
      temp.password[0].required = this.isAdd;
      return temp;
    },
    formList() {
      let temp = [
        {
          type: "input",
          label: "用户名",
          valueLabel: "username",
          valueType: "String"
        },
        {
          type: "select",
          label: "角色",
          valueLabel: "roleId",
          option: [],
          disabled: false
        },
        {
          type: "select",
          label: "所属单位类型",
          valueLabel: "companyType",
          option: CompanyTypeOption,
          disabled: false
        },
        {
          type: "select", //根据所属单位类型获取
          label: "所属单位",
          valueLabel: "companyId",
          option: [],
          disabled: false
        },
        {
          type: "input",
          label: "姓名",
          valueLabel: "nickname",
          valueType: "String"
        },
        {
          type: "input",
          label: "手机号",
          valueLabel: "mobile",
          valueType: "String"
        },
        {
          type: "input",
          label: "密码",
          valueLabel: "password",
          valueType: "String",
          placeholder: ""
        }
      ];
      temp[6].placeholder = this.isAdd ? "" : "(留空则密码不变)";

      this.roleList.map(item => {
        temp[1].option.push({
          label: item.roleName,
          value: item.roleId
        });
      });

      this.companyList.map(item => {
        temp[3].option.push({
          label: item.companyName,
          value: item.id
        });
      });

      return temp;
    },
    title() {
      return this.isAdd ? "新增用户" : "修改用户";
    }
  },
  methods: {
    getSearchData() {
      this.pageNum = 1;
      this.getUserList();
    },
    getUserList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        page: this.pageNum,
        size: this.pageSize,
        ysxFlag: 0
      };
      Object.assign(params, this.form);
      usersSearch(params)
        .then(res => {
          if (res != -1) {
            this.total = res.totalElements || 0;
            this.tableData = res.content || [];
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    openDialog(update, data = null) {
      this.dialogVisible = true;
      if (update) {
        this.isAdd = false;
        this.detail = 1;
        this.id = data.id;
        this.formValue.username = data.username;
        this.formValue.roleId = data.roleId;
        this.formValue.companyType = data.companyType;
        this.formValue.companyId = data.companyId;
        this.formValue.nickname = data.nickname;
        this.formValue.mobile = data.mobile;
        this.formValue.password = "";
      } else {
        this.isAdd = true;
        this.formValue.username = "";
        this.formValue.roleId = "";
        this.formValue.companyType = "";
        this.formValue.companyId = "";
        this.formValue.nickname = "";
        this.formValue.mobile = "";
      }
    },
    // 请求角色
    getRoleList() {
      let params = {pageNum: 1, pageSize: 99999999};
      getRolesNew(params)
        .then(res => {
          if (res != -1) {
            this.roleList = res.records || [];
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    // 请求所属单位
    getCompany(companyType) {
      let params = {page: 1, size: 99999999, companyType: companyType};
      getCompanies(params)
        .then(res => {
          if (res != -1) {
            this.companyList = res.content || [];
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    // apiJudge() {
    //   this.apiSuccess++;
    //   if (this.apiSuccess >= this.apiNumber && this.loadingService) {
    //     this.loadingService.close();
    //   }
    // },
    submit() {
      if (this.isAdd) {
        this.addUsers();
      } else {
        this.updateUsers();
      }
    },
    addUsers() {
      let params = JSON.parse(JSON.stringify(this.formValue));
      params.validPassword = this.formValue.password;
      params.ysxFlag = 0;
      addUser(params)
        .then(res => {
          if (res != -1) {
            this.$message.success("新增成功");
            this.dialogVisible = false;
            this.getUserList();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    updateUsers() {
      let params = JSON.parse(JSON.stringify(this.formValue));
      params.validPassword = this.formValue.password
      updateUser(this.id, params)
        .then(res => {
          if (res != -1) {
            this.$message.success("修改成功");
            this.dialogVisible = false;
            this.getUserList();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    deleteOpration(id) {
      this.id = id;
      this.$confirm("确认删除？")
        .then(_ => {
          this.deleteUsers();
        })
        .catch(_ => {
        });
    },
    deleteUsers() {
      deleteUser(this.id)
        .then(res => {
          if (res != -1) {
            this.$message.success("删除成功");
            if (this.tableData.length == 1 && this.pageNum > 1) {
              this.pageNum--;
            }
            this.getUserList();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  },

  watch: {
    "formValue.companyType": {
      handler(newV, oldV) {
        if (newV) {
          // 非回显状态，既切换单位类型操作,要清空所属单位
          if (this.detail != 1) {
            this.formValue.companyId = "";
          }
          this.detail++;
          this.companyList = [];
          this.getCompany(newV);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.inline-button {
  display: flex;
  justify-content: space-between;
}

.my-button {
  width: 40px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  color: #fff;
}

</style>
